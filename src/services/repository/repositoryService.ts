import type { Repository } from '../../types';

export async function fetchRepositoryFiles(repo: Repository): Promise<string> {
  const options: RequestInit = {};
  
  if (repo.isPrivate && repo.accessToken) {
    options.headers = {
      'Authorization': `Bearer ${repo.accessToken}`,
    };
  }

  // Fetch repository contents
  const contentsUrl = `https://api.github.com/repos/${getRepoPath(repo.url)}/contents`;
  const response = await fetch(contentsUrl, options);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch repository contents: ${response.statusText}`);
  }

  const contents = await response.json();
  const files = await Promise.all(
    contents
      .filter((item: any) => item.type === 'file')
      .map((file: any) => fetchFile(file.download_url, options))
  );

  return files.join('\n\n');
}

async function fetchFile(url: string, options: RequestInit): Promise<string> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }
  return response.text();
}

function getRepoPath(url: string): string {
  const path = url.replace('https://github.com/', '');
  return path.endsWith('/') ? path.slice(0, -1) : path;
}