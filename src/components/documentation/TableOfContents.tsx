import React from 'react';
import { FileText, GitGraph, Database, BarChart2 } from 'lucide-react';
import type { DocumentationSection } from '../../types';

interface Props {
  sections: DocumentationSection[];
}

export function TableOfContents({ sections }: Props) {
  const icons = {
    summary: FileText,
    api: GitGraph,
    schema: Database,
    quality: BarChart2,
  };

  return (
    <nav className="sticky top-4 bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">Contents</h3>
      <ul className="space-y-2">
        {sections.map((section) => {
          const Icon = icons[section.type];
          return (
            <li key={section.type}>
              <a
                href={`#${section.type}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{section.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}