export interface Repository {
  url: string;
  name: string;
  isPrivate: boolean;
  accessToken?: string;
}

export interface DocumentationConfig {
  includeSummary: boolean;
  includeApi: boolean;
  includeSchema: boolean;
  includeDiagrams: boolean;
  includeQualityInsights: boolean;
}

export interface DocumentationSection {
  title: string;
  content: string;
  type: 'summary' | 'api' | 'schema' | 'diagram' | 'quality';
}