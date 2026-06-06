export interface GitHubStats {
  name: string;
  login: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  totalCommits: number;
  pullRequests: number;
  issues: number;
  contributions: number;
  gists: number;
  starredRepos: number;
  organizations: number;
  mostUsedLanguages: { name: string; percentage: number }[];
}

interface GraphQLRepoNode {
  stargazerCount: number;
  forkCount: number;
  watchers: { totalCount: number };
  languages: {
    edges: Array<{ size: number; node: { name: string } }>;
    totalSize: number;
  } | null;
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('Missing GITHUB_TOKEN environment variable');
  }

  // ------------------------------
  // 1. Fetch all repositories (paginated)
  // ------------------------------
  let allRepos: GraphQLRepoNode[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  while (hasNextPage) {
    const repoQuery = `
      query($username: String!, $cursor: String) {
        user(login: $username) {
          repositories(first: 100, after: $cursor, privacy: PUBLIC, ownerAffiliations: OWNER) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              stargazerCount
              forkCount
              watchers { totalCount }
              languages(first: 10) {
                edges {
                  size
                  node { name }
                }
                totalSize
              }
            }
          }
        }
      }
    `;
    const repoResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: repoQuery,
        variables: { username, cursor: endCursor },
      }),
    });

    const repoJson = await repoResponse.json();
    if (repoJson.errors) {
      throw new Error(repoJson.errors[0].message);
    }
    const reposData = repoJson.data?.user?.repositories;
    if (!reposData) break;

    const nodes = reposData.nodes || [];
    allRepos.push(...nodes);
    hasNextPage = reposData.pageInfo.hasNextPage;
    endCursor = reposData.pageInfo.endCursor;
    if (!hasNextPage) break;
  }

  // ------------------------------
  // 2. Fetch main user profile and stats
  // ------------------------------
  const mainQuery = `
    query($username: String!) {
      user(login: $username) {
        name
        login
        avatarUrl
        followers { totalCount }
        following { totalCount }
        gists { totalCount }
        repositories(privacy: PUBLIC, first: 100, ownerAffiliations: OWNER) {
          totalCount
        }
        starredRepositories { totalCount }
        organizations(first: 10) { totalCount }
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          contributionCalendar {
            totalContributions
          }
        }
        pullRequests(first: 100) { totalCount }
        issues(first: 100) { totalCount }
      }
    }
  `;

  const mainResponse = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: mainQuery, variables: { username } }),
  });

  const mainJson = await mainResponse.json();
  if (mainJson.errors) {
    throw new Error(mainJson.errors[0].message);
  }
  const user = mainJson.data?.user;
  if (!user) {
    throw new Error(`User ${username} not found or token invalid`);
  }

  // ------------------------------
  // 3. Aggregate repo stats
  // ------------------------------
  let totalStars = 0;
  let totalForks = 0;
  let totalWatchers = 0;
  for (const repo of allRepos) {
    totalStars += repo.stargazerCount || 0;
    totalForks += repo.forkCount || 0;
    totalWatchers += repo.watchers?.totalCount || 0;
  }

  // ------------------------------
  // 4. Aggregate language stats
  // ------------------------------
  const langMap = new Map<string, number>();
  let totalLangSize = 0;
  for (const repo of allRepos) {
    const langs = repo.languages;
    if (langs && langs.edges) {
      for (const edge of langs.edges) {
        const langName = edge.node.name;
        const size = edge.size;
        langMap.set(langName, (langMap.get(langName) || 0) + size);
        totalLangSize += size;
      }
    }
  }

  const mostUsedLanguages = Array.from(langMap.entries())
    .map(([name, size]) => ({
      name,
      percentage: totalLangSize > 0 ? Math.round((size / totalLangSize) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  // ------------------------------
  // 5. Return typed stats
  // ------------------------------
  return {
    name: user.name || username,
    login: user.login,
    avatarUrl: user.avatarUrl,
    publicRepos: user.repositories.totalCount,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    totalStars,
    totalForks,
    totalWatchers,
    totalCommits: user.contributionsCollection.totalCommitContributions,
    pullRequests: user.pullRequests.totalCount,
    issues: user.issues.totalCount,
    contributions: user.contributionsCollection.contributionCalendar.totalContributions,
    gists: user.gists.totalCount,
    starredRepos: user.starredRepositories.totalCount,
    organizations: user.organizations.totalCount,
    mostUsedLanguages,
  };
}