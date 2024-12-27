import { GoogleGenerativeAI } from '@google/generative-ai';

const AI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(AI_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface AnalyzeOptions {
  context?: string;
  type: 'summary' | 'api' | 'schema' | 'quality';
}

const PROMPT_TEMPLATES = {
  summary: `Analyze this code and provide a comprehensive project summary in the following structure:

# Project Overview
[Brief description of the project]

## Key Features
- [Feature 1]
- [Feature 2]
...

## Technology Stack
- [Technology 1]: [Brief description]
- [Technology 2]: [Brief description]
...

## Architecture
[High-level architecture description]

## Project Structure
\`\`\`
[Directory structure]
\`\`\`

Please format the response in clean markdown with proper headings, lists, and code blocks.`,

  api: `Document all APIs in this code using the following structure:

# API Documentation

## Endpoints

### [Endpoint Name]
- **Method**: [HTTP Method]
- **Path**: \`[Path]\`
- **Description**: [Description]

#### Request
\`\`\`typescript
[Request type definition]
\`\`\`

#### Response
\`\`\`typescript
[Response type definition]
\`\`\`

#### Example
\`\`\`typescript
[Usage example]
\`\`\`

Format the response in clean markdown with proper headings and code blocks.`,

  schema: `Analyze and document the database schema using the following structure:

# Database Schema

## Tables

### [Table Name]
[Table description]

#### Columns
| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| [name] | [type] | [description] | [constraints] |

#### Relationships
- [Relationship description]

## Entity Relationship Diagram
\`\`\`mermaid
erDiagram
[ERD definition]
\`\`\`

Format the response in clean markdown with proper tables and diagrams.`,

  quality: `Analyze code quality and provide insights using the following structure:

# Code Quality Analysis

## Best Practices
✅ [Good practice found]
❌ [Issue found]

## Security Considerations
- [Security consideration 1]
- [Security consideration 2]

## Performance Optimization
- [Performance tip 1]
- [Performance tip 2]

## Recommendations
1. [Recommendation 1]
2. [Recommendation 2]

Format the response in clean markdown with proper headings and lists.`
};

export async function analyzeCode(code: string, options: AnalyzeOptions): Promise<string> {
  const template = PROMPT_TEMPLATES[options.type];
  const prompt = `${template}
    
Context: ${options.context || 'No additional context provided'}

Code:
${code}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}