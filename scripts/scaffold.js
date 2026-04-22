import fs from 'fs';
import path from 'path';

const type = process.argv[2]; // 'article' or 'pillar'
const title = process.argv[3];
const slug = process.argv[4];

if (!type || !title || !slug) {
  console.error("Usage: node scaffold.js <article|pillar> <\"Title\"> <slug>");
  process.exit(1);
}

const date = new Date().toISOString().split('T')[0];
let content = '';

if (type === 'article') {
  content = `---
title: "${title}"
description: "Comprehensive review and guide about ${title}."
pubDate: ${date}
author: "Editor"
category: "uncategorized"
tags: []
pillarId: ""
status: "draft"
---

# ${title}

Write your introduction here.

## Overview
What is this tool?

## Features
- Feature 1
- Feature 2

## Pros & Cons

## Final Verdict
`;
} else if (type === 'pillar') {
  content = `---
title: "${title}"
description: "The ultimate guide to ${title}."
pubDate: ${date}
category: "uncategorized"
status: "draft"
---

# ${title}

Write your pillar introduction here.

## Core Concepts

## Top Tools in this Category

## Frequently Asked Questions
`;
} else {
  console.error("Type must be 'article' or 'pillar'");
  process.exit(1);
}

const dir = path.join(process.cwd(), 'src', 'content', type + 's');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const filePath = path.join(dir, `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`❌ File ${filePath} already exists!`);
  process.exit(1);
}

fs.writeFileSync(filePath, content);
console.log(`✅ Successfully created ${type}: ${filePath}`);
