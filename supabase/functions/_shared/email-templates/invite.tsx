/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import { brand, styles } from './_brand.ts'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ confirmationUrl }: InviteEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tienes una invitación de rubenmunoz.com</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Text style={styles.wordmark}>{brand.wordmark}</Text>
        </Section>

        <Text style={styles.sectionTag}>N° 04 — Invitación</Text>
        <Heading style={styles.h1}>
          Has sido <span style={styles.italic}>invitado</span>.
        </Heading>

        <Text style={styles.text}>
          Te han invitado a unirte a rubenmunoz.com. Acepta la invitación
          para crear tu cuenta y acceder al paddock.
        </Text>

        <Button href={confirmationUrl} style={styles.button}>
          Aceptar invitación
        </Button>

        <Text style={{ ...styles.text, fontSize: '13px', color: '#737373', margin: '28px 0 0' }}>
          O abre este enlace:
          <br />
          <Link href={confirmationUrl} style={styles.link}>{confirmationUrl}</Link>
        </Text>

        <Hr style={styles.divider} />
        <Text style={styles.footer}>{brand.wordmark} · {brand.tagline}</Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail
