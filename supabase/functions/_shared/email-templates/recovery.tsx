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

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Restablece tu contraseña en {siteName}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <div style={styles.header}>
          <Text style={styles.wordmark}>{brand.wordmark}</Text>
        </div>

        <Text style={styles.sectionTag}>N° 02 — Seguridad</Text>

        <Heading style={styles.h1}>
          Restablece tu <span style={styles.italic}>contraseña</span>.
        </Heading>

        <Text style={styles.text}>
          Hemos recibido una solicitud para cambiar la contraseña de tu cuenta en{' '}
          <strong style={{ color: '#0a0a0a' }}>{siteName}</strong>. Pulsa el botón
          de abajo para crear una nueva.
        </Text>

        <Button style={styles.button} href={confirmationUrl}>
          Cambiar contraseña
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
          Si no solicitaste el cambio, ignora este correo. Tu contraseña actual
          seguirá siendo válida.
        </Text>
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Rubén Muñoz · <Link href={brand.siteUrl} style={styles.footerLink}>rubenmunoz.com</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail
