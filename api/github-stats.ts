import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchGitHubStats } from '../lib/github.js';
import { generateStatsCard } from '../lib/svg-templates.js';

function escapeXml(str: string): string {
  if (!str) return '';
  return str.replace(/[<>&'"]/g, (ch) => {
    switch (ch) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return ch;
    }
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username, theme = 'dark' } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).send('Missing ?username=your-github-username');
  }

  try {
    const stats = await fetchGitHubStats(username);
    const svg = generateStatsCard(stats, theme as 'dark' | 'light');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).send(svg);
  } catch (error: any) {
    console.error(error);
    const errorSvg = `<svg width="720" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#0d1117" rx="10"/>
      <text x="25" y="45" fill="#f85149" font-family="monospace" font-size="14">Error: ${escapeXml(error.message)}</text>
    </svg>`;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(500).send(errorSvg);
  }
}