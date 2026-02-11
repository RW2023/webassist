import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Simple types for our content
interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

// 1. Read all MDX files from src/content/faqs
export function getFAQContent(): FAQItem[] {
  const directory = path.join(process.cwd(), 'src/content/faqs');
  
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs.readdirSync(directory);
  let allFAQs: FAQItem[] = [];

  for (const file of files) {
    if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue;

    const filePath = path.join(directory, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Naive parsing: Split by '## ' headers
    // Assumption: Each H2 is a question, following text is answer
    const sections = content.split(/^## /m);

    for (const section of sections) {
      if (!section.trim()) continue;

      const lines = section.split('\n');
      const question = lines[0].trim();
      const answer = lines.slice(1).join('\n').trim();

      if (question && answer) {
         allFAQs.push({
           question,
           answer,
           category: data.category || 'General'
         });
      }
    }
  }

  return allFAQs;
}

// 2. Simple Keyword / Fuzzy Matcher
export function findRelevantContent(query: string, faqs: FAQItem[]): string {
  const lowerQuery = query.toLowerCase();
  
  // Scored matching
  const scored = faqs.map(faq => {
    let score = 0;
    if (faq.question.toLowerCase().includes(lowerQuery)) score += 10;
    if (faq.answer.toLowerCase().includes(lowerQuery)) score += 5;
    
    // Exact word matches
    const words = lowerQuery.split(' ');
    words.forEach(word => {
        if (faq.question.toLowerCase().includes(word)) score += 1;
        if (faq.answer.toLowerCase().includes(word)) score += 0.5;
    });

    return { ...faq, score };
  });

  // Filter low scores and sort
  const relevant = scored
    .filter(item => item.score > 1) // Noise threshold
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Top 3

  if (relevant.length === 0) return '';

  return relevant.map(item => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n');
}
