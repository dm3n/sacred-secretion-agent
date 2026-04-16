export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { EMAILS } from '@/lib/emails';
import { SIGNS } from '@/lib/lunar';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { name, email, sun_sign } = await req.json();

    if (!name || !email || !sun_sign) {
      return NextResponse.json({ error: 'Name, email, and sun sign are required.' }, { status: 400 });
    }

    if (!SIGNS.includes(sun_sign)) {
      return NextResponse.json({ error: 'Invalid sun sign.' }, { status: 400 });
    }

    // Check for existing subscriber
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return NextResponse.json({ error: 'This email is already subscribed.' }, { status: 409 });
    }

    const unsubscribe_token = crypto.randomBytes(32).toString('hex');

    const { error } = await supabase.from('subscribers').insert({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      sun_sign,
      unsubscribe_token,
      active: true,
    });

    if (error) {
      console.error('Subscribe error:', error);
      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
    }

    // Send welcome email
    await EMAILS.welcome({ name: name.trim(), email: email.toLowerCase(), unsubscribeToken: unsubscribe_token, sign: sun_sign });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Subscribe route failure:', error);
    return NextResponse.json({ error: 'Service unavailable. Please try again.' }, { status: 500 });
  }
}
