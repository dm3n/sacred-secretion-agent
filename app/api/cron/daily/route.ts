import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { processSubscriber } from '@/lib/cycle';

export async function GET(req: NextRequest) {
  // Verify Vercel cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('active', true);

  if (error) {
    console.error('Cron fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }

  const results = await Promise.allSettled(
    (subscribers || []).map((sub) => processSubscriber(sub))
  );

  const failed = results.filter((r) => r.status === 'rejected').length;

  return NextResponse.json({
    ok: true,
    processed: subscribers?.length ?? 0,
    failed,
    timestamp: new Date().toISOString(),
  });
}
