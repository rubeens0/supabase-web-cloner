INSERT INTO storage.buckets (id, name, public) VALUES ('email-assets', 'email-assets', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Email assets are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'email-assets');

CREATE POLICY "Service role can manage email assets"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'email-assets')
WITH CHECK (bucket_id = 'email-assets');