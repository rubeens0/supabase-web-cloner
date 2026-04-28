/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

import { brand, styles } from './_brand.ts'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({
  siteName,
  confirmationUrl,
}: MagicLinkEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tu enlace de acceso a {siteName}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <div style={styles.header}>
          <Text style={styles.wordmark}>{brand.wordmark}</Text>
        </div>

        <Text style={styles.sectionTag}>N° 03 — Acceso</Text>

        <Heading style={styles.h1}>
          Tu enlace de <span style={styles.italic}>acceso</span>.
        </Heading>

        <Text style={styles.text}>
          Pulsa el botón para iniciar sesión en{' '}
          <strong style={{ color: '#0a0a0a' }}>{siteName}</strong>. El enlace
          caduca en pocos minutos.
        </Text>

        <Button style={styles.button} href={confirmationUrl}>
          Iniciar sesión
        </Button>

        <Text style={{ ...styles.text, marginTop: '28px', fontSize: '13px', color: '#737373' }}>
          Si no funciona el botón, copia y pega este enlace en tu navegador:
          <br />
          <Link href={confirmationUrl} style={styles.link}>
            {confirmationUrl}
          </Link>
        </Text>

        <Hr style={styles.divider} />

        <Text style={styles.footer}>
          Si no solicitaste este enlace, puedes ignorar este correo.
        </Text>
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Rubén Muñoz · <Link href={brand.siteUrl} style={styles.footerLink}>rubenmunoz.com</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail
