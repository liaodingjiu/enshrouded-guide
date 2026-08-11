// Add Tools nav dropdown to all existing HTML pages
const fs = require('fs');
const path = require('path');

const ROOT = '/Users/judy/70-Projects/wangzhan/enshrouded-guide';

// Files to skip (already have the Tools nav)
const SKIP = [
  'tools/build-advisor/index.html',
  'tools/goal-planner/index.html',
  'tools/adventure-planner/index.html',
];

function findFiles(dir, list) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== '.git' && entry.name !== '.claude') {
      findFiles(full, list);
    } else if (entry.name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const files = findFiles(ROOT, []).filter(f => {
  const rel = path.relative(ROOT, f);
  return !SKIP.includes(rel);
});

let updated = 0;
let skipped = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(ROOT, filePath);
  const depth = relPath.split('/').length - 1;
  const toolsPrefix = depth === 0 ? 'tools/' : '../tools/';

  // Check if Tools dropdown already exists
  if (content.includes('🛠️ Tools')) {
    console.log(`  SKIP (already has Tools): ${relPath}`);
    skipped++;
    continue;
  }

  const toolsBlock = `        <li class="nav-dropdown">
          <button class="nav-dropdown-trigger" type="button">🛠️ Tools</button>
          <ul class="nav-dropdown-menu">
            <li><a href="${toolsPrefix}build-advisor/">🧠 Build Advisor</a></li>
            <li><a href="${toolsPrefix}goal-planner/">🎯 Goal Planner</a></li>
            <li><a href="${toolsPrefix}adventure-planner/">🗺️ Adventure Planner</a></li>
          </ul>
        </li>
      `;

  // Find the closing </li> of the Reference dropdown, followed by whitespace and </ul> and theme-toggle button
  // Strategy: find the last </li> before </ul> followed by <button class="theme-toggle"
  // We insert the tools block before the line starting with whitespace + </ul> that precedes the theme toggle

  // More reliable: find the line "      </ul>" that's right before "<button class=\"theme-toggle\""
  const lines = content.split('\n');
  let insertIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    // Look for: whitespace + </ul> followed by whitespace + <button class="theme-toggle"
    if (/^\s*<\/ul>\s*$/.test(lines[i]) && i + 1 < lines.length && lines[i + 1].includes('<button class="theme-toggle"')) {
      insertIndex = i;
      break;
    }
  }

  if (insertIndex === -1) {
    console.log(`  WARN (no anchor found): ${relPath}`);
    skipped++;
    continue;
  }

  // Insert the tools block before the </ul> line
  lines.splice(insertIndex, 0, toolsBlock);
  const newContent = lines.join('\n');

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`  UPDATED: ${relPath} (depth=${depth}, prefix=${toolsPrefix})`);
  updated++;
}

console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
