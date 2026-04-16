import { supabase, type Subscriber, type Cycle } from './supabase';
import { transitOccurredToday, moonInSign, type ZodiacSign } from './lunar';
import { EMAILS } from './emails';

export function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000);
}

export function emailAlreadySent(cycle: Cycle, key: string): boolean {
  return (cycle.emails_sent || []).includes(key);
}

async function setPhase(cycleId: string, phase: string) {
  await supabase.from('cycles').update({ phase, updated_at: new Date().toISOString() }).eq('id', cycleId);
}

export async function processSubscriber(sub: Subscriber) {
  const sign = sub.sun_sign as ZodiacSign;
  const now = new Date();
  const args = { name: sub.name, email: sub.email, unsubscribeToken: sub.unsubscribe_token, sign: sub.sun_sign };

  // Fetch active cycle
  const { data: cycles } = await supabase
    .from('cycles')
    .select('*')
    .eq('subscriber_id', sub.id)
    .eq('completed', false)
    .order('window_start', { ascending: false })
    .limit(1);

  let cycle: Cycle | null = cycles?.[0] ?? null;

  // ── Window just opened ──────────────────────────────────────────────────────
  if (transitOccurredToday(sign, now)) {
    if (!cycle) {
      const { data } = await supabase
        .from('cycles')
        .insert({ subscriber_id: sub.id, window_start: now.toISOString(), phase: 'window', emails_sent: [] })
        .select()
        .single();
      cycle = data;
    }
    if (cycle && !emailAlreadySent(cycle, 'windowOpens')) {
      await EMAILS.windowOpens(args);
      await supabase.rpc('cycle_mark_email_sent', { p_cycle_id: cycle.id, p_key: 'windowOpens' });
    }
    return;
  }

  if (!cycle) return; // no active cycle, waiting for next transit

  const days = daysSince(cycle.window_start);

  // ── Inside the window ───────────────────────────────────────────────────────
  if (moonInSign(sign, now)) {
    if (days >= 1 && !emailAlreadySent(cycle, 'windowDay1')) {
      await EMAILS.windowDay1(args);
      await supabase.rpc('cycle_mark_email_sent', { p_cycle_id: cycle.id, p_key: 'windowDay1' });
      await setPhase(cycle.id, 'window-day1');
    } else if (days >= 2 && !emailAlreadySent(cycle, 'windowMidpoint')) {
      await EMAILS.windowMidpoint(args);
      await supabase.rpc('cycle_mark_email_sent', { p_cycle_id: cycle.id, p_key: 'windowMidpoint' });
      await setPhase(cycle.id, 'gethsemane');
    }
    return;
  }

  // ── Window just closed ──────────────────────────────────────────────────────
  if (!emailAlreadySent(cycle, 'windowClosing')) {
    await EMAILS.windowClosing(args);
    await supabase.rpc('cycle_mark_email_sent', { p_cycle_id: cycle.id, p_key: 'windowClosing' });
    await setPhase(cycle.id, 'ascent');
    return;
  }

  // ── Ascent phase emails ─────────────────────────────────────────────────────
  if (days >= 7 && !emailAlreadySent(cycle, 'ascentWeek1')) {
    await EMAILS.ascentWeek1(args);
    await supabase.rpc('cycle_mark_email_sent', { p_cycle_id: cycle.id, p_key: 'ascentWeek1' });
    return;
  }
  if (days >= 14 && !emailAlreadySent(cycle, 'ascentWeek2')) {
    await EMAILS.ascentWeek2(args);
    await supabase.rpc('cycle_mark_email_sent', { p_cycle_id: cycle.id, p_key: 'ascentWeek2' });
    return;
  }
  if (days >= 26 && !emailAlreadySent(cycle, 'preWindow')) {
    await EMAILS.preWindow(args);
    await supabase.rpc('cycle_mark_email_sent', { p_cycle_id: cycle.id, p_key: 'preWindow' });
    return;
  }

  // ── Cycle complete ──────────────────────────────────────────────────────────
  if (days >= 28) {
    await supabase.from('cycles').update({ completed: true, completed_at: new Date().toISOString() }).eq('id', cycle.id);
  }
}
