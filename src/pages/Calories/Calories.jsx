import { useState, useEffect } from 'react';
import CardObj from '../../components/CardObj/CardObj';
import objServices from '../../services/apiObj';
import { ClipLoader } from 'react-spinners';

// Importa Material UI
import { Container, Grid, Typography, Box } from '@mui/material';

const Calories = () => {
  const [calories, setCalories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCalories = async () => {
    try {
      setLoading(true);
      const response = await objServices.getCalories();
      setCalories(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCalories();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Calorías Diarias
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginY: 4,
          }}
        >
          <ClipLoader color="#36d7b7" size={50} />
        </Box>
      ) : calories.length > 0 ? (
        <Grid container spacing={3}>
          {calories.map((calorie, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardObj
                nameObj={calorie.mailUser}
                calories={calorie.calories}
                type="calories"
                date={calorie.fechaCreacion}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" textAlign="center" sx={{ marginTop: 4 }}>
          No hay ejercicios guardados.
        </Typography>
      )}
    </Container>
  );
};

export default Calories;
