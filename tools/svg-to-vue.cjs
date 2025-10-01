const fs = require('fs').promises;
const path = require('path');

function toPascalCase(name) {
  return name
    .replace(/[_\-\.]+/g, ' ')
    .split(/\s+/)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
    .replace(/^\d+/, m => m); // keep leading numbers if any
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function transformSvg(content) {
  // remove XML declaration
  content = content.replace(/<\?xml[^>]*\?>/gi, '');
  // remove comments
  content = content.replace(/<!--([\s\S]*?)-->/g, '');
  // remove <defs>...</defs>
  content = content.replace(/<defs[\s\S]*?<\/defs>/gi, '');
  // remove <style>...</style> inside svg (left if outside defs)
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '');

  // remove standalone class attributes and ids that only reference styles
  content = content.replace(/\sclass="[^"]*"/gi, '');
  // remove class='...'
  content = content.replace(/\sclass='[^']*'/gi, '');

  // replace fill="#..." or fill='#...' with fill="currentColor" (but keep fill="none")
  content = content.replace(/fill=("|')\s*#([0-9a-fA-F]{3,8})\s*("|')/gi, 'fill="currentColor"');
  content = content.replace(/fill=("|')\s*rgb\([^\)]*\)\s*("|')/gi, 'fill="currentColor"');

  // For shape elements that do not have a fill attribute and are not <svg> or <g>, add fill="currentColor"
  // This handles both normal and self-closing tags (<path ...> and <path ... />)
  content = content.replace(/<(path|rect|circle|ellipse|polygon|polyline)([^>]*?)(\/)?>/gi, (match, tag, attrs, selfClose) => {
    // attrs may include trailing whitespace; remove trailing whitespace
    let originalAttrs = attrs || '';
    const hasFill = /\bfill\s*=/.test(originalAttrs);
    const hasFillNone = /fill=(["'])none\1/i.test(originalAttrs);
    if (hasFill || hasFillNone) {
      // preserve original form (keep self-closing if present)
      return `<${tag}${originalAttrs}${selfClose ? ' /' : ''}>`;
    }
    // ensure we don't duplicate a trailing slash in attrs
    originalAttrs = originalAttrs.replace(/\/\s*$/, '');
    // insert fill before closing; preserve self-closing
    return `<${tag}${originalAttrs} fill="currentColor"${selfClose ? ' /' : ''}>`;
  });

  // remove any remaining <defs ...> or empty defs markers
  content = content.replace(/<defs\s*\/?>/gi, '');
  content = content.replace(/<\/defs>/gi, '');

  // trim
  return content.trim();
}

async function processDir(inputDir, outDir) {
  const entries = await fs.readdir(inputDir, { withFileTypes: true });
  await ensureDir(outDir);
  const created = [];
  for (const e of entries) {
    if (e.isDirectory()) {
      const subIn = path.join(inputDir, e.name);
      const subOut = path.join(outDir, e.name);
      const subCreated = await processDir(subIn, subOut);
      created.push(...subCreated);
      continue;
    }
    if (!e.name.toLowerCase().endsWith('.svg')) continue;
    const inPath = path.join(inputDir, e.name);
    const raw = await fs.readFile(inPath, 'utf8');
    const transformed = transformSvg(raw);
    const svgMatch = transformed.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/i);
    if (!svgMatch) continue;
    const svgAttrs = svgMatch[1].trim();
    const svgInner = svgMatch[2].trim();

    const baseName = path.basename(e.name, '.svg');
    const pascal = toPascalCase(baseName);
    const compName = pascal;
  const hasXmlns = /xmlns(=|:)/i.test(svgAttrs);
  const svgOpen = hasXmlns ? `<svg ${svgAttrs}>` : `<svg ${svgAttrs} xmlns="http://www.w3.org/2000/svg">`;
  const vue = `<!-- Auto-generated from ${inPath} -->\n<template>\n  ${svgOpen}\n    ${svgInner}\n  </svg>\n</template>\n\n<script setup lang=\"ts\">\n// no props required; icon uses currentColor for fill\n</script>\n\n<style scoped>\nsvg { display: block; }\n</style>\n`;

    const outPath = path.join(outDir, `${compName}.vue`);
    await fs.writeFile(outPath, vue, 'utf8');
    created.push(outPath);
  }
  return created;
}

async function main() {
  const root = path.resolve(__dirname, '..');
  const servicesIn = path.join(root, 'public', 'images', 'services');
  const iconsOut = path.join(root, 'assets', 'icons', 'services');
  try {
    const created = await processDir(servicesIn, iconsOut);
    console.log('Created components:', created.join('\n'));
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

if (require.main === module) main();
