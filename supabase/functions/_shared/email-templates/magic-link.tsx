/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import { brand, styles } from './_brand.ts'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tu enlace de acceso a rubenmunoz.com</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Text style={styles.wordmark}>{brand.wordmark}</Text>
        </Section>

        <Text style={styles.sectionTag}>N° 02 — Acceso directo</Text>
        <Heading style={styles.h1}>
          Tu enlace de <span style={styles.italic}>acceso</span>.
        </Heading>

        <Text style={styles.text}>
          Haz clic en el botón para iniciar sesión sin contraseña. El enlace
          expira en breve por seguridad.
        </Text>

        <Button href={confirmationUrl} style={styles.button}>
          Iniciar sesión
        </Button>

        <Text style={{ ...styles.text, fontSize: '13px', color: '#737373', margin: '28px 0 0' }}>
          ¿El botón no funciona?
          <br />
          <Link href={confirmationUrl} style={styles.link}>{confirmationUrl}</Link>
        </Text>

        <Hr style={styles.divider} />
        <Text style={styles.footer}>{brand.wordmark} · {brand.tagline}</Text>
        <Text style={styles.footer}>
          Si no solicitaste este enlace, ignora este correo.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail
