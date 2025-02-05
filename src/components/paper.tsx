import { Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

interface PaperProps {
  title: string;
  authors: string[];
  date: string;
  keyPoints: string[];
  description: string;
  link?: string;
}

export const Paper = ({
  title,
  authors,
  date,
  keyPoints,
  description,
  link,
}: PaperProps) => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-4xl rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">
              {authors.join(", ")}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href="https://twitter.com/intent/tweet"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/sharing/share-offsite"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            {link && (
              <Link
                href={link}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="View source"
              >
                <LinkIcon className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <time
            className="text-sm text-muted-foreground"
            dateTime={new Date(date).toISOString()}
          >
            {date}
          </time>
          <Link
            href={link || "#"}
            className="inline-flex items-center space-x-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <span>Continue Reading</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
