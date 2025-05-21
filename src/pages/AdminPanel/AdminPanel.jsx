import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import userServices from '../../services/apiUsers';
import './AdminPanel.css';
import AdminTable from '../../components/AdminTable/AdminTable';
import CardUserAdmin from '../../components/CardUserAdmin/CardUserAdmin';

const AdminPanel = () => {
  const { userName, userPhoto } = useAuth();
  const [isUserListActived, setUserListActived] = useState(true)
  const [isFoodListActived, setFoodListActived] = useState(false)
  const [isExerciseActived, setExerciseActived] = useState(false)
  const [getUsers, setUsers] = useState([]);
  const [getExercisesNotAprobed, setExercisesNotAprobed] = useState([]);
  const [getFoodsNotAprobed, setFoodsNotAprobed] = useState([]);


  const getUsersAdmin = async () => {
    try {
      const response = await userServices.adminGetUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const getExercises = async () => {
    try {
      const response = await userServices.adminGetExercises();
      setExercisesNotAprobed(response.data.muscles);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }

  const getFoods = async () => {
    try {
      const response = await userServices.adminGetFoods();
      setFoodsNotAprobed(response.data.food);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }

  useEffect(() => {
    getUsersAdmin();
    getExercises();
    getFoods();
  }, []);

  return (
    <>
      <div className="menu-contentAdmin">
        <div className="optionsMenu">
          <div className="user">
            <div className="bienvenidoUser">
              <p>{userName}</p>
            </div>
            <div className="bienvenidoUserPhoto">
              <img className="imgUser" src={userPhoto} alt="Foto de usuario" />
            </div>
          </div>
          <ul>
            <li onClick={() => !isUserListActived && (setUserListActived(true), setExerciseActived(false), setFoodListActived(false))}><p>Usuarios</p></li>
            <li onClick={() => !isExerciseActived && (setExerciseActived(true), setUserListActived(false), setFoodListActived(false))}><p>Ejercicios</p></li>
            <li onClick={() => !isFoodListActived && (setFoodListActived(true), setUserListActived(false), setExerciseActived(false))}><p>Comida</p></li>
          </ul>
        </div>
      </div>
      <div className="main-contentAdmin">
        <div className={`divUsers ${isUserListActived ? 'active' : ''}`}>
          <h2>Listado de usuarios</h2>
          <table className='tableUsers'>
            <thead>
              <tr>
                <th>Mail</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {getUsers.map((userAdmin, index) => (
                <CardUserAdmin
                  mail={userAdmin.mail}
                  id={userAdmin._id}
                  key={index}
                />
              ))}
            </tbody>
          </table>

        </div>
        <div className={`divExercises ${isExerciseActived ? 'active' : ''}`}>
          <h2>Listado de ejercicios</h2>
          <table className='tableExercises'>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Calorias</th>
                <th>Aprobar</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
        <div className={`divFoods ${isFoodListActived ? 'active' : ''}`}>
          <h2>Listado de comidas</h2>
          <table className='tableFoods'>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Calorias</th>
                <th>Aprobar</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
