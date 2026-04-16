import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(url, key);

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
