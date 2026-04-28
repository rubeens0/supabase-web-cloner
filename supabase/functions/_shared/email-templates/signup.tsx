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
  Section,
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
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Confirma tu correo en rubenmunoz.com</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Text style={styles.wordmark}>{brand.wordmark}</Text>
        </Section>

        <Text style={styles.sectionTag}>N° 01 — Acceso</Text>
        <Heading style={styles.h1}>
          Bienvenido al <span style={styles.italic}>paddock</span>.
        </Heading>

        <Text style={styles.text}>
          Solo queda un paso. Confirma tu correo para activar tu cuenta y
          empezar a recibir novedades, contenido exclusivo y oportunidades
          directamente en tu bandeja.
        </Text>

        <Button href={confirmationUrl} style={styles.button}>
          Confirmar mi correo
        </Button>

        <Text style={{ ...styles.text, fontSize: '13px', color: '#737373', margin: '28px 0 0' }}>
          Si el botón no funciona, copia y pega este enlace:
          <br />
          <Link href={confirmationUrl} style={styles.link}>{confirmationUrl}</Link>
        </Text>

        <Hr style={styles.divider} />
        <Text style={styles.footer}>{brand.wordmark} · {brand.tagline}</Text>
        <Text style={styles.footer}>
          Si no creaste esta cuenta, puedes ignorar este correo.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail
