import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-32">
      <h1 className="text-[2.25rem] md:text-[3rem] font-semibold leading-tight">
        Page not found
      </h1>
      <p className="mt-4 text-ink-muted max-w-[48ch]">
        There&apos;s nothing at this address. It may have moved when the site
        was rebuilt.
      </p>
      <Link
        href="/"
        className="inline-flex mt-8 px-5 py-3 bg-ink text-sheet font-medium hover:bg-signal transition-colors"
      >
        Go to the home page
      </Link>
    </div>
  );
}
