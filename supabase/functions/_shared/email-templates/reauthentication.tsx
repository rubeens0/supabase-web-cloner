/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import { brand, styles } from './_brand.ts'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tu código de verificación</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Text style={styles.wordmark}>{brand.wordmark}</Text>
        </Section>

        <Text style={styles.sectionTag}>N° 06 — Verificación</Text>
        <Heading style={styles.h1}>
          Tu código de <span style={styles.italic}>verificación</span>.
        </Heading>

        <Text style={styles.text}>
          Usa el siguiente código para confirmar tu identidad. Es válido
          durante unos minutos.
        </Text>

        <Text style={styles.code}>{token}</Text>

        <Hr style={styles.divider} />
        <Text style={styles.footer}>{brand.wordmark} · {brand.tagline}</Text>
        <Text style={styles.footer}>
          Si no solicitaste este código, ignora este correo.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail
