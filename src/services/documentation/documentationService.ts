import type { Repository, DocumentationConfig, DocumentationSection } from '../../types';
import { fetchRepository } from '../repository/fetchRepository';
import { generateSummary } from './generators/summaryGenerator';
import { generateApiDocs } from './generators/apiGenerator';
import { generateSchema } from './generators/schemaGenerator';
import { generateQualityInsights } from './generators/qualityGenerator';

export async function generateDocumentation(
  repo: Repository,
  config: DocumentationConfig
): Promise<DocumentationSection[]> {
  try {
    await fetchRepository(repo);
    
    const sections: DocumentationSection[] = [];
    const generators = [
      { enabled: config.includeSummary, generate: generateSummary },
      { enabled: config.includeApi, generate: generateApiDocs },
      { enabled: config.includeSchema, generate: generateSchema },
      { enabled: config.includeQualityInsights, generate: generateQualityInsights },
    ];

    const results = await Promise.all(
      generators
        .filter(({ enabled }) => enabled)
        .map(({ generate }) => generate(repo))
    );

    return [...sections, ...results];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Documentation generation failed: ${error.message}`);
    }
    throw error;
  }
}