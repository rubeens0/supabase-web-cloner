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

interface EmailChangeEmailProps {
  siteName: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  email,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Confirma el cambio de correo en {siteName}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <div style={styles.header}>
          <Text style={styles.wordmark}>{brand.wordmark}</Text>
        </div>

        <Text style={styles.sectionTag}>N° 05 — Cambio de correo</Text>

        <Heading style={styles.h1}>
          Confirma tu <span style={styles.italic}>nuevo correo</span>.
        </Heading>

        <Text style={styles.text}>
          Has solicitado cambiar la dirección de tu cuenta en{' '}
          <strong style={{ color: '#0a0a0a' }}>{siteName}</strong> de{' '}
          <Link href={`mailto:${email}`} style={styles.link}>
            {email}
          </Link>{' '}
          a{' '}
          <Link href={`mailto:${newEmail}`} style={styles.link}>
            {newEmail}
          </Link>
          .
        </Text>

        <Button style={styles.button} href={confirmationUrl}>
          Confirmar cambio
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
          Si no solicitaste este cambio, asegura tu cuenta cuanto antes.
        </Text>
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Rubén Muñoz · <Link href={brand.siteUrl} style={styles.footerLink}>rubenmunoz.com</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail
