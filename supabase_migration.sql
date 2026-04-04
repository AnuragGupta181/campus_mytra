-- Create pre_registrations table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS pre_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_pre_registrations_email ON pre_registrations(email);

-- Enable Row Level Security (RLS)
ALTER TABLE pre_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public registration)
CREATE POLICY "Allow public inserts" ON pre_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to prevent reading data (privacy)
CREATE POLICY "Deny all reads" ON pre_registrations
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- Optional: Add comment
COMMENT ON TABLE pre_registrations IS 'Stores pre-registration data for Campus Mytra app';
