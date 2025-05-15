//  在文章详情增加一个文章目录

type Heading = {
  text: string;
  level: number;
  slug: string;
};

export function extractHeadings(content: any[]): Heading[] {
  const headings: Heading[] = [];
  
  content.forEach((block) => {
    if (block.style?.match(/^h[1-4]$/)) {
      const level = parseInt(block.style.charAt(1));
      const text = block.children
        ?.map((child: any) => child.text)
        .join('') || '';
      const slug = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      headings.push({ text, level, slug });
    }
  });
  
  return headings;
} 