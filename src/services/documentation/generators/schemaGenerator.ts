import type { Repository } from '../../../types';
import { fetchRepositoryFiles } from '../../repository/repositoryService';
import { analyzeCode } from '../../ai/aiService';

export async function generateSchema(repo: Repository) {
  const code = await fetchRepositoryFiles(repo);
  const content = await analyzeCode(code, { type: 'schema' });
  
  return {
    title: 'Database Schema',
    content,
    type: 'schema' as const,
  };
}