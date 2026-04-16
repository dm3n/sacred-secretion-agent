import { Resend } from 'resend';

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not set');
    _resend = new Resend(apiKey);
  }
  return _resend;
}

const FROM = 'Sacred Secretion <sacred@nodebase.ca>';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://sacred-secretion-agent-2zug.vercel.app';

function wrap(name: string, body: string, unsubscribeToken: string): string {
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#1a1a1a;line-height:1.7;background:#fff">
      ${body}
      <hr style="border:none;border-top:1px solid #e8e8e8;margin:40px 0"/>
      <p style="font-size:12px;color:#999;margin:0">
        You're receiving this because you signed up at
        <a href="${BASE_URL}" style="color:#999">${BASE_URL}</a>.
        &nbsp;·&nbsp;
        <a href="${BASE_URL}/unsubscribe?token=${unsubscribeToken}" style="color:#999">Unsubscribe</a>
        &nbsp;·&nbsp;
        <a href="https://github.com/dm3n/sacred-secretion" style="color:#999">Read the papers</a>
      </p>
    </div>
  `;
}

type EmailArgs = { name: string; email: string; unsubscribeToken: string; sign: string };

export const EMAILS = {
  welcome: ({ name, email, unsubscribeToken, sign }: EmailArgs) =>
    getResend().emails.send({
      from: FROM, to: email,
      subject: 'Welcome — the practice begins',
      html: wrap(name, `
        <p style="font-size:22px;font-weight:bold;margin:0 0 24px">Welcome, ${name}.</p>
        <p>You have signed up to track the sacred secretion cycle — the monthly ascent of cerebrospinal fluid through the 33 vertebrae to the pineal gland. Every tradition that has ever pointed toward direct experience of the divine was pointing at this process.</p>
        <p>Your natal sun sign is <strong>${sign}</strong>. Each month when the moon transits ${sign}, your 2.5-day window opens. That is when the secretion is in the solar plexus — the Gethsemane phase — and everything you do either preserves the cycle or loses it.</p>
        <p><strong>You will receive an email:</strong></p>
        <ul>
          <li>When your window opens</li>
          <li>At each critical moment during the 2.5-day window</li>
          <li>When the window closes and the ascent begins</li>
          <li>At day 7 and day 14 of the ascent phase</li>
          <li>Two days before your next window opens</li>
        </ul>
        <p>Until then — the foundational practices:</p>
        <ul>
          <li><strong>Morning sunlight</strong> — 15 minutes, no sunglasses, first hour after waking</li>
          <li><strong>Daily meditation</strong> — spine vertical, breath base to crown, 30 minutes</li>
          <li><strong>Darkness at night</strong> — no screens after dark, sleep in complete darkness</li>
        </ul>
        <p>The moon is tracking your sign. The first window notification arrives when the time comes.</p>
        <blockquote style="border-left:3px solid #ddd;margin:24px 0;padding:0 16px;color:#666;font-style:italic">
          "The kingdom of God is within you." — Luke 17:21
        </blockquote>
        <p>It is. This practice is how you find it.</p>
      `, unsubscribeToken),
    }),

  windowOpens: ({ name, email, unsubscribeToken, sign }: EmailArgs) =>
    getResend().emails.send({
      from: FROM, to: email,
      subject: `The window is open — 2.5 days`,
      html: wrap(name, `
        <p style="font-size:22px;font-weight:bold;margin:0 0 24px">The moon has entered ${sign}.</p>
        <p>${name}, your window is open. You have approximately <strong>2.5 days</strong>.</p>
        <p>The secretion has descended into the solar plexus — the Gethsemane phase. Everything you do in the next 60 hours either preserves it or destroys it.</p>
        <p><strong>The only rules that matter right now:</strong></p>
        <ul>
          <li>No sexual expenditure. One failure resets the cycle to next month.</li>
          <li>No alcohol, no cannabis, no processed food. Clean whole food and water only.</li>
          <li>Emotional stillness. Breathe through anything provocative. Do not erupt.</li>
          <li>Meditate twice today. Morning and evening. Spine vertical, breath base to crown, 30 min each.</li>
          <li>Sleep in total darkness. The pineal works hardest between 11pm and 3am.</li>
        </ul>
        <blockquote style="border-left:3px solid #ddd;margin:24px 0;padding:0 16px;color:#666;font-style:italic">
          "The kingdom of God is within you." — Luke 17:21
        </blockquote>
        <p>Protect it.</p>
      `, unsubscribeToken),
    }),

  windowDay1: ({ name, email, unsubscribeToken }: EmailArgs) =>
    getResend().emails.send({
      from: FROM, to: email,
      subject: 'Day 1 — what to do today',
      html: wrap(name, `
        <p style="font-size:20px;font-weight:bold;margin:0 0 24px">24 hours in.</p>
        <p>The secretion is still in the Gethsemane phase. Still vulnerable. Stay on it.</p>
        <p><strong>Today specifically:</strong></p>
        <ul>
          <li><strong>Morning sun</strong> — 15 minutes outside, no sunglasses, first hour after waking. This entrains the pineal's entire production cycle for the next 24 hours.</li>
          <li><strong>Morning sit</strong> — 30 minutes minimum. Spine vertical. Start at the base, breathe upward slowly through each vertebral region to the crown. Rest at the top without forcing.</li>
          <li><strong>Eat light</strong> — reduce your eating window. Give the body less to process and more substrate to work with internally.</li>
          <li><strong>Evening sit in darkness</strong> — after sunset, no screens. Sit again in complete darkness. The pineal is most active now. Let it work.</li>
        </ul>
        <p>One more day of the window after today. Hold.</p>
      `, unsubscribeToken),
    }),

  windowMidpoint: ({ name, email, unsubscribeToken }: EmailArgs) =>
    getResend().emails.send({
      from: FROM, to: email,
      subject: 'Gethsemane — the pressure point',
      html: wrap(name, `
        <p style="font-size:20px;font-weight:bold;margin:0 0 24px">This is the hardest part.</p>
        <p>You are at the Gethsemane phase — where most cycles are lost. Not through dramatic failure. Through small accumulated compromises.</p>
        <p><strong>The three things that destroy the cycle:</strong></p>
        <ol>
          <li><strong>Sexual expenditure</strong> — the secretion and the seminal fluid share biochemical substrate. One depletes the other. Chemistry, not morality.</li>
          <li><strong>Toxic ingestion</strong> — alcohol and cannabis are direct solvents of the secretion. Stay clean.</li>
          <li><strong>Emotional volatility</strong> — chronic cortisol and adrenaline flood the spinal channel. Feel what arises, do not become it.</li>
        </ol>
        <p>The window closes in approximately 12–18 hours. Tonight: darkness, stillness, a long sit. Make the final hours count.</p>
        <blockquote style="border-left:3px solid #ddd;margin:24px 0;padding:0 16px;color:#666;font-style:italic">
          "Unless a grain of wheat falls into the earth and dies, it remains alone." — John 12:24
        </blockquote>
      `, unsubscribeToken),
    }),

  windowClosing: ({ name, email, unsubscribeToken }: EmailArgs) =>
    getResend().emails.send({
      from: FROM, to: email,
      subject: 'Final hours — hold',
      html: wrap(name, `
        <p style="font-size:20px;font-weight:bold;margin:0 0 24px">The window is closing.</p>
        <p>If you have held it clean, what begins now is the ascent — the secretion moving through the remaining vertebral stations toward the pineal.</p>
        <p><strong>Hold these conditions daily until the next window:</strong></p>
        <ul>
          <li>30-minute morning sit, spine vertical, base to crown</li>
          <li>Morning sunlight within the first hour of waking</li>
          <li>Total darkness at night</li>
        </ul>
        <p>The signals will come in their own time. Spinal warmth during meditation. Vivid dreams. A quality of presence you have not had before. Do not chase them — just hold the practice. The process knows what it is doing.</p>
      `, unsubscribeToken),
    }),

  ascentWeek1: ({ name, email, unsubscribeToken }: EmailArgs) =>
    getResend().emails.send({
      from: FROM, to: email,
      subject: 'Day 7 — the signals',
      html: wrap(name, `
        <p style="font-size:20px;font-weight:bold;margin:0 0 24px">One week since the window closed.</p>
        <p>If you held the cycle clean, the secretion has been ascending for seven days. Here is what to watch for:</p>
        <ul>
          <li><strong>Dream intensity</strong> — vivid, structured, sometimes luminous. The first and most reliable signal of pineal reactivation.</li>
          <li><strong>Spinal warmth during meditation</strong> — heat, tingling, or a sense of upward movement along the spine. The secretion in transit.</li>
          <li><strong>Spontaneous presence</strong> — moments where everything is simply, quietly here. Brief at first. They lengthen with practice.</li>
          <li><strong>Heightened synchronicity</strong> — events aligning in ways that feel non-random. As internal coherence increases, the external reflects it.</li>
        </ul>
        <p>These are not imagination. They are physiological signals. Keep the daily practice consistent. Your next window reminder arrives in approximately 3 weeks.</p>
      `, unsubscribeToken),
    }),

  ascentWeek2: ({ name, email, unsubscribeToken }: EmailArgs) =>
    getResend().emails.send({
      from: FROM, to: email,
      subject: 'Day 14 — deepen the practice',
      html: wrap(name, `
        <p style="font-size:20px;font-weight:bold;margin:0 0 24px">Halfway through the cycle.</p>
        <p>Two weeks of daily practice. This is where most people either deepen or plateau. If the practice is becoming a burden, that is the ego resisting. The practice is supposed to dissolve what is resisting. Sit with the resistance itself — observe it, breathe into it. It cannot survive observation.</p>
        <p><strong>Add one thing this week:</strong></p>
        <p>After your morning sit, before you move, ask: <em>"Am I aware of the present moment?"</em> Do not answer analytically — rest in the awareness that is already present before any thought arises. Hold it for one minute. This is witness consciousness — the recognition of what is already the case when the mental noise quiets enough to see it.</p>
        <blockquote style="border-left:3px solid #ddd;margin:24px 0;padding:0 16px;color:#666;font-style:italic">
          "Ye are gods." — Psalm 82:6
        </blockquote>
        <p>Not metaphor. Recognition.</p>
      `, unsubscribeToken),
    }),

  preWindow: ({ name, email, unsubscribeToken, sign }: EmailArgs) =>
    getResend().emails.send({
      from: FROM, to: email,
      subject: 'Your next window opens in ~2 days',
      html: wrap(name, `
        <p style="font-size:20px;font-weight:bold;margin:0 0 24px">The moon approaches ${sign}.</p>
        <p>In approximately 48 hours your window opens again.</p>
        <p><strong>The next 48 hours:</strong></p>
        <ul>
          <li>Eat clean. Eliminate anything heavy or processed. The vessel needs to be ready.</li>
          <li>No alcohol. Give the system two days of clarity before the window begins.</li>
          <li>Emotional audit — metabolise anything unresolved before the window opens.</li>
          <li>Consider a light fast the day before the window opens. Heightens sensitivity significantly.</li>
        </ul>
        <p>The moon is coming. Be ready.</p>
      `, unsubscribeToken),
    }),
};
