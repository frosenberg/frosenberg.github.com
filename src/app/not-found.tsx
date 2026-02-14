import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <span className="font-mono text-sm text-primary">404</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-heading mt-2">
          Page Not Found
        </h1>
        <p className="text-text-muted mt-4 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dim transition-colors mt-8"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
