import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

interface ArxivAuthor {
  name: string;
}

interface ArxivEntry {
  title: string;
  author: ArxivAuthor | ArxivAuthor[];
  published: string;
  summary: string;
  id: string;
}

interface ArxivResponse {
  feed: {
    entry?: ArxivEntry[];
  };
}

interface Paper {
  title: string;
  authors: string[];
  date: string;
  keyPoints: string[];
  description: string;
  link: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start') || '0';

  try {
    const query = 'cat:cs.AI+OR+cat:cs.LG+OR+cat:cs.CL+OR+cat:cs.CV+OR+cat:stat.ML';
    const response = await fetch(
      `https://export.arxiv.org/api/query?search_query=${query}&start=${start}&max_results=10&sortBy=submittedDate&sortOrder=descending`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch papers');
    }

    const text = await response.text();
    const parser = new XMLParser();
    const result = parser.parse(text) as ArxivResponse;
    const entries = result.feed.entry || [];

    const papers: Paper[] = entries.map((entry) => ({
      title: entry.title,
      authors: Array.isArray(entry.author) 
        ? entry.author.map((author: ArxivAuthor) => author.name)
        : [entry.author.name],
      date: new Date(entry.published).toLocaleDateString(),
      keyPoints: [
        entry.summary.split('.')[0] + '.',
        entry.summary.split('.')[1] ? entry.summary.split('.')[1] + '.' : '',
        entry.summary.split('.')[2] ? entry.summary.split('.')[2] + '.' : ''
      ].filter(Boolean),
      description: entry.summary,
      link: entry.id
    }));

    return NextResponse.json({ papers });
  } catch (error) {
    console.error('Error fetching papers:', error);
    return NextResponse.json({ error: 'Failed to fetch papers' }, { status: 500 });
  }
}