import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import userServices from '../../services/apiUsers';
import './AdminPanel.css'

import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';

import AdminTable from '../../components/AdminTable/AdminTable';
import CardUserAdmin from '../../components/CardUserAdmin/CardUserAdmin';

const AdminPanel = () => {
  const { userName, userPhoto } = useAuth();

  // Tab control: 0=Usuarios, 1=Ejercicios, 2=Comidas
  const [tabValue, setTabValue] = useState(0);
  const [getUsers, setUsers] = useState([]);
  const [getExercisesNotAprobed, setExercisesNotAprobed] = useState([]);
  const [getFoodsNotAprobed, setFoodsNotAprobed] = useState([]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResp = await userServices.adminGetUsers();
        setUsers(usersResp.data.users);

        const exercisesResp = await userServices.adminGetExercises();
        setExercisesNotAprobed(exercisesResp.data.muscles);

        const foodsResp = await userServices.adminGetFoods();
        setFoodsNotAprobed(foodsResp.data.food);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        paddingY: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        backgroundImage: `url('/ruta/a/tu/fondo.png')`, // Cambia por la ruta real de tu fondo
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          height: 'fit-content',
          position: 'sticky',
          top: 20,
        }}
      >
        <Avatar
          alt={userName}
          src={userPhoto}
          sx={{ width: 80, height: 80, marginBottom: 1 }}
        />
        <Typography variant="h6" gutterBottom>
          {userName}
        </Typography>

        <List component="nav" sx={{ width: '100%' }}>
          <ListItem disablePadding>
            <ListItemButton selected={tabValue === 0} onClick={() => setTabValue(0)}>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={tabValue === 1} onClick={() => setTabValue(1)}>
              <ListItemText primary="Ejercicios" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={tabValue === 2} onClick={() => setTabValue(2)}>
              <ListItemText primary="Comida" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box flex={1}>
        <Tabs value={tabValue} onChange={handleChange} sx={{ marginBottom: 3 }}>
          <Tab label="Usuarios" />
          <Tab label="Ejercicios" />
          <Tab label="Comida" />
        </Tabs>

        {/* Usuarios */}
        {tabValue === 0 && (
          <>
            <Typography variant="h5" mb={2}>
              Listado de usuarios
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <thead>
                  <TableRow>
                    <TableCell>Mail</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Eliminar</TableCell>
                  </TableRow>
                </thead>
                <TableBody>
                  {getUsers.map((userAdmin, index) => (
                    <CardUserAdmin
                      mail={userAdmin.mail}
                      idUser={userAdmin._id}
                      key={index}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {tabValue === 1 && (
          <>
            <Typography variant="h5" mb={2}>
              Listado de ejercicios pendientes
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <thead>
                  <TableRow>
                    <TableCell>Foto</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Calorías</TableCell>
                    <TableCell align="center">Aprobar</TableCell>
                  </TableRow>
                </thead>
                <TableBody>
                  {getExercisesNotAprobed
                    .filter((exercise) => exercise.status === 'desactivate')
                    .map((exercise, index) => (
                      <AdminTable
                        name={exercise.name}
                        photo={exercise.photoName}
                        id={exercise._id}
                        type={'exercise'}
                        calories={exercise.calories}
                        key={index}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {tabValue === 2 && (
          <>
            <Typography variant="h5" mb={2}>
              Listado de comidas pendientes
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <thead>
                  <TableRow>
                    <TableCell>Foto</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Calorías</TableCell>
                    <TableCell align="center">Aprobar</TableCell>
                  </TableRow>
                </thead>
                <TableBody>
                  {getFoodsNotAprobed
                    .filter((food) => food.status === 'desactivate')
                    .map((food, index) => (
                      <AdminTable
                        name={food.name}
                        photo={food.photoName}
                        id={food._id}
                        type={'food'}
                        calories={food.calories}
                        key={index}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Container>
  );
};

export default AdminPanel;
