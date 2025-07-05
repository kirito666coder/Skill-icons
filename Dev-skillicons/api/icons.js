import fs from 'fs';
import path from 'path'

const fullnames = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    node: "nodejs",
    mongo: "mongodb",
    tailwind: 'tailwindcss',
    html: 'html5',
    css: 'css3',
}

const themedIcons = {

};

export default function Handler(req, res) {
    const { i, t = "dark", perline = 5 } = req.query;

    if (!i) {
        res.status(400).send('missing ?i=icons')
    }

    const icons = i.split(',').map((name) => {
        const fullName = fullnames[name] || name;
        const finalName = themedIcons.includes(fullName) ? `${fullName}-${t}` : fullName;
        const filePath = path.resolve(`./public/icons/${finalName}.svg`);

        try {
            return fs.readFileSync(filePath, 'utf8')
        } catch (error) {
            return `<text x=\"0\" y=\"15\" fill=\"red\">${name} not found</text>`;
        }
    })

    const ICON_BOX = 300; 
    const SCALE = 48 / (ICON_BOX - 44);
    const perLine = Math.min(15, parseInt(req.query.perline) || 5);

    const width = Math.min(perLine * ICON_BOX, icons.length * ICON_BOX) - 44;
    const height = Math.ceil(icons.length / perLine) * ICON_BOX - 44;
    const scaledWidth = width * SCALE;
    const scaledHeight = height * SCALE;

    const svg = `
  <svg xmlns="http://www.w3.org/2000/svg"
       width="${scaledWidth}" height="${scaledHeight}"
       viewBox="0 0 ${width} ${height}">
    ${icons.map((icon, index) => {
        const x = (index % perLine) * ICON_BOX;
        const y = Math.floor(index / perLine) * ICON_BOX;
        return `<g transform="translate(${x},${y})">${icon}</g>`;
    }).join('')}
  </svg>`;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
}