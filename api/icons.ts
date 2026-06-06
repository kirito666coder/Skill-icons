import fs from 'fs';
import path from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface FullnamesMap {
  [key: string]: string;
}

const fullnames: FullnamesMap = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  node: 'nodejs',
  mongo: 'mongodb',
  tailwind: 'tailwindcss',
  html: 'html5',
  css: 'css3',
};

const themedIcons: Record<string, boolean> = {}; // populate if needed, e.g. { 'javascript': true }

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { i, t = 'dark', perline = '15' } = req.query;

  if (!i || typeof i !== 'string') {
    return res.status(400).send('missing ?i=icons (comma-separated)');
  }

  const maxPerLine = Math.min(15, parseInt(perline as string, 10) || 15);
  const iconNames = i.split(',');

  const svgContents: string[] = [];
  for (const name of iconNames) {
    const fullName = fullnames[name] || name;
    const isThemed = Object.prototype.hasOwnProperty.call(themedIcons, fullName);
    const finalName = isThemed ? `${fullName}-${t}` : fullName;
    const filePath = path.resolve(process.cwd(), `public/icons/${finalName}.svg`);

    try {
      const svg = fs.readFileSync(filePath, 'utf8');
      svgContents.push(svg);
    } catch (error) {
      svgContents.push(`<text x="0" y="15" fill="red" font-size="12">${name} not found</text>`);
    }
  }

  const ICON_BOX = 300;
  const SCALE = 48 / (ICON_BOX - 44);
  const width = Math.min(maxPerLine * ICON_BOX, iconNames.length * ICON_BOX) - 44;
  const height = Math.ceil(iconNames.length / maxPerLine) * ICON_BOX - 44;
  const scaledWidth = width * SCALE;
  const scaledHeight = height * SCALE;

  const elements = svgContents
    .map((svg, index) => {
      const x = (index % maxPerLine) * ICON_BOX;
      const y = Math.floor(index / maxPerLine) * ICON_BOX;
      return `<g transform="translate(${x},${y})">${svg}</g>`;
    })
    .join('');

  const outputSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${width} ${height}">${elements}</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(outputSvg);
}