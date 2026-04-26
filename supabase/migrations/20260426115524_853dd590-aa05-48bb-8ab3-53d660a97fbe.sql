CREATE TABLE IF NOT EXISTS public.kv_store_012a3b25 (
  key text NOT NULL PRIMARY KEY,
  value jsonb NOT NULL
);

ALTER TABLE public.kv_store_012a3b25 ENABLE ROW LEVEL SECURITY;

-- Bloqueo total para clientes anónimos/autenticados; solo el service role (usado por edge functions) puede leer/escribir.
CREATE POLICY "Deny all anon access on kv_store"
  ON public.kv_store_012a3b25
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);