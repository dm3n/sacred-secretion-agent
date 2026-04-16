import Link from 'next/link';

export default function Unsubscribe() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-light tracking-tight mb-4">Unsubscribed.</h1>
        <p className="text-neutral-400 text-sm leading-relaxed mb-8">
          You have been removed from the cycle tracking list. No further emails will be sent.
        </p>
        <p className="text-xs text-neutral-600">
          <Link href="/" className="text-neutral-500 hover:text-neutral-300 transition-colors">
            Sign up again →
          </Link>
        </p>
      </div>
    </main>
  );
}
