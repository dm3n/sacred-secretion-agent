import Link from 'next/link';

export default function Subscribed() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">
          The practice begins
        </p>
        <h1 className="text-3xl font-light tracking-tight mb-4">
          You&apos;re in.
        </h1>
        <p className="text-neutral-400 leading-relaxed text-sm mb-3">
          Check your inbox — a welcome email is on its way explaining exactly what to expect and when.
        </p>
        <p className="text-neutral-400 leading-relaxed text-sm">
          The agent is now tracking the moon&apos;s position against your sun sign.
          When your window opens, you will know.
        </p>
        <div className="mt-12 pt-8 border-t border-neutral-900">
          <p className="text-xs text-neutral-600">
            <Link href="/" className="text-neutral-500 hover:text-neutral-300 transition-colors">
              ← Back
            </Link>
            {' '}·{' '}
            <a
              href="https://github.com/dm3n/sacred-secretion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Read the papers →
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
