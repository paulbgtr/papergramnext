import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4 px-4 text-center">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <h2 className="text-xl font-medium">Page Not Found</h2>
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
      >
        Back to Home
      </Link>
    </div>
  );
}
