// pages/AlianzasPage.jsx
import { Box, Typography, Paper, Button } from '@mui/material';

const AlianzasPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Alianzas
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Lista de Alianzas
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Nueva Alianza
        </Button>
          
      </Paper>
    </Box>
  );
};

export default AlianzasPage;