// Shared brand tokens for Rubén Muñoz auth emails.
// Aesthetic: editorial monochrome motorsport — black & white minimal.

export const brand = {
  siteUrl: 'https://www.rubenmunoz.com',
  wordmark: 'RUBÉN MUÑOZ',
  tagline: 'Karting · CEK 2026',
  fontSans: '"Inter", "Helvetica Neue", Arial, sans-serif',
  fontDisplay: '"Instrument Serif", "Times New Roman", Georgia, serif',
}

export const styles = {
  main: {
    backgroundColor: '#ffffff',
    fontFamily: brand.fontSans,
    margin: 0,
    padding: 0,
  },
  container: {
    maxWidth: '560px',
    margin: '0 auto',
    padding: '40px 32px',
  },
  // Header rule with wordmark
  header: {
    borderBottom: '1px solid #000000',
    paddingBottom: '14px',
    marginBottom: '36px',
  },
  wordmark: {
    fontFamily: brand.fontSans,
    fontSize: '11px',
    fontWeight: 600 as const,
    letterSpacing: '0.22em',
    color: '#000000',
    margin: 0,
    textTransform: 'uppercase' as const,
  },
  // Section number + label (editorial accent)
  sectionTag: {
    fontFamily: brand.fontSans,
    fontSize: '10px',
    fontWeight: 500 as const,
    letterSpacing: '0.22em',
    color: '#999999',
    margin: '0 0 18px',
    textTransform: 'uppercase' as const,
  },
  h1: {
    fontFamily: brand.fontDisplay,
    fontSize: '40px',
    fontWeight: 400 as const,
    color: '#0a0a0a',
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    margin: '0 0 28px',
  },
  italic: {
    fontStyle: 'italic' as const,
  },
  text: {
    fontFamily: brand.fontSans,
    fontSize: '15px',
    color: '#404040',
    lineHeight: 1.6,
    margin: '0 0 22px',
  },
  link: {
    color: '#0a0a0a',
    textDecoration: 'underline',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500 as const,
    borderRadius: '999px',
    padding: '14px 28px',
    textDecoration: 'none',
    letterSpacing: '0.01em',
  },
  code: {
    fontFamily: '"SF Mono", "Courier New", Courier, monospace',
    fontSize: '32px',
    fontWeight: 600 as const,
    letterSpacing: '0.32em',
    color: '#0a0a0a',
    backgroundColor: '#f5f5f5',
    border: '1px solid #e5e5e5',
    borderRadius: '12px',
    padding: '20px 24px',
    textAlign: 'center' as const,
    margin: '0 0 28px',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #ededed',
    margin: '40px 0 24px',
  },
  footer: {
    fontFamily: brand.fontSans,
    fontSize: '11px',
    color: '#999999',
    lineHeight: 1.6,
    letterSpacing: '0.04em',
    margin: '0 0 6px',
  },
  footerLink: {
    color: '#999999',
    textDecoration: 'underline',
  },
}
