// Update all HTML files: favicon, apple-touch-icon, manifest, OG image paths
const fs = require('fs');
const path = require('path');

const ROOT = '/Users/judy/70-Projects/wangzhan/enshrouded-guide';

function findHtml(dir, list) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) findHtml(full, list);
    else if (e.name.endsWith('.html')) list.push(full);
  }
  return list;
}

const files = findHtml(ROOT, []);
let updated = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(ROOT, filePath);
  const depth = relPath.split('/').length - 1;
  const prefix = depth === 0 ? '' : '../'.repeat(depth);
  let changed = false;

  // 1. Replace favicon: old single SVG link → full favicon set
  const oldFavicon = `<link rel="icon" type="image/svg+xml" href="${prefix}favicon.svg">`;
  const newFavicons = `<link rel="icon" type="image/svg+xml" href="${prefix}favicon.svg">
  <link rel="icon" type="image/png" sizes="16x16" href="${prefix}favicon-16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="${prefix}favicon-32.png">
  <link rel="shortcut icon" href="${prefix}favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="${prefix}apple-touch-icon.png">
  <link rel="manifest" href="${prefix}site.webmanifest">`;

  if (content.includes(oldFavicon)) {
    content = content.replace(oldFavicon, newFavicons);
    changed = true;
  }

  // 2. Fix OG image: og-build-advisor.svg → og-build-advisor.png
  const ogReplacements = [
    ['og-build-advisor.svg', 'og-build-advisor.png'],
    ['og-goal-planner.svg', 'og-goal-planner.png'],
    ['og-adventure-planner.svg', 'og-adventure-planner.png'],
    ['og-default.svg', 'og-default.png'],
  ];

  for (const [oldOg, newOg] of ogReplacements) {
    if (content.includes(oldOg)) {
      content = content.replaceAll(oldOg, newOg);
      changed = true;
    }
  }

  // 3. Fix OG image:width/height for PNG references (keep same dimensions)
  // No change needed — still 1200x630

  // 4. Add theme-color meta tag (for PWA header color)
  if (changed && !content.includes('theme-color')) {
    content = content.replace(
      '<link rel="icon" type="image/svg+xml"',
      '<meta name="theme-color" content="#1a1a18">\n  <link rel="icon" type="image/svg+xml"'
    );
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log(`  ✅ ${relPath}`);
  }
}

console.log(`\nUpdated ${updated} HTML files.`);
