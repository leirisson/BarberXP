import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
const rootDir = __dirname;

export default defineConfig({
  test: {
    environment: 'node',
    globals: true
  },
  resolve: {
    alias: {
      '@domain': resolve(rootDir, 'packages/domain/src'),
      '@application': resolve(rootDir, 'packages/application/src'),
      '@infrastructure': resolve(rootDir, 'packages/infrastructure/src'),
      '@shared': resolve(rootDir, 'packages/shared/src')
    }
  }
});
