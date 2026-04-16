import { SubscribeForm } from '@/components/subscribe-form';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">

        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">
            Publication III · The Protocol
          </p>
          <h1 className="text-3xl font-light tracking-tight mb-4">
            Sacred Secretion
          </h1>
          <p className="text-neutral-400 leading-relaxed text-sm">
            Every month, the moon transits your natal sun sign and opens a 2.5-day window.
            During that window, a specialised secretion descends through your 33 vertebrae
            to the solar plexus before ascending to the pineal gland.
            Every tradition that has ever pointed toward direct experience of the divine
            was pointing at this process.
          </p>
          <p className="text-neutral-400 leading-relaxed text-sm mt-3">
            This agent tracks the lunar cycle for you and sends the right guidance
            at every phase — automatically, every month.
          </p>
        </div>

        <SubscribeForm />

        <div className="mt-12 pt-8 border-t border-neutral-900">
          <p className="text-xs text-neutral-600 leading-relaxed">
            Built on a three-paper series establishing the complete case for human divinity.{' '}
            <a
              href="https://github.com/dm3n/sacred-secretion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-300 transition-colors underline underline-offset-2"
            >
              Read the papers →
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}
