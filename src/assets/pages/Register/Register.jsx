import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Alert } from '@mui/material';
import accountingBg from '../../img/accounting_bg.png';
import BrainLogo from '../../img/circuito.ico';
import './Register.css';

/**
 * Register Page — Brain ERP
 * Full registration form with validation, simulated CAPTCHA, and Google sign-up.
 */
export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    rfc: '',
  });

  const [checks, setChecks] = useState({
    terms: false,
    privacy: false,
  });

  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError('');
  };

  const handleCaptcha = () => {
    if (captchaChecked) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 1200);
  };

  /* ── Validation ── */
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo válido';
    }
    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Confirma tu correo';
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Los correos no coinciden';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    if (!formData.rfc.trim()) {
      newErrors.rfc = 'El RFC es requerido';
    } else if (!/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i.test(formData.rfc.trim())) {
      newErrors.rfc = 'RFC no válido (ej. ABCD123456XYZ)';
    }
    if (!checks.terms) newErrors.terms = 'Debes aceptar los términos y condiciones';
    if (!checks.privacy) newErrors.privacy = 'Debes aceptar el aviso de privacidad';
    if (!captchaChecked) newErrors.captcha = 'Por favor completa el CAPTCHA';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    // Simulate registration call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  /* ── Success Screen ── */
  if (success) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)', color: 'white',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>¡Cuenta creada!</h2>
        <p style={{ opacity: 0.85 }}>Redirigiendo al inicio de sesión...</p>
      </div>
    );
  }

  /* ── Main View ── */
  return (
    <section className="register-container">

      {/* ── LEFT: Branding ── */}
      <div
        className="register-left"
        style={{
          backgroundImage: `url(${accountingBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.45))',
          zIndex: 1,
        }} />

        <div style={{
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
              "Únete a la plataforma que impulsa el crecimiento empresarial."
            </h2>
            <div style={{ borderLeft: '4px solid #4f46e5', paddingLeft: '1.5rem' }}>
              <p style={{ fontWeight: 600, color: 'white', margin: 0, fontSize: '1.1rem' }}>Equipo Brain ERP</p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>Gestión Empresarial de Próxima Generación</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form ── */}
      <div className="register-right">
        <div className="register-form-wrapper">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
              Crear una <span className="register-gradient-text">cuenta</span>
            </h2>
            <p style={{ color: '#475569', fontSize: '0.95rem' }}>
              Completa el formulario para acceder a Brain ERP
            </p>
          </div>

          {submitError && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: '0.75rem' }}>{submitError}</Alert>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

            {/* Nombre de usuario */}
            <div>
              <label className="register-label">Nombre de usuario</label>
              <input
                type="text"
                name="username"
                placeholder="ej. juan.garcia"
                className={`register-input${errors.username ? ' input-error' : ''}`}
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="register-field-error">{errors.username}</p>}
            </div>

            {/* Correo */}
            <div>
              <label className="register-label">Correo electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="ejemplo@brainerp.com"
                className={`register-input${errors.email ? ' input-error' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="register-field-error">{errors.email}</p>}
            </div>

            {/* Confirmar correo */}
            <div>
              <label className="register-label">Confirmar correo</label>
              <input
                type="email"
                name="confirmEmail"
                placeholder="Repite tu correo"
                className={`register-input${errors.confirmEmail ? ' input-error' : ''}`}
                value={formData.confirmEmail}
                onChange={handleChange}
              />
              {errors.confirmEmail && <p className="register-field-error">{errors.confirmEmail}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <label className="register-label">Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                className={`register-input${errors.password ? ' input-error' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="register-field-error">{errors.password}</p>}
            </div>

            {/* RFC */}
            <div>
              <label className="register-label">RFC</label>
              <input
                type="text"
                name="rfc"
                placeholder="ej. ABCD830101XY3"
                maxLength={13}
                className={`register-input${errors.rfc ? ' input-error' : ''}`}
                value={formData.rfc}
                onChange={handleChange}
                style={{ textTransform: 'uppercase' }}
              />
              {errors.rfc && <p className="register-field-error">{errors.rfc}</p>}
            </div>

            {/* Checkboxes legales */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.25rem' }}>
              <label className="register-checkbox-row">
                <input
                  type="checkbox"
                  checked={checks.terms}
                  onChange={() => {
                    setChecks((p) => ({ ...p, terms: !p.terms }));
                    setErrors((p) => ({ ...p, terms: '' }));
                  }}
                />
                <span>
                  Acepto los{' '}
                  <a href="#" onClick={(e) => e.preventDefault()}>términos y condiciones</a>
                </span>
              </label>
              {errors.terms && <p className="register-field-error" style={{ marginTop: '-0.5rem' }}>{errors.terms}</p>}

              <label className="register-checkbox-row">
                <input
                  type="checkbox"
                  checked={checks.privacy}
                  onChange={() => {
                    setChecks((p) => ({ ...p, privacy: !p.privacy }));
                    setErrors((p) => ({ ...p, privacy: '' }));
                  }}
                />
                <span>
                  Acepto el{' '}
                  <a href="#" onClick={(e) => e.preventDefault()}>aviso de privacidad</a>
                </span>
              </label>
              {errors.privacy && <p className="register-field-error" style={{ marginTop: '-0.5rem' }}>{errors.privacy}</p>}
            </div>

            {/* CAPTCHA simulado */}
            <div>
              <div className="captcha-widget" onClick={handleCaptcha} style={{ cursor: captchaChecked ? 'default' : 'pointer' }}>
                <div className="captcha-check-area">
                  <div className={`captcha-box${captchaChecked ? ' checked' : ''}`}>
                    {captchaLoading
                      ? <CircularProgress size={14} sx={{ color: '#4f46e5' }} />
                      : captchaChecked
                        ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : null
                    }
                  </div>
                  <span className="captcha-label">No soy un robot</span>
                </div>
                <div className="captcha-logo">
                  <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" fill="#4A90D9" opacity="0.15"/>
                    <path d="M32 8L56 20V44L32 56L8 44V20L32 8Z" stroke="#4A90D9" strokeWidth="3" fill="none"/>
                    <circle cx="32" cy="32" r="10" fill="#4A90D9" opacity="0.6"/>
                  </svg>
                  <span className="rc-brand">reCAPTCHA</span>
                  <span style={{ fontSize: '0.55rem', color: '#bbb' }}>Privacidad · Términos</span>
                </div>
              </div>
              {errors.captcha && <p className="register-field-error">{errors.captcha}</p>}
            </div>

            {/* Botón Registrar */}
            <button type="submit" className="btn-register" disabled={loading} style={{ marginTop: '0.5rem' }}>
              {loading
                ? <><CircularProgress size={22} sx={{ mr: 1, color: 'white' }} /> Creando cuenta...</>
                : 'Registrar'
              }
            </button>

            {/* Divider */}
            <div className="register-divider">o</div>

            {/* Google */}
            <button type="button" className="register-google-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Registrar con Google
            </button>

            {/* Back to Login */}
            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#475569', marginTop: '0.5rem' }}>
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem', padding: 0 }}
              >
                Iniciar sesión
              </button>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
}
