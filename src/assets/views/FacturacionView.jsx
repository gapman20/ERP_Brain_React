import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonUsage from '../components/ButtonUsage';

  const FacturacionView = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Módulo de Facturación</Typography>
      <Typography paragraph>
        Contenido específico de facturación aquí
      </Typography>

      <ButtonUsage onClick ={() =>{
          alert('clicked');
      }
      }/>
    </Box>
  );

  export {FacturacionView} ;