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
      '@domain': resolve(rootDir, 'src/domain'),
      '@application': resolve(rootDir, 'src/application'),
      '@infrastructure': resolve(rootDir, 'src/infrastructure'),
      '@shared': resolve(rootDir, 'src/shared')
    }
  }
});
