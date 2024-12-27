import React from 'react';
import { FileText, Database, GitGraph, BarChart2 } from 'lucide-react';
import type { DocumentationConfig } from '../types';

interface Props {
  config: DocumentationConfig;
  onChange: (config: DocumentationConfig) => void;
}

export function ConfigPanel({ config, onChange }: Props) {
  const toggleOption = (key: keyof DocumentationConfig) => {
    onChange({ ...config, [key]: !config[key] });
  };

  const options = [
    {
      key: 'includeSummary',
      label: 'Project Summary',
      icon: FileText,
      description: 'Generate an executive summary of the project',
    },
    {
      key: 'includeApi',
      label: 'API Documentation',
      icon: GitGraph,
      description: 'Document endpoints, parameters, and examples',
    },
    {
      key: 'includeSchema',
      label: 'Database Schema',
      icon: Database,
      description: 'Generate ERD diagrams and schema documentation',
    },
    {
      key: 'includeQualityInsights',
      label: 'Quality Insights',
      icon: BarChart2,
      description: 'Analyze code quality and provide recommendations',
    },
  ] as const;

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <h2 className="text-lg font-medium text-gray-900">Documentation Options</h2>
      <div className="space-y-3">
        {options.map(({ key, label, icon: Icon, description }) => (
          <div
            key={key}
            className="relative flex items-start py-4 border-b border-gray-200"
          >
            <div className="min-w-0 flex-1 text-sm">
              <label className="font-medium text-gray-700 select-none flex items-center">
                <Icon className="h-5 w-5 mr-2 text-gray-400" />
                {label}
              </label>
              <p className="text-gray-500">{description}</p>
            </div>
            <div className="ml-3 flex items-center h-5">
              <input
                type="checkbox"
                checked={config[key]}
                onChange={() => toggleOption(key)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}