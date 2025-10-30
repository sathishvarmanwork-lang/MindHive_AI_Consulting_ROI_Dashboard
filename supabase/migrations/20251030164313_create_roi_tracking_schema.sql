/*
  # AI ROI Impact Dashboard Schema

  1. New Tables
    - `clients`
      - `id` (uuid, primary key)
      - `consultant_id` (uuid, references auth.users)
      - `company_name` (text)
      - `industry` (text)
      - `primary_contact` (text)
      - `use_case` (text)
      - `implementation_date` (date)
      - `created_at` (timestamptz)
    
    - `metrics`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references clients)
      - `metric_name` (text)
      - `is_selected` (boolean)
      - `created_at` (timestamptz)
    
    - `integrations`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references clients)
      - `platform_name` (text)
      - `status` (text)
      - `metrics_available` (integer)
      - `sync_progress` (integer)
      - `connected_at` (timestamptz)
    
    - `baseline_data`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references clients)
      - `ticket_volume` (numeric)
      - `avg_handle_time` (numeric)
      - `fcr_rate` (numeric)
      - `csat_score` (numeric)
      - `cost_per_ticket` (numeric)
      - `collection_start_date` (date)
      - `collection_end_date` (date)
      - `created_at` (timestamptz)
    
    - `tracking_data`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references clients)
      - `date` (date)
      - `ticket_volume` (numeric)
      - `avg_handle_time` (numeric)
      - `fcr_rate` (numeric)
      - `csat_score` (numeric)
      - `cost_per_ticket` (numeric)
      - `created_at` (timestamptz)
    
    - `roi_reports`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references clients)
      - `quarter` (text)
      - `total_savings` (numeric)
      - `revenue_impact` (numeric)
      - `combined_value` (numeric)
      - `shared_at` (timestamptz)
      - `view_count` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated consultants to manage their client data
    - Clients can view their own reports via shared links
*/

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  consultant_id uuid REFERENCES auth.users(id),
  company_name text NOT NULL,
  industry text NOT NULL,
  primary_contact text NOT NULL,
  use_case text NOT NULL,
  implementation_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Consultants can manage their own clients"
  ON clients FOR ALL
  TO authenticated
  USING (auth.uid() = consultant_id)
  WITH CHECK (auth.uid() = consultant_id);

-- Create metrics table
CREATE TABLE IF NOT EXISTS metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  metric_name text NOT NULL,
  is_selected boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Consultants can manage metrics for their clients"
  ON metrics FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = metrics.client_id
      AND clients.consultant_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = metrics.client_id
      AND clients.consultant_id = auth.uid()
    )
  );

-- Create integrations table
CREATE TABLE IF NOT EXISTS integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  platform_name text NOT NULL,
  status text DEFAULT 'not_connected',
  metrics_available integer DEFAULT 0,
  sync_progress integer DEFAULT 0,
  connected_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Consultants can manage integrations for their clients"
  ON integrations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = integrations.client_id
      AND clients.consultant_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = integrations.client_id
      AND clients.consultant_id = auth.uid()
    )
  );

-- Create baseline_data table
CREATE TABLE IF NOT EXISTS baseline_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  ticket_volume numeric NOT NULL,
  avg_handle_time numeric NOT NULL,
  fcr_rate numeric NOT NULL,
  csat_score numeric NOT NULL,
  cost_per_ticket numeric NOT NULL,
  collection_start_date date NOT NULL,
  collection_end_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE baseline_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Consultants can manage baseline data for their clients"
  ON baseline_data FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = baseline_data.client_id
      AND clients.consultant_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = baseline_data.client_id
      AND clients.consultant_id = auth.uid()
    )
  );

-- Create tracking_data table
CREATE TABLE IF NOT EXISTS tracking_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  date date NOT NULL,
  ticket_volume numeric NOT NULL,
  avg_handle_time numeric NOT NULL,
  fcr_rate numeric NOT NULL,
  csat_score numeric NOT NULL,
  cost_per_ticket numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tracking_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Consultants can manage tracking data for their clients"
  ON tracking_data FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = tracking_data.client_id
      AND clients.consultant_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = tracking_data.client_id
      AND clients.consultant_id = auth.uid()
    )
  );

-- Create roi_reports table
CREATE TABLE IF NOT EXISTS roi_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  quarter text NOT NULL,
  total_savings numeric NOT NULL,
  revenue_impact numeric NOT NULL,
  combined_value numeric NOT NULL,
  shared_at timestamptz,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE roi_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Consultants can manage reports for their clients"
  ON roi_reports FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = roi_reports.client_id
      AND clients.consultant_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = roi_reports.client_id
      AND clients.consultant_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_clients_consultant ON clients(consultant_id);
CREATE INDEX IF NOT EXISTS idx_metrics_client ON metrics(client_id);
CREATE INDEX IF NOT EXISTS idx_integrations_client ON integrations(client_id);
CREATE INDEX IF NOT EXISTS idx_baseline_client ON baseline_data(client_id);
CREATE INDEX IF NOT EXISTS idx_tracking_client_date ON tracking_data(client_id, date);
CREATE INDEX IF NOT EXISTS idx_reports_client ON roi_reports(client_id);
