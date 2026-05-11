/*
  # Create contacts and status_checks tables

  1. New Tables
    - `contact_requests`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `company` (text, optional)
      - `service` (text, required) - innovation | ai | digital | other
      - `message` (text, required)
      - `locale` (text, default 'en')
      - `created_at` (timestamptz)
    - `status_checks`
      - `id` (uuid, primary key)
      - `client_name` (text, required)
      - `timestamp` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - `contact_requests`: allow INSERT for anonymous users (public lead form), SELECT for authenticated only
    - `status_checks`: allow INSERT and SELECT for authenticated users only
*/

CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  service text NOT NULL DEFAULT 'innovation',
  message text NOT NULL,
  locale text NOT NULL DEFAULT 'en',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact request"
  ON contact_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact requests"
  ON contact_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS status_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE status_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert status checks"
  ON status_checks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view status checks"
  ON status_checks FOR SELECT
  TO authenticated
  USING (true);
