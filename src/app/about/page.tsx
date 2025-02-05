import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:px-8">
      <h1 className="mb-8 text-2xl font-bold text-primary">
        About PapergramNext
      </h1>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">What is PapergramNext?</h2>
        <p className="mb-4 text-base text-muted-foreground">
          PapergramNext (shortened as PapergramN) is a modern rebuild of the
          original Papergram project, reimagined with Next.js and modern web
          technologies. It helps you stay up-to-date with the latest
          developments in AI, Machine Learning, Computer Vision, and Natural
          Language Processing.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Features</h2>
        <ul className="list-inside list-disc space-y-2 text-base text-muted-foreground">
          <li>Real-time updates from arXiv</li>
          <li>Infinite scroll for seamless browsing</li>
          <li>Key points extraction for quick understanding</li>
          <li>Direct links to original papers</li>
          <li>Clean, distraction-free interface</li>
          <li>Modern tech stack for better performance</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">How to Use</h2>
        <p className="mb-4 text-base text-muted-foreground">
          Simply scroll through the papers on the home page. Each paper card
          shows the title, authors, publication date, and key points. Click on a
          paper to view its full details or visit the original arXiv page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Credits</h2>
        <p className="text-base text-muted-foreground">
          PapergramN is inspired by the original Papergram project. While
          maintaining the core vision of making research papers accessible,
          we&apos;ve rebuilt it from the ground up using modern technologies
          like Next.js and Tailwind CSS for an enhanced user and developer
          experience.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Open Source</h2>
        <p className="text-base text-muted-foreground">
          PapergramN is open-source and available on{" "}
          <a
            href="https://github.com/paulbgtr/papergramnext"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub
          </a>
          . The original Papergram project can be found{" "}
          <Link
            href="https://github.com/cneuralnetwork/papergram/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            here
          </Link>
          . Feel free to contribute or suggest improvements to either project.
        </p>
      </section>
    </div>
  );
}
