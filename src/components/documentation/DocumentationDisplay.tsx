import React from 'react';
import { DocumentSection } from './DocumentSection';
import { TableOfContents } from './TableOfContents';
import type { DocumentationSection } from '../../types';

interface Props {
  sections: DocumentationSection[];
}

export function DocumentationDisplay({ sections }: Props) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <TableOfContents sections={sections} />
        </div>
        <div className="lg:col-span-3 space-y-8">
          {sections.map((section, index) => (
            <DocumentSection key={index} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}