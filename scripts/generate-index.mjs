#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const distClientDir = path.join(process.cwd(), 'dist/client');
const assetsDir = path.join(distClientDir, 'assets');
const indexHtmlPath = path.join(distClientDir, 'index.html');

// Find the main JS bundle (largest .js file in assets)
let mainJsFile = 'index.js';
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir).filter(f => f.startsWith('index-') && f.endsWith('.js'));
  if (files.length > 0) {
    // Sort by size, get the largest (main bundle)
    const sorted = files.sort((a, b) => {
      const sizeA = fs.statSync(path.join(assetsDir, a)).size;
      const sizeB = fs.statSync(path.join(assetsDir, b)).size;
      return sizeB - sizeA;
    });
    mainJsFile = sorted[0];
  }
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verma Luxury Travel</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${mainJsFile}"></script>
  </body>
</html>`;

if (!fs.existsSync(distClientDir)) {
  console.error(`Error: ${distClientDir} does not exist`);
  process.exit(1);
}

fs.writeFileSync(indexHtmlPath, html);
console.log(`✓ Generated ${indexHtmlPath}`);
