import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--off-white)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '2rem' }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
          marginBottom: '0.3rem',
        }}>
          Blue<span style={{ color: 'var(--blue-light)' }}>side</span> Digital
        </div>
        <div style={{
          fontSize: '0.62rem',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--blue-mid)',
          opacity: 0.65,
          marginBottom: '3rem',
        }}>
          Client Portal
        </div>
        <h1 style={{
          fontSize: '1.6rem',
          fontWeight: 600,
          color: 'var(--ink)',
          marginBottom: '0.75rem',
          letterSpacing: '-0.01em',
        }}>
          Coming Soon
        </h1>
        <p style={{
          fontSize: '0.92rem',
          color: 'var(--ink-muted)',
          lineHeight: 1.65,
          marginBottom: '2.5rem',
        }}>
          The client portal is under development. In the meantime, reach out directly.
        </p>
        <Link to="/contact" style={{
          display: 'inline-block',
          padding: '0.7rem 1.6rem',
          background: 'var(--blue)',
          color: 'var(--white)',
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textDecoration: 'none',
          borderRadius: '3px',
          marginRight: '1rem',
        }}>
          Get in Touch
        </Link>
        <Link to="/" style={{
          fontSize: '0.82rem',
          color: 'var(--blue-mid)',
          textDecoration: 'none',
          borderBottom: '1px solid transparent',
        }}>
          ← Back home
        </Link>
      </div>
    </div>
  );
}
