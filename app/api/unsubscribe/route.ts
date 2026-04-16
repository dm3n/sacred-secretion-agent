import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) return NextResponse.redirect(new URL('/', req.url));

  await supabase.from('subscribers').update({ active: false }).eq('unsubscribe_token', token);

  return NextResponse.redirect(new URL('/unsubscribe', req.url));
}
