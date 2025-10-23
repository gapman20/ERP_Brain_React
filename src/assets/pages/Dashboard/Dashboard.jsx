import { Box, Typography, Paper, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { useUserData } from '../../components/MiniDrawer/hooks/useUserData';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import BrainLogo from '../../img/circuito.ico';

/**
 * Página de Dashboard Principal
 *
 * Página de bienvenida que se muestra después del login.
 * No selecciona ningún módulo automáticamente, el usuario
 * elige desde el menú lateral según sus permisos.
 */
const Dashboard = () => {
  const { user, permissions, loading } = useUserData();

  // Contar módulos con permiso
  const modulesCount = Object.keys(permissions).filter(
    (key) => permissions[key] === true
  ).length;

  // Mostrar loader mientras se cargan los datos
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          px: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
        >
          Cargando información...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Header de Bienvenida */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3, md: 4 },
          mb: { xs: 3, sm: 4 },
          background: 'linear-gradient(135deg, #1E7FE3 0%, #5DABFF 100%)',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 2, sm: 3 },
          flexDirection: { xs: 'column', sm: 'row' },
          textAlign: { xs: 'center', sm: 'left' },
        }}>
          <Box
            component="img"
            src={BrainLogo}
            alt="Brain ERP Logo"
            sx={{
              width: { xs: 60, sm: 70, md: 80 },
              height: { xs: 60, sm: 70, md: 80 },
              filter: 'brightness(0) invert(1)', // Logo blanco
            }}
          />
          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
            >
              ¡Bienvenido a Brain ERP!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
              }}
            >
              {user.name}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Información del Usuario */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <PersonIcon
                  color="primary"
                  sx={{ fontSize: { xs: 32, sm: 40 } }}
                />
                <Typography
                  variant="h5"
                  fontWeight="500"
                  sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                >
                  Tu Información
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.875rem', sm: '0.9rem' } }}
                >
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    fontSize: { xs: '0.875rem', sm: '0.9rem' }
                  }}
                >
                  <strong>Rol:</strong> {user.role}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    fontSize: { xs: '0.875rem', sm: '0.9rem' }
                  }}
                >
                  <strong>ID:</strong> {user.id}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <DashboardIcon
                  color="primary"
                  sx={{ fontSize: { xs: 32, sm: 40 } }}
                />
                <Typography
                  variant="h5"
                  fontWeight="500"
                  sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                >
                  Tus Módulos
                </Typography>
              </Box>

              <Typography
                variant="h3"
                color="primary"
                sx={{
                  mt: 2,
                  mb: 1,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                {modulesCount}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', sm: '0.9rem' } }}
              >
                módulos disponibles
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.875rem', sm: '0.9rem' } }}
                >
                  Selecciona un módulo del menú lateral para comenzar.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Instrucciones */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mt: { xs: 3, sm: 4 },
          bgcolor: 'background.default',
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
        >
          Primeros Pasos
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.875rem', sm: '0.9rem' }, mb: 1 }}
        >
          1. Usa el menú lateral para navegar entre los módulos disponibles
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.875rem', sm: '0.9rem' }, mb: 1 }}
        >
          2. Solo verás los módulos para los que tienes permisos
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.875rem', sm: '0.9rem' } }}
        >
          3. Haz clic en tu avatar (arriba derecha) para cerrar sesión
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
