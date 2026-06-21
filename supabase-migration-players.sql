-- Migration: Create players table for XP/ELO rating system
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS players (
  device_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL DEFAULT 'Anonymous',
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  elo INTEGER NOT NULL DEFAULT 1000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_players_elo ON players (elo DESC);
CREATE INDEX IF NOT EXISTS idx_players_level ON players (level DESC);

-- Index for opponent lookup by name
CREATE INDEX IF NOT EXISTS idx_players_display_name ON players (display_name);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS players_updated_at ON players;
CREATE TRIGGER players_updated_at
  BEFORE UPDATE ON players
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads (for opponent ELO lookup and leaderboards)
CREATE POLICY "Anyone can read players" ON players FOR SELECT USING (true);

-- Allow anonymous inserts/updates (anon key used client-side)
CREATE POLICY "Anyone can insert players" ON players FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update players" ON players FOR UPDATE USING (true);
