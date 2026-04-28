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

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Confirma tu correo para acceder a {siteName}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <div style={styles.header}>
          <Text style={styles.wordmark}>{brand.wordmark}</Text>
        </div>

        <Text style={styles.sectionTag}>N° 01 — Verificación</Text>

        <Heading style={styles.h1}>
          Confirma tu <span style={styles.italic}>correo</span>.
        </Heading>

        <Text style={styles.text}>
          Gracias por registrarte. Para activar tu cuenta en{' '}
          <strong style={{ color: '#0a0a0a' }}>{siteName}</strong>, confirma que{' '}
          <Link href={`mailto:${recipient}`} style={styles.link}>
            {recipient}
          </Link>{' '}
          es tu dirección.
        </Text>

        <Button style={styles.button} href={confirmationUrl}>
          Confirmar correo
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
          Si no creaste esta cuenta, puedes ignorar este correo.
        </Text>
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Rubén Muñoz · <Link href={brand.siteUrl} style={styles.footerLink}>rubenmunoz.com</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail
