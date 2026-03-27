import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Alert, Box } from '@mui/material';
import accountingBg from '../../img/accounting_bg.png';
import BrainLogo from '../../img/circuito.ico';
import { dataService } from '../../../services';
import './LoginRazor.css';

/**
 * Modern Login Page for Brain ERP
 * Design inspired by high-end ERP systems with a professional accounting visual.
 */
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleCaptcha = () => {
    if (captchaChecked) return;
    setCaptchaLoading(true);
    setCaptchaError('');
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 1200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setError('Por favor ingresa email y contraseña');
        setLoading(false);
        return;
      }

      if (!captchaChecked) {
        setCaptchaError('Por favor completa el CAPTCHA');
        setLoading(false);
        return;
      }

      const response = await dataService.auth.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      setLoading(false);
      setIsRedirecting(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Error en login:', err);
      setError(
        err.response?.data?.message ||
        'Credenciales incorrectas. Intenta con: correo@email / admin'
      );
    } finally {
      setLoading(false);
    }
  };

  if (isRedirecting) {
    return (
      <div style={{ 
        minHeight: '100vh', display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center', 
        background: 'linear-gradient(135deg, #1E7FE3 0%, #0057B0 100%)', color: 'white' 
      }}>
        <img src={BrainLogo} alt="Logo" style={{ width: '100px', marginBottom: '2rem', animation: 'pulse 2s infinite' }} />
        <CircularProgress size={60} thickness={4} sx={{ color: 'white', mb: 3 }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Iniciando sesión...</h2>
        <p style={{ opacity: 0.8 }}>Bienvenido a Brain ERP</p>
      </div>
    );
  }

  return (
    <section className="login-container">
      {/* LEFT COLUMN: Visual/Branding with Accounting Background */}
      <div className="login-left" style={{ 
        backgroundImage: `url(${accountingBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden'
      }}>
        {/* Overlay for better text readability */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.45))',
          zIndex: 1
        }}></div>

        <div className="login-left-content" style={{ 
          position: 'relative', zIndex: 10, height: '100%', 
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '4rem'
        }}>
          {/* Top Logo - Using Brain Logo but white/clean version */}
          <div>
            <img 
              src={BrainLogo} 
              alt="Brain ERP" 
              style={{ height: '60px', filter: 'brightness(0) invert(1)' }} 
            />
            <span style={{ 
              color: 'white', fontSize: '1.5rem', fontWeight: 'bold', 
              marginLeft: '1rem', verticalAlign: 'middle', letterSpacing: '1px' 
            }}>BRAIN ERP</span>
          </div>

          {/* Bottom Quote block */}
          <div style={{ maxWidth: '480px' }}>
            <h2 style={{ 
              fontSize: '2.8rem', fontWeight: '800', color: 'white', 
              marginBottom: '2rem', lineHeight: '1.1', textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              "La inteligencia que tu negocio necesita para crecer sin límites."
            </h2>
            <div style={{ borderLeft: '4px solid #4f46e5', paddingLeft: '1.5rem' }}>
              <p style={{ fontWeight: '600', color: 'white', margin: 0, fontSize: '1.1rem' }}>Equipo Brain ERP</p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>Gestión Empresarial de Próxima Generación</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Form */}
      <div className="login-right">
        <div className="animate-fade-in" style={{ width: '100%', maxWidth: '420px', zIndex: 5 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '800' }}>
              Bienvenido a <span className="text-gradient">Brain ERP</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Gestiona tu empresa con elegancia y precisión</p>
          </div>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '0.75rem' }}>
              {error}
            </Alert>
          )}

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Correo corporativo</label>
              <input 
                type="email" 
                name="email"
                placeholder="ejemplo@brainerp.com"
                className="login-input"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Contraseña</label>
              <input 
                type="password" 
                name="password"
                placeholder="••••••••"
                className="login-input"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div style={{ textAlign: 'right', marginTop: '0.25rem' }}>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', padding: 0 }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* CAPTCHA simulado */}
            <div style={{ marginBottom: '0.5rem' }}>
              <div 
                className="captcha-widget" 
                onClick={handleCaptcha} 
                style={{ cursor: captchaChecked ? 'default' : 'pointer', opacity: loading ? 0.7 : 1 }}
              >
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
              {captchaError && <p style={{ fontSize: '0.78rem', color: 'var(--accent)', marginTop: '0.3rem' }}>{captchaError}</p>}
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                  Iniciando sesión...
                </>
              ) : 'Entrar al Sistema'}
            </button>

            {/* Register link */}
            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#475569', marginTop: '0.25rem' }}>
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem', padding: 0 }}
              >
                Registrarte
              </button>
            </p>
            
          </form>

        </div>
      </div>
    </section>
  );
}

