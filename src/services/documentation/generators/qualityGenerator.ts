import type { Repository } from '../../../types';
import { fetchRepositoryFiles } from '../../repository/repositoryService';
import { analyzeCode } from '../../ai/aiService';

export async function generateQualityInsights(repo: Repository) {
  const code = await fetchRepositoryFiles(repo);
  const content = await analyzeCode(code, { type: 'quality' });
  
  return {
    title: 'Code Quality Insights',
    content,
    type: 'quality' as const,
  };
}