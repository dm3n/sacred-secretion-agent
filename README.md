# Sacred Secretion Agent

A minimal web app that tracks the monthly lunar cycle for each subscriber and sends practice-guiding emails at every phase of the sacred secretion process.

**Live:** [sacred-secretion-agent-2zug.vercel.app](https://sacred-secretion-agent-2zug.vercel.app)

Built on the three-paper research series: **[github.com/dm3n/sacred-secretion](https://github.com/dm3n/sacred-secretion)**

This app is the automated implementation of **Publication III — The Map**.

---

## How It Works

1. User signs up with their name, email, and natal sun sign
2. Agent tracks the moon's ecliptic longitude daily using local astronomical calculation (no external API)
3. When the moon enters the user's sun sign, the 2.5-day window opens and the email sequence begins
4. 7 emails per cycle, automatically sequenced across the full month

## Email Sequence

| Trigger | Email |
|---|---|
| Moon enters sun sign | Window is open — 2.5 days |
| Day 1 of window | What to do today |
| Day 2 of window | Gethsemane — the pressure point |
| ~Hour 58 of window | Final hours — hold |
| Day 7 post-window | The ascent — signals to watch |
| Day 14 post-window | Deepen the practice |
| Day 26 post-window | Next window in ~2 days |

## Stack

- **Next.js 16** — app framework
- **shadcn/ui** — UI components
- **Supabase** — subscriber and cycle state storage
- **Resend** — email delivery
- **Vercel** — hosting + daily cron at 7am UTC
- **astronomia** — local moon position calculation (no external API)

## Deploy Your Own

1. Fork this repo
2. Create a Supabase project and run `supabase-schema.sql` in the SQL editor
3. Add a verified sending domain in Resend and update the `FROM` address in `lib/emails.ts`
4. Deploy to Vercel and set environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CRON_SECRET=
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

5. Vercel automatically runs `/api/cron/daily` at 7am UTC daily

## Local Development

```bash
cp .env.example .env.local
# fill in credentials
npm install
npm run dev
```
