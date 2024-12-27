import React from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';
import type { DocumentationSection } from '../../types';

interface Props {
  section: DocumentationSection;
}

export function DocumentSection({ section }: Props) {
  return (
    <div id={section.type} className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
      <div className="prose max-w-none">
        <MarkdownRenderer content={section.content} />
      </div>
    </div>
  );
}