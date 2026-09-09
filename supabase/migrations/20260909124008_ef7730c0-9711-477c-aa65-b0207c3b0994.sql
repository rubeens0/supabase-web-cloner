CREATE TABLE public.meta_event_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  pixel_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_id TEXT NOT NULL,
  event_time TIMESTAMPTZ,
  event_source_url TEXT,
  action_source TEXT,
  landing TEXT,
  test_event_code TEXT,
  custom_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  user_data_fields TEXT[] NOT NULL DEFAULT '{}',
  http_status INT,
  success BOOLEAN NOT NULL DEFAULT false,
  error_message TEXT
);
GRANT ALL ON public.meta_event_log TO service_role;
ALTER TABLE public.meta_event_log ENABLE ROW LEVEL SECURITY;
CREATE INDEX meta_event_log_created_at_idx ON public.meta_event_log (created_at DESC);