import { Twitter, Linkedin, Heart, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Share } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useFavoritesStore } from "@/store/favorites";

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
  const shortenedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  const [copied, setCopied] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorite = isFavorite(title);

  const toggleFavorite = () => {
    const paperData = { title, authors, date, keyPoints, description, link };
    if (favorite) {
      removeFavorite(title);
    } else {
      addFavorite(paperData);
    }
  };

  return (
    <div>
      <div className="w-full max-w-4xl rounded-lg border bg-card p-4 pb-16 text-card-foreground shadow-sm md:p-6">
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div className="space-y-1 flex-1">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {authors.join(", ")}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 md:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="hover:text-primary transition-colors"
                  aria-label="Share options"
                >
                  <Share className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[200px]">
                <DropdownMenuItem
                  onSelect={() => {
                    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Check out "${title}" ${link || ""}`
                    )}${link ? `&url=${encodeURIComponent(link)}` : ""}`;
                    window.open(twitterUrl, "_blank");
                  }}
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  Share on Twitter
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      link || window.location.href
                    )}&title=${encodeURIComponent(title)}`;
                    window.open(linkedinUrl, "_blank");
                  }}
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  Share on LinkedIn
                </DropdownMenuItem>
                {link && (
                  <DropdownMenuItem
                    onSelect={() => {
                      navigator.clipboard.writeText(link);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    {copied ? (
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    Copy Link
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              onClick={toggleFavorite}
              className={`text-muted-foreground hover:text-primary transition-colors ${
                favorite ? "text-primary" : ""
              }`}
              aria-label={
                favorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-4 space-y-4 md:mt-6">
          <div className="space-y-2">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            {shortenedDescription}
          </p>
        </div>

        {/* Footer Section */}
        <div className="mt-4 flex flex-col gap-2 md:mt-6 md:flex-row md:items-center md:justify-between">
          <time
            className="text-sm text-muted-foreground"
            dateTime={new Date(date).toISOString()}
          >
            {date}
          </time>
          <Link
            href={link || "#"}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
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
