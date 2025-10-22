/**
 * Componente de ejemplo: Uso del servicio de datos
 *
 * Este componente demuestra cómo usar el dataService para:
 * - Cargar datos (GET)
 * - Crear registros (POST)
 * - Actualizar registros (PUT)
 * - Eliminar registros (DELETE)
 *
 * El servicio cambia automáticamente entre mock y API real
 * según la configuración en .env
 */

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Grid,
  Chip,
} from '@mui/material';
import { dataService } from '../../services';

export default function EjemploUsoServicio() {
  // Estado para las alianzas
  const [alianzas, setAlianzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    tipo: 'corporativo',
  });

  /**
   * Cargar alianzas al montar el componente
   */
  useEffect(() => {
    cargarAlianzas();
  }, []);

  /**
   * Función para cargar todas las alianzas
   */
  const cargarAlianzas = async () => {
    try {
      setLoading(true);
      setError(null);

      // El servicio se adapta automáticamente (mock o API real)
      const response = await dataService.implementacion.getAlianzas();

      setAlianzas(response.data.alianzas || []);
    } catch (err) {
      console.error('Error al cargar alianzas:', err);
      setError(err.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crear nueva alianza
   */
  const crearAlianza = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const nuevaAlianza = {
        ...formData,
        status: 'activo',
        empresas_asociadas: 0,
      };

      const response = await dataService.implementacion.createAlianza(nuevaAlianza);

      console.log('Alianza creada:', response.data);

      // Recargar lista
      await cargarAlianzas();

      // Limpiar formulario
      setFormData({ nombre: '', descripcion: '', tipo: 'corporativo' });

      alert('Alianza creada exitosamente');
    } catch (err) {
      console.error('Error al crear alianza:', err);
      alert('Error al crear alianza');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Eliminar alianza
   */
  const eliminarAlianza = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta alianza?')) {
      return;
    }

    try {
      setLoading(true);

      await dataService.implementacion.deleteAlianza(id);

      console.log(`Alianza ${id} eliminada`);

      // Recargar lista
      await cargarAlianzas();

      alert('Alianza eliminada exitosamente');
    } catch (err) {
      console.error('Error al eliminar alianza:', err);
      alert('Error al eliminar alianza');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar campo del formulario
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Renderizado
   */
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Ejemplo de Uso del Servicio de Datos
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Este componente usa <code>dataService</code> que cambia automáticamente entre
        datos mock (JSON) y API real (MySQL) según la configuración.
      </Typography>

      {/* Formulario para crear alianza */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Crear Nueva Alianza
          </Typography>

          <form onSubmit={crearAlianza}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  select
                  SelectProps={{ native: true }}
                >
                  <option value="corporativo">Corporativo</option>
                  <option value="tecnologico">Tecnológico</option>
                  <option value="educativo">Educativo</option>
                  <option value="industrial">Industrial</option>
                  <option value="financiero">Financiero</option>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ mr: 2 }}
                >
                  Crear Alianza
                </Button>
                <Button variant="outlined" onClick={cargarAlianzas} disabled={loading}>
                  Recargar Datos
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Mostrar errores */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Mostrar loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Lista de alianzas */}
      {!loading && (
        <>
          <Typography variant="h6" gutterBottom>
            Lista de Alianzas ({alianzas.length})
          </Typography>

          <Grid container spacing={2}>
            {alianzas.map((alianza) => (
              <Grid item xs={12} md={6} key={alianza.id}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">{alianza.nombre}</Typography>
                      <Chip
                        label={alianza.status}
                        color={alianza.status === 'activo' ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {alianza.descripcion}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Chip label={alianza.tipo} size="small" variant="outlined" />
                      <Chip
                        label={`${alianza.empresas_asociadas || 0} empresas`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => eliminarAlianza(alianza.id)}
                        disabled={loading}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}
