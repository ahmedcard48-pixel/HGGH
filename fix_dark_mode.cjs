const fs = require('fs');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replacements
  content = content.replace(/bg-white/g, 'bg-white dark:bg-slate-900');
  content = content.replace(/bg-slate-50/g, 'bg-slate-50 dark:bg-slate-800/50');
  content = content.replace(/bg-slate-100/g, 'bg-slate-100 dark:bg-slate-800');
  content = content.replace(/border-slate-200/g, 'border-slate-200 dark:border-slate-700');
  content = content.replace(/border-slate-100/g, 'border-slate-100 dark:border-slate-700/50');
  content = content.replace(/text-slate-900/g, 'text-slate-900 dark:text-white');
  content = content.replace(/text-slate-800/g, 'text-slate-800 dark:text-slate-200');
  content = content.replace(/text-slate-700/g, 'text-slate-700 dark:text-slate-300');
  content = content.replace(/text-slate-600/g, 'text-slate-600 dark:text-slate-300');
  content = content.replace(/text-slate-500/g, 'text-slate-500 dark:text-slate-400');
  content = content.replace(/text-slate-400/g, 'text-slate-400 dark:text-slate-500');
  
  // Fix some specific cases where dark:bg-slate-900 dark:bg-slate-900 might happen
  content = content.replace(/dark:bg-slate-900 dark:bg-slate-900/g, 'dark:bg-slate-900');
  content = content.replace(/dark:text-white dark:text-white/g, 'dark:text-white');
  
  // Fix ProjectDetail glassCardStyle
  content = content.replace(
    /backgroundColor: `rgba\(255, 255, 255, var\(--glass-opacity\)\)`/,
    'backgroundColor: settings.darkMode ? `rgba(15, 23, 42, var(--glass-opacity))` : `rgba(255, 255, 255, var(--glass-opacity))`'
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

fixFile('src/pages/LandingPage.tsx');
fixFile('src/pages/PricingPage.tsx');
