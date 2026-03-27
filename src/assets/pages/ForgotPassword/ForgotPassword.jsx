import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Alert } from '@mui/material';
import accountingBg from '../../img/accounting_bg.png';
import BrainLogo from '../../img/circuito.ico';
import './ForgotPassword.css';

/**
 * Forgot Password Page — Brain ERP
 * User enters RFC → receives password-reset link by email.
 */
export default function ForgotPassword() {
  const navigate = useNavigate();

  const [rfc, setRfc] = useState('');
  const [rfcError, setRfcError] = useState('');

  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [sent, setSent] = useState(false);

  /* ── Captcha ── */
  const handleCaptcha = () => {
    if (captchaChecked) return;
    setCaptchaLoading(true);
    setCaptchaError('');
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 1200);
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    let valid = true;
    if (!rfc.trim()) {
      setRfcError('El RFC es requerido');
      valid = false;
    } else if (!/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i.test(rfc.trim())) {
      setRfcError('RFC no válido (ej. ABCD830101XY3)');
      valid = false;
    } else {
      setRfcError('');
    }

    if (!captchaChecked) {
      setCaptchaError('Por favor completa el CAPTCHA');
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  /* ── Success screen ── */
  if (sent) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)', color: 'white',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📧</div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>¡Correo enviado!</h2>
        <p style={{ opacity: 0.85, maxWidth: '340px', textAlign: 'center' }}>
          Revisa la bandeja de entrada del correo asociado a tu RFC para restablecer tu contraseña.
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{
            marginTop: '2rem', padding: '0.75rem 2rem', borderRadius: '2rem',
            background: 'white', color: '#4f46e5', border: 'none',
            fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
          }}
        >
          Volver al inicio de sesión
        </button>
      </div>
    );
  }

  /* ── Main view ── */
  return (
    <section className="fp-container">

      {/* ── LEFT: Branding ── */}
      <div
        className="fp-left"
        style={{
          backgroundImage: `url(${accountingBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.45))',
          zIndex: 1,
        }} />

        <div className="fp-left-content" style={{
          position: 'relative', zIndex: 10, height: '100%', display: 'flex',
          flexDirection: 'column', justifyContent: 'space-between', padding: '4rem',
        }}>
          {/* Logo */}
          <div>
            <img src={BrainLogo} alt="Brain ERP" style={{ height: '60px', filter: 'brightness(0) invert(1)' }} />
            <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '1rem', letterSpacing: '1px' }}>
              BRAIN ERP
            </span>
          </div>

          {/* Quote */}
          <div style={{ maxWidth: '480px' }}>
            <h2 style={{
              fontSize: '2.8rem', fontWeight: 800, color: 'white',
              marginBottom: '2rem', lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}>
              "Tu seguridad es nuestra prioridad."
            </h2>
            <div style={{ borderLeft: '4px solid #4f46e5', paddingLeft: '1.5rem' }}>
              <p style={{ fontWeight: 600, color: 'white', margin: 0, fontSize: '1.1rem' }}>Equipo Brain ERP</p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>Gestión Empresarial de Próxima Generación</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form ── */}
      <div className="fp-right">
        <div className="fp-form-wrapper">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {/* Lock icon */}
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5, #0284c7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: '0 4px 14px rgba(79,70,229,0.3)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
              Restablecer <span className="fp-gradient-text">contraseña</span>
            </h2>
            <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '340px', margin: '0 auto' }}>
              Ingresa el RFC con el que te registraste en el sistema y te enviaremos un enlace a tu correo para cambiar tu contraseña.
            </p>
          </div>

          {submitError && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: '0.75rem' }}>{submitError}</Alert>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* RFC */}
            <div>
              <label className="fp-label">RFC</label>
              <input
                type="text"
                placeholder="ej. ABCD830101XY3"
                maxLength={13}
                className={`fp-input${rfcError ? ' fp-input-error' : ''}`}
                value={rfc}
                onChange={(e) => {
                  setRfc(e.target.value.toUpperCase());
                  if (rfcError) setRfcError('');
                }}
                style={{ textTransform: 'uppercase' }}
              />
              {rfcError && <p className="fp-field-error">{rfcError}</p>}
            </div>

            {/* CAPTCHA */}
            <div>
              <div
                className="fp-captcha-widget"
                onClick={handleCaptcha}
                style={{ cursor: captchaChecked ? 'default' : 'pointer' }}
              >
                <div className="fp-captcha-check-area">
                  <div className={`fp-captcha-box${captchaChecked ? ' checked' : ''}`}>
                    {captchaLoading
                      ? <CircularProgress size={14} sx={{ color: '#4f46e5' }} />
                      : captchaChecked
                        ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : null
                    }
                  </div>
                  <span className="fp-captcha-label">No soy un robot</span>
                </div>
                <div className="fp-captcha-logo">
                  <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" fill="#4A90D9" opacity="0.15"/>
                    <path d="M32 8L56 20V44L32 56L8 44V20L32 8Z" stroke="#4A90D9" strokeWidth="3" fill="none"/>
                    <circle cx="32" cy="32" r="10" fill="#4A90D9" opacity="0.6"/>
                  </svg>
                  <span className="fp-captcha-brand">reCAPTCHA</span>
                  <span style={{ fontSize: '0.55rem', color: '#bbb' }}>Privacidad · Términos</span>
                </div>
              </div>
              {captchaError && <p className="fp-field-error">{captchaError}</p>}
            </div>

            {/* Submit */}
            <button type="submit" className="fp-btn-send" disabled={loading}>
              {loading
                ? <><CircularProgress size={22} sx={{ mr: 1, color: 'white' }} /> Enviando...</>
                : 'Enviar enlace de restablecimiento'
              }
            </button>

            {/* Back to login */}
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => navigate('/login')}
                style={{
                  background: 'none', border: 'none', color: '#4f46e5',
                  fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
                </svg>
                Regresar al inicio de sesión
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
