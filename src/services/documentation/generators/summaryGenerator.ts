import type { Repository } from '../../../types';
import { fetchRepositoryFiles } from '../../repository/repositoryService';
import { analyzeCode } from '../../ai/aiService';

export async function generateSummary(repo: Repository) {
  const code = await fetchRepositoryFiles(repo);
  const content = await analyzeCode(code, { type: 'summary' });
  
  return {
    title: 'Project Summary',
    content,
    type: 'summary' as const,
  };
}