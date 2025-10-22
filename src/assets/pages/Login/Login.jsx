import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import BrainLogo from '../../img/circuito.ico';
import { dataService } from '../../../services';

/**
 * Página de Login
 *
 * Valida credenciales usando el servicio de autenticación y guarda
 * el token en localStorage para mantener la sesión activa.
 */
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState('');

  /**
   * Maneja cambios en los inputs del formulario
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error al escribir
    if (error) setError('');
  };

  /**
   * Maneja el submit del formulario de login
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validar campos vacíos
      if (!formData.email || !formData.password) {
        setError('Por favor ingresa email y contraseña');
        setLoading(false);
        return;
      }

      // Llamar al servicio de autenticación
      const response = await dataService.auth.login({
        email: formData.email,
        password: formData.password,
      });

      // Guardar token en localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // Mostrar loader de redirección
      setLoading(false);
      setIsRedirecting(true);

      // Esperar un momento antes de redirigir (para mostrar el loader)
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

  // Mostrar loader de pantalla completa durante redirección
  if (isRedirecting) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          backgroundImage: 'linear-gradient(135deg, #1E7FE3 0%, #0057B0 100%)',
        }}
      >
        <Box
          component="img"
          src={BrainLogo}
          alt="Brain ERP Logo"
          sx={{
            width: 120,
            height: 120,
            mb: 4,
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': {
                transform: 'scale(1)',
                opacity: 1,
              },
              '50%': {
                transform: 'scale(1.1)',
                opacity: 0.8,
              },
            },
          }}
        />
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: 'white',
            mb: 3,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            fontWeight: 500,
            mb: 1,
          }}
        >
          Iniciando sesión...
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          Bienvenido a Brain ERP
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.login',
        backgroundImage: 'linear-gradient(135deg, #E9F5FE 0%, #F3F9FF 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={8}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              py: 4,
              textAlign: 'center',
            }}
          >
            <Box
              component="img"
              src={BrainLogo}
              alt="Brain ERP Logo"
              sx={{
                width: 80,
                height: 80,
                mb: 2,
              }}
            />
            <Typography variant="h4" fontWeight="bold">
              Brain ERP
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
              Sistema de Gestión Empresarial
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ mb: 3, textAlign: 'center', fontWeight: 500 }}
            >
              Iniciar Sesión
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                autoComplete="email"
                placeholder="tucorreo@email"
                sx={{ mb: 2 }}
                autoFocus
              />

              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                autoComplete="current-password"
                placeholder="Tu contraseña"
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary" display="block">
                <strong>Modo de desarrollo:</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Email: <strong>correo@email</strong>
              </Typography>
              <br />
              <Typography variant="caption" color="text.secondary">
                Contraseña: <strong>admin</strong>
              </Typography>
            </Box>
          </CardContent>

          <Box
            sx={{
              bgcolor: 'grey.100',
              py: 2,
              px: 4,
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" color="text.secondary">
              © 2025 Brain ERP - Todos los derechos reservados
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
