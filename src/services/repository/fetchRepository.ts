import type { Repository } from '../../types';

interface FetchOptions {
  headers?: Record<string, string>;
}

export async function fetchRepository(repo: Repository) {
  const options: FetchOptions = {};
  
  if (repo.isPrivate && repo.accessToken) {
    options.headers = {
      'Authorization': `Bearer ${repo.accessToken}`,
    };
  }

  const response = await fetch(`https://api.github.com/repos/${getRepoPath(repo.url)}`, options);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch repository: ${response.statusText}`);
  }

  return response.json();
}

function getRepoPath(url: string): string {
  const path = url.replace('https://github.com/', '');
  return path.endsWith('/') ? path.slice(0, -1) : path;
}