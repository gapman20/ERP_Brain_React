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
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
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

        <div style={{ 
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
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '800' }}>
              Bienvenido a <span className="text-gradient">Brain ERP</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Gestiona tu empresa con elegancia y precisión</p>
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

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
              <a href="#" style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '600' }}>¿Olvidaste tu contraseña?</a>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Recordarme</span>
                <div 
                  onClick={() => setRememberMe(!rememberMe)}
                  style={{ 
                    position: 'relative', width: '36px', height: '20px', 
                    background: rememberMe ? 'var(--primary)' : '#cbd5e1', 
                    borderRadius: '10px', transition: 'background 0.3s' 
                  }}
                >
                  <div style={{ 
                    position: 'absolute', top: '2px', left: rememberMe ? '18px' : '2px', 
                    width: '16px', height: '16px', background: 'white', borderRadius: '50%', 
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.3s' 
                  }}></div>
                </div>
              </label>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                  Iniciando sesión...
                </>
              ) : 'Entrar al Sistema'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0', color: 'var(--text-muted)' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
              <span style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8' }}>o con</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
            </div>

            <button type="button" className="google-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuar con Google
            </button>
            
          </form>

          {/* Development Info Box */}
          <div style={{
            marginTop: '3rem', padding: '1.25rem', background: '#f8fafc', 
            borderRadius: '1rem', border: '1px solid #e2e8f0', textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              <strong style={{ color: 'var(--primary)' }}>Credenciales de Acceso:</strong><br/>
              correo@email / admin
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

