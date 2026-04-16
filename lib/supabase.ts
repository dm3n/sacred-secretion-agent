import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('Supabase env vars not set');
    _client = createClient(url, key);
  }
  return _client;
}

// Convenience proxy so existing call sites work unchanged
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type Subscriber = {
  id: string;
  name: string;
  email: string;
  sun_sign: string;
  unsubscribe_token: string;
  active: boolean;
  created_at: string;
};

export type Cycle = {
  id: string;
  subscriber_id: string;
  window_start: string;
  phase: string;
  emails_sent: string[];
  completed: boolean;
  completed_at: string | null;
  updated_at: string;
};
