import type { Repository } from '../../../types';
import { fetchRepositoryFiles } from '../../repository/repositoryService';
import { analyzeCode } from '../../ai/aiService';

export async function generateApiDocs(repo: Repository) {
  const code = await fetchRepositoryFiles(repo);
  const content = await analyzeCode(code, { type: 'api' });
  
  return {
    title: 'API Documentation',
    content,
    type: 'api' as const,
  };
}