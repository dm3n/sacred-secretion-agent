-- Sacred Secretion Agent — Supabase Schema
-- Run once in the Supabase SQL editor

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── Subscribers ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscribers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  email             TEXT NOT NULL UNIQUE,
  sun_sign          TEXT NOT NULL,
  unsubscribe_token TEXT NOT NULL UNIQUE,
  active            BOOLEAN NOT NULL DEFAULT true,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Cycles ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cycles (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id  UUID NOT NULL REFERENCES subscribers(id) ON DELETE CASCADE,
  window_start   TIMESTAMPTZ NOT NULL,
  phase          TEXT NOT NULL DEFAULT 'window',
  emails_sent    TEXT[] NOT NULL DEFAULT '{}',
  completed      BOOLEAN NOT NULL DEFAULT false,
  completed_at   TIMESTAMPTZ,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS cycles_subscriber_id_idx ON cycles(subscriber_id);
CREATE INDEX IF NOT EXISTS cycles_completed_idx ON cycles(completed);

-- ── Helper function for atomic email key append ───────────────────────────────
CREATE OR REPLACE FUNCTION cycle_mark_email_sent(p_cycle_id UUID, p_key TEXT)
RETURNS void LANGUAGE sql AS $$
  UPDATE cycles
  SET emails_sent = array_append(emails_sent, p_key),
      updated_at  = now()
  WHERE id = p_cycle_id
    AND NOT (p_key = ANY(emails_sent));
$$;

-- ── RLS (disable for service-role access) ─────────────────────────────────────
ALTER TABLE subscribers DISABLE ROW LEVEL SECURITY;
ALTER TABLE cycles DISABLE ROW LEVEL SECURITY;
