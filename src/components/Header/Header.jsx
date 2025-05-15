import React, { useState } from 'react';
import userServices from '../../services/apiUsers';
import objServices from '../../services/apiObj';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "./schemaValidations";
import './Header.css'
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import CardObj from '../CardObj/CardObj';
import { useAuth } from '../../context/AuthContext';

const Header = () => {

  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalExercisesOpen, setModalExercisesActive] = useState(false);
  const [isModalFoodsOpen, setModalFoodsActive] = useState(false);
  const [isModalAddOpen, setModalAddOpen] = useState(false)
  const [customModalType, setCustomModalType] = useState(null);
  const [exerciseList, setExerciseList] = useState([]);
  const [foodList, setFoodsList] = useState([]);
  const { userName, userPhoto, setUserName, setUserPhoto, logout } = useAuth();

  const toggleModalExercises = () => setModalExercisesActive(!isModalExercisesOpen);
  const toggleModalAddCustom = () => { setModalAddOpen(!isModalAddOpen); setCustomModalType(null); };
  const toggleModalFoods = async () => {
    setModalFoodsActive(!isModalFoodsOpen);
    try {
      const response = await objServices.getFoods();
      const foods = response.data.food;
      setFoodsList(foods);
    } catch (error) {
      console.error(error);
    }
  }

  const openMenu = () => {
    setIsMenuActive(!isMenuActive)
  }

  const [isLoginActive, setIsLoginActive] = useState(false);

  const openLogin = () => {
    setIsLoginActive(!isLoginActive)
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (dataLoginUser) => {
    let datosLogin = await userServices.getLogin(dataLoginUser);
    const nameUser = datosLogin.data.user;
    const linkPhotoUser = datosLogin.data.photo;
    setUserName(nameUser);
    setUserPhoto(linkPhotoUser);
  }

  const getExercises = async (muscle) => {
    try {
      const response = await objServices.getExercises(muscle);
      const exercise = response.data.muscles;
      setExerciseList(exercise);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="header">
      <div className="header__logo-container">
        <Link className="urlRegister" to="/">
          <img
            src="logo.png"
            alt="Logo"
            className="header__logo"
            width="48px"
            height="48px"
          />
        </Link>
        <div className="accordionMenu" onClick={openMenu}>
          <img src="hamburgerMenu.png" alt="Hamburger Menu" />
        </div>
      </div>

      <div className={`divUser ${userName && 'active'}`}>
        <div className="bienvenidoUser">
          {userName && <span>{userName}</span>}
        </div>
        <div className="bienvenidoUserPhoto">
          {userPhoto && (
            <img className="imgUser" src={userPhoto} alt="Foto de usuario" />
          )}
        </div>
      </div>

      <div className={`loginDiv ${userName ? '' : 'active'}`}>
        <img
          onClick={openLogin}
          className="imageLogin"
          src="logoLogin.png"
          alt="Logo"
          width="48px"
          height="48px"
        />
        <div className={`divLoginForm${isLoginActive ? ' active' : ''}`}>
          <h3>Logueate</h3>
          <div className="formLogin">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register('mail')}
                type="mail"
                className="mailLogin"
                placeholder="Mail"
              />
              {errors.mail && <p className="form-error">{errors.mail.message}</p>}
              <input
                {...register('pass')}
                type="password"
                className="passLogin"
                placeholder="Contraseña"
              />
              {errors.pass && <p className="form-error">{errors.pass.message}</p>}
              <button className="loginButton submit">Login</button>
            </form>
            <Link className="urlRegister" to="/register">
              Registrate
            </Link>
          </div>
        </div>
      </div>
      <div className={`menu-content${isMenuActive ? ' active' : ''}`}>
        <div className="divGestionarTareas">
          <ul>
            <li className={`viewExercises ${userName && 'active'}`}>
              <p>
                <a href="exercises.html">Ver Tareas</a>
              </p>
            </li>
            <li className="addTarea" onClick={toggleModalExercises}>
              <p>Añadir Tarea</p>
            </li>
            <li className="addFood" onClick={toggleModalFoods}>
              <p>Añadir Comida</p>
            </li>
          </ul>
        </div>
        <div className="divLogout">
          <button className={`${userName && 'active'}`} onClick={logout}>Cerrar Sesión</button>
        </div>
      </div>

      <div className='modal-wrapper'>
        <Modal isActive={isModalExercisesOpen} onClose={toggleModalExercises}>
          <div className="opcionesDeEjercicios">
            <h2>Opciones</h2>
            <div className="buttonsEjercicios">
              <button className="ejercicioEspalda" onClick={() => getExercises('back')}>Espalda</button>
              <button className="ejercicioPecho" onClick={() => getExercises('chest')}>Pecho</button>
              <button className="ejercicioHombro" onClick={() => getExercises('shoulders')}>Hombro</button>
              <button className="ejercicioPierna" onClick={() => getExercises('upper legs')}>Pierna</button>
              <button className="ejercicioBiceps" onClick={() => getExercises('upper arms')}>Biceps</button>
              <button className="ejercicioCardio" onClick={() => getExercises('cardio')}>Cardio</button>
            </div>
            <div className="divAddEjercicios">
              {exerciseList.map((exercise, index) => (
                <CardObj
                  photoLink={exercise.photoName}
                  nameObj={exercise.name}
                  descriptionObj={exercise.description}
                  idObj={exercise._id}
                  key={index}
                />
              ))}
            </div>
            <div className='divCustom'>
              <button className='buttonAddCustomExercise' onClick={() => { toggleModalAddCustom(); setCustomModalType('exercise') }}>Añadir Manual</button>
            </div>
          </div>
        </Modal>
        <Modal isActive={isModalFoodsOpen} onClose={toggleModalFoods}>
          <div className="opcionesDeComidas">
            <h2>Opciones</h2>
            <div className="divAddFoods">
              {foodList.map((food, index) => (
                <CardObj
                  photoLink={food.photoName}
                  nameObj={food.name}
                  descriptionObj={food.description}
                  idObj={food._id}
                  key={index}
                />
              ))}
            </div>
            <div className='divCustom'>
              <button className='buttonAddCustomFood' onClick={() => { toggleModalAddCustom(); setCustomModalType('food') }}>Añadir Manual</button>
            </div>
          </div>
        </Modal>
        <Modal isActive={isModalAddOpen} onClose={toggleModalAddCustom}>
          <div className="modalAddManual">
            {customModalType === 'exercise' && (
              <div>
                <h2>Añadir Ejercicio Manualmente</h2>
                
              </div>
            )}
            {customModalType === 'food' && (
              <div>
                <h2>Añadir Comida Manualmente</h2>
                
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
