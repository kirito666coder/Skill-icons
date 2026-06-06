import { GitHubStats } from './github.js';

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

function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function generateStatsCard(stats: GitHubStats, theme: 'dark' | 'light' = 'dark'): string {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#0d1117' : '#ffffff';
  const textColor = isDark ? '#e6edf3' : '#1f2328';
  const accentColor = isDark ? '#8b949e' : '#57606a';
  const borderColor = isDark ? '#30363d' : '#d0d7de';
  const secondaryBg = isDark ? '#161b22' : '#f6f8fa';

  const langCount = stats.mostUsedLanguages.length;
  const cardWidth = 720;
  const avatarSize = 80;
  const avatarX = 30;
  const avatarY = 30;
  const textX = avatarX + avatarSize + 20;
  const statsStartY = 130;
  const colWidth = 210;
  const col1X = 30;
  const col2X = col1X + colWidth + 15;
  const col3X = col2X + colWidth + 15;
  const rowHeight = 24;
  const rows = 5;

  const baseHeight = statsStartY + (rows * rowHeight) + 20;
  const langSectionHeight = langCount > 0 ? 50 + (langCount * rowHeight) : 0;
  const totalHeight = baseHeight + langSectionHeight + 20;

  const col1Stats = [
    { label: "Repositories:", value: stats.publicRepos },
    { label: "Stars received:", value: stats.totalStars },
    { label: "Forks:", value: stats.totalForks },
    { label: "Watchers:", value: stats.totalWatchers },
    { label: "Followers:", value: stats.followers },
  ];
  const col2Stats = [
    { label: "Following:", value: stats.following },
    { label: "Gists:", value: stats.gists },
    { label: "Commits (1y):", value: stats.totalCommits },
    { label: "Pull Requests:", value: stats.pullRequests },
    { label: "Issues:", value: stats.issues },
  ];
  const col3Stats = [
    { label: "Contributions:", value: stats.contributions },
    { label: "Organizations:", value: stats.organizations },
    { label: "Starred repos:", value: stats.starredRepos },
    { label: "", value: "" },
    { label: "", value: "" },
  ];

  function renderStatColumn(statsArray: { label: string; value: number | string }[], startX: number, startY: number) {
    return statsArray.map((stat, idx) => {
      if (stat.label === "") return '';
      const y = startY + idx * rowHeight;
      const labelWidth = 130;
      return `
        <text x="${startX}" y="${y}" fill="${textColor}" font-size="13" font-family="monospace">${stat.label}</text>
        <text x="${startX + labelWidth}" y="${y}" fill="${accentColor}" font-size="13" font-family="monospace" text-anchor="end">${formatNumber(stat.value as number)}</text>
      `;
    }).join('');
  }

  let langBars = '';
  if (langCount > 0) {
    const langStartX = col1X;
    const langStartY = baseHeight;
    const barWidthMax = cardWidth - 100;
    langBars = stats.mostUsedLanguages
      .map((lang, i) => {
        const barWidth = (lang.percentage / 100) * barWidthMax;
        const yOffset = langStartY + 30 + (i * rowHeight);
        return `
          <text x="${langStartX}" y="${yOffset}" fill="${textColor}" font-size="12" font-family="monospace">${escapeXml(lang.name)}</text>
          <rect x="${langStartX + 85}" y="${yOffset - 8}" width="${barWidthMax}" height="8" fill="${borderColor}" rx="3"/>
          <rect x="${langStartX + 85}" y="${yOffset - 8}" width="${barWidth}" height="8" fill="${accentColor}" rx="3"/>
          <text x="${langStartX + 85 + barWidthMax + 10}" y="${yOffset}" fill="${textColor}" font-size="11" font-family="monospace">${lang.percentage}%</text>
        `;
      })
      .join('');
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${cardWidth}" height="${totalHeight}" viewBox="0 0 ${cardWidth} ${totalHeight}">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
    <clipPath id="avatarClip">
      <circle cx="${avatarX + avatarSize/2}" cy="${avatarY + avatarSize/2}" r="${avatarSize/2}"/>
    </clipPath>
  </defs>
  
  <rect width="100%" height="100%" fill="${bgColor}" rx="14" stroke="${borderColor}" stroke-width="1" filter="url(#shadow)"/>
  
  <!-- Avatar -->
  <circle cx="${avatarX + avatarSize/2}" cy="${avatarY + avatarSize/2}" r="${avatarSize/2 + 4}" fill="${secondaryBg}" stroke="${borderColor}" stroke-width="1.5"/>
  <image href="${escapeXml(stats.avatarUrl)}" x="${avatarX}" y="${avatarY}" width="${avatarSize}" height="${avatarSize}" clip-path="url(#avatarClip)"/>
  
  <!-- Name and login -->
  <text x="${textX}" y="${avatarY + 28}" fill="${textColor}" font-size="22" font-weight="bold" font-family="sans-serif">${escapeXml(stats.name)}</text>
  <text x="${textX}" y="${avatarY + 52}" fill="${accentColor}" font-size="14" font-family="monospace">@${escapeXml(stats.login)}</text>
  
  <!-- Separator -->
  <line x1="${col1X}" y1="${statsStartY - 10}" x2="${cardWidth - 30}" y2="${statsStartY - 10}" stroke="${borderColor}" stroke-width="1"/>
  
  ${renderStatColumn(col1Stats, col1X, statsStartY)}
  ${renderStatColumn(col2Stats, col2X, statsStartY)}
  ${renderStatColumn(col3Stats, col3X, statsStartY)}
  
  ${langCount > 0 ? `
    <line x1="${col1X}" y1="${baseHeight - 5}" x2="${cardWidth - 30}" y2="${baseHeight - 5}" stroke="${borderColor}" stroke-width="1"/>
    <text x="${col1X}" y="${baseHeight + 15}" fill="${textColor}" font-size="14" font-weight="bold" font-family="sans-serif">Most Used Languages</text>
    ${langBars}
  ` : ''}
</svg>`;
}