import fs from 'node:fs';
import path from 'node:path';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

const projectRoot = process.cwd();
const includePattern = /<!--\s*@include\s+([^\s]+)\s*-->/g;

function expandHtmlIncludes(html) {
  return html.replace(includePattern, (_match, relativePath) => {
    const includePath = path.resolve(projectRoot, relativePath);
    const partial = fs.readFileSync(includePath, 'utf8');

    return expandHtmlIncludes(partial);
  });
}

function htmlPartials() {
  return {
    name: 'optimix-html-partials',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return expandHtmlIncludes(html);
      },
    },
    configureServer(server) {
      const partialsDirectory = path.resolve(projectRoot, 'partials');
      server.watcher.add(partialsDirectory);
      server.watcher.on('change', (changedPath) => {
        if (changedPath.startsWith(partialsDirectory)) {
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [htmlPartials()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
