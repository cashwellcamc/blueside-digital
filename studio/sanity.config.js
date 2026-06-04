import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './schemas/index.js';

export default defineConfig({
  name: 'blueside-digital',
  title: 'Blueside Digital',
  projectId: 'dnjgcd6l',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
    codeInput(),
  ],
  schema: {
    types: schemaTypes,
  },
});
