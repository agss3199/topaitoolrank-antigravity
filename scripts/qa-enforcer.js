import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content');

function getMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getMarkdownFiles(filePath, fileList);
    } else if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function runQA() {
  const articlesDir = path.join(contentDir, 'articles');
  const pillarsDir = path.join(contentDir, 'pillars');
  
  const allFiles = [...getMarkdownFiles(articlesDir), ...getMarkdownFiles(pillarsDir)];
  
  let errors = 0;
  const titles = new Set();
  
  console.log(`🔍 Running QA Enforcer on ${allFiles.length} content files...\n`);

  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const parsed = matter(content);
    const { data } = parsed;
    const fileName = path.basename(file);

    // 1. Frontmatter Validation
    if (!data.title) {
      console.error(`❌ Missing title in ${fileName}`);
      errors++;
    } else {
      if (titles.has(data.title.toLowerCase())) {
        console.error(`❌ Duplicate title found: "${data.title}" in ${fileName}`);
        errors++;
      }
      titles.add(data.title.toLowerCase());
    }

    if (!data.status) {
      console.error(`❌ Missing status in ${fileName}`);
      errors++;
    }

    if (!data.category) {
      console.error(`❌ Missing category in ${fileName}`);
      errors++;
    }

    // 2. Minimum internal links check (for published articles only)
    if (data.status === 'published' && file.includes('articles')) {
      // Very basic markdown link extraction
      const linkRegex = /\]\((.*?)\)/g;
      const links = [...content.matchAll(linkRegex)].map(m => m[1]);
      
      const internalLinks = links.filter(link => link.startsWith('/') || !link.startsWith('http'));
      
      if (internalLinks.length < 2) {
         console.warn(`⚠️ Warning: ${fileName} has less than 2 internal links. Consider adding more for better SEO.`);
      }
    }
  }

  if (errors > 0) {
    console.error(`\n🚨 QA Failed with ${errors} error(s). Please fix them before publishing.`);
    process.exit(1);
  } else {
    console.log(`\n✅ QA Passed! Content is ready for production.`);
  }
}

runQA();
