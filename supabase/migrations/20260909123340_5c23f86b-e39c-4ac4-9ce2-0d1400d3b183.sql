CREATE TABLE public.coverage_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  municipality text NOT NULL,
  covered boolean NOT NULL DEFAULT true,
  landing text NOT NULL DEFAULT 'oeste-landing2',
  visit_id text NOT NULL,
  form_submitted boolean NOT NULL DEFAULT false,
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT, UPDATE ON public.coverage_checks TO anon, authenticated;
GRANT ALL ON public.coverage_checks TO service_role;

ALTER TABLE public.coverage_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a coverage check"
  ON public.coverage_checks FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can mark their visit as submitted"
  ON public.coverage_checks FOR UPDATE TO anon, authenticated
  USING (created_at > now() - interval '12 hours')
  WITH CHECK (form_submitted = true);

CREATE INDEX coverage_checks_created_at_idx ON public.coverage_checks (created_at DESC);
CREATE INDEX coverage_checks_visit_id_idx ON public.coverage_checks (visit_id);