import React, { useState } from 'react';
import { Book } from 'lucide-react';
import { RepositoryInput } from './components/RepositoryInput';
import { ConfigPanel } from './components/ConfigPanel';
import { DocumentationDisplay } from './components/documentation/DocumentationDisplay';
import { generateDocumentation } from './services/documentation/documentationService';
import type { Repository, DocumentationConfig, DocumentationSection } from './types';

function App() {
  const [config, setConfig] = useState<DocumentationConfig>({
    includeSummary: true,
    includeApi: true,
    includeSchema: true,
    includeDiagrams: true,
    includeQualityInsights: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documentation, setDocumentation] = useState<DocumentationSection[]>([]);

  const handleRepositorySubmit = async (repo: Repository) => {
    setLoading(true);
    setError(null);
    
    try {
      const docs = await generateDocumentation(repo, config);
      setDocumentation(docs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Book className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Documentation Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your code repository into comprehensive technical documentation
            using advanced AI analysis.
          </p>
        </div>

        <div className="space-y-12">
          <div className="max-w-2xl mx-auto">
            <RepositoryInput onSubmit={handleRepositorySubmit} />
            <ConfigPanel config={config} onChange={setConfig} />
          </div>
          
          {error && (
            <div className="max-w-2xl mx-auto bg-red-50 p-4 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {loading && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Generating documentation...</p>
            </div>
          )}
          
          {documentation.length > 0 && (
            <DocumentationDisplay sections={documentation} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;