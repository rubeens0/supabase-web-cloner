/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import { brand, styles } from './_brand.ts'

interface EmailChangeEmailProps {
  siteName: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({ email, newEmail, confirmationUrl }: EmailChangeEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Confirma tu nuevo correo</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Text style={styles.wordmark}>{brand.wordmark}</Text>
        </Section>

        <Text style={styles.sectionTag}>N° 05 — Cambio de correo</Text>
        <Heading style={styles.h1}>
          Confirma tu nuevo <span style={styles.italic}>correo</span>.
        </Heading>

        <Text style={styles.text}>
          Has solicitado cambiar tu correo de <strong>{email}</strong> a{' '}
          <strong>{newEmail}</strong>. Confirma para completar el cambio.
        </Text>

        <Button href={confirmationUrl} style={styles.button}>
          Confirmar cambio
        </Button>

        <Text style={{ ...styles.text, fontSize: '13px', color: '#737373', margin: '28px 0 0' }}>
          O abre este enlace:
          <br />
          <Link href={confirmationUrl} style={styles.link}>{confirmationUrl}</Link>
        </Text>

        <Hr style={styles.divider} />
        <Text style={styles.footer}>{brand.wordmark} · {brand.tagline}</Text>
        <Text style={styles.footer}>
          Si no solicitaste este cambio, puedes ignorar este correo.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail
