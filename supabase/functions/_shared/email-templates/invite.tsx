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

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Invitación para unirte a {siteName}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <div style={styles.header}>
          <Text style={styles.wordmark}>{brand.wordmark}</Text>
        </div>

        <Text style={styles.sectionTag}>N° 04 — Invitación</Text>

        <Heading style={styles.h1}>
          Tienes una <span style={styles.italic}>invitación</span>.
        </Heading>

        <Text style={styles.text}>
          Te han invitado a unirte a{' '}
          <Link href={siteUrl} style={styles.link}>
            <strong>{siteName}</strong>
          </Link>
          . Acepta la invitación para crear tu cuenta y empezar.
        </Text>

        <Button style={styles.button} href={confirmationUrl}>
          Aceptar invitación
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
          Si no esperabas esta invitación, puedes ignorar este correo.
        </Text>
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Rubén Muñoz · <Link href={brand.siteUrl} style={styles.footerLink}>rubenmunoz.com</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail
