import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import userServices from '../../services/apiUsers';
import objServices from '../../services/apiObj';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "./schemaValidations";
import schemaExercises from './schemaValidationsExercise'
import schemaFood from './schemaValidationsFood';
import './Header.css'
import { Link, useLocation } from 'react-router-dom';
import Modal from '../Modal/Modal';
import CardObj from '../CardObj/CardObj';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';

const Header = forwardRef((props, ref) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalExercisesOpen, setModalExercisesActive] = useState(false);
  const [isModalFoodsOpen, setModalFoodsActive] = useState(false);
  const [isModalAddOpen, setModalAddOpen] = useState(false)
  const [customModalType, setCustomModalType] = useState(null);
  const [exerciseList, setExerciseList] = useState([]);
  const [foodList, setFoodsList] = useState([]);
  const { userName, userPhoto, setUserName, setUserPhoto, logout } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const location = useLocation();

  useImperativeHandle(ref, () => ({
    openAddExerciseModal: () => { setModalAddOpen(true); setCustomModalType('exercise'); },
    openAddFoodModal: () => { setModalAddOpen(true); setCustomModalType('food'); },
    openOpcionesEjercicios: () => setModalExercisesActive(true),
    openOpcionesComidas: async () => {
      setModalFoodsActive(true);
      try {
        setLoading(true);
        const response = await objServices.getFoods();
        const foods = response.data.food;
        setFoodsList(foods);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }));

  useEffect(() => {
    setIsLoginActive(false);
  }, [location.pathname]);

  const toggleModalExercises = () => setModalExercisesActive(!isModalExercisesOpen);
  const toggleModalAddCustom = () => { setModalAddOpen(!isModalAddOpen); setCustomModalType(null); };
  const toggleModalFoods = async () => {
    setModalFoodsActive(!isModalFoodsOpen);
    try {
      if(isModalFoodsOpen == false) setLoading(true)
      const response = await objServices.getFoods();
      const foods = response.data.food;
      setFoodsList(foods);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const openMenu = () => {
    setIsMenuActive(!isMenuActive)
  }

  const openLogin = () => {
    setIsLoginActive(!isLoginActive)
  }

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const {
    register: exerciseRegister,
    handleSubmit: handleExerciseSubmit,
    formState: { errors: exerciseErrors },
    setValue: setExerciseValue
  } = useForm({
    resolver: yupResolver(schemaExercises)
  });

  const {
    register: foodRegister,
    handleSubmit: handleFoodSubmit,
    formState: { errors: foodErrors },
    setValue: setFoodValue
  } = useForm({
    resolver: yupResolver(schemaFood)
  });

  const handleSelectExercise = (id) => {
    setSelectedExercises(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const handleSelectFood = (id) => {
    setSelectedFoods(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const addSelectedExercises = () => {
    if (!userName) {
      Swal.fire({
        title: 'Error',
        text: 'Debes Iniciar Sesion',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    const safeUserName = userName.toLowerCase().replace(/\s+/g, '_');
    const storageKey = `exercises-${safeUserName}`;
    let stored = JSON.parse(localStorage.getItem(storageKey)) || [];
    const toAdd = exerciseList.filter(e => selectedExercises.includes(e._id));
    toAdd.forEach(e => {
      if (!stored.some(item => item.nombre === e.name)) {
        stored.push({
          nombre: e.name,
          foto: e.photoName,
          calorias: e.calories,
        });
      }
    });
    localStorage.setItem(storageKey, JSON.stringify(stored));
    setSelectedExercises([]);
    setModalExercisesActive(false);
    window.location.reload();
  };

  const addSelectedFoods = () => {
    if (!userName) {
      Swal.fire({
        title: 'Error',
        text: 'Debes Iniciar Sesion',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    const safeUserName = userName.toLowerCase().replace(/\s+/g, '_');
    const storageKey = `foods-${safeUserName}`;
    let stored = JSON.parse(localStorage.getItem(storageKey)) || [];
    const toAdd = foodList.filter(f => selectedFoods.includes(f._id));
    toAdd.forEach(f => {
      if (!stored.some(item => item.nombre === f.name)) {
        stored.push({
          nombre: f.name,
          foto: f.photoName,
          calorias: f.calories,
        });
      }
    });
    localStorage.setItem(storageKey, JSON.stringify(stored));
    setSelectedFoods([]);
    setModalFoodsActive(false);
    window.location.reload();
  };

  const onLoginSubmit = async (dataLoginUser) => {
    try {
      setLoading(true)
      const datosLogin = await userServices.getLogin(dataLoginUser);

      const nameUser = datosLogin.data.user;
      const linkPhotoUser = datosLogin.data.photo;
      setUserName(nameUser);
      setUserPhoto(linkPhotoUser);
    } catch (error) {
      if (error.response?.status === 401) {
        Swal.fire({
          title: 'Error de autenticación',
          text: 'El usuario no existe o la contraseña es incorrecta.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      } else {
        Swal.fire({
          title: 'Error inesperado',
          text: 'Ocurrió un error al intentar iniciar sesión. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadToCloudinary = async (file, folder) => {
    const cloudName = 'dp5ykchgc';
    const uploadPreset = 'photos';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', `photos/${folder}`);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error.message || 'Error subiendo a Cloudinary');
    return data.secure_url;
  };

  const onExerciseSubmit = async (dataExercise) => {
    try {
      setLoading(true)
      let imageUrl = '';

      if (dataExercise.urlEjercicio && dataExercise.urlEjercicio[0]) {
        imageUrl = await uploadToCloudinary(dataExercise.urlEjercicio[0], 'exercises');
      }

      const formData = new FormData();
      formData.append('name', dataExercise.nombreEjercicio);
      formData.append('photo', imageUrl);
      formData.append('muscle', dataExercise.ejercicio);
      formData.append('description', dataExercise.descripcionEjercicio);
      formData.append('calories', dataExercise.caloriesEjercicio);

      const response = await objServices.newExercise(formData);

      if (response.status === 201) {
        setSuccessMessage('Ejercicio Añadido');
        Swal.fire({
          title: 'Añadido!',
          text: successMessage,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error('Error al registrar el ejercicio:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.error,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setLoading(false);
    }
  };

  const onFoodSubmit = async (dataFood) => {
    try {
      setLoading(true)
      let imageUrl = '';

      if (dataFood.photoFood && dataFood.photoFood[0]) {
        imageUrl = await uploadToCloudinary(dataFood.photoFood[0], 'foods');
      }

      const formData = new FormData();
      formData.append('name', dataFood.nameFood);
      formData.append('photo', imageUrl);
      formData.append('calories', dataFood.caloriesFood);

      const response = await objServices.newFood(formData);
      console.log(response);

      if (response.status === 201) {
        setSuccessMessage('Comida Añadida');
        Swal.fire({
          title: 'Añadido!',
          text: successMessage,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error('Error al registrar la comida:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.error,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setLoading(false);
    }
  };

  const getExercises = async (muscle) => {
    try {
      setLoading(true)
      const response = await objServices.getExercises(muscle);
      const exercise = response.data.muscles;
      setExerciseList(exercise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="header">
      {loading && (
        <div className='spinerLoading'>
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      )}
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
          <h3>Login</h3>
          <div className="formLogin">
            <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
              <input
                {...loginRegister('mail')}
                type="mail"
                className="mailLogin"
                placeholder="Mail"
              />
              {loginErrors.mail && <p className="form-error">{loginErrors.mail.message}</p>}
              <input
                {...loginRegister('pass')}
                type="password"
                className="passLogin"
                placeholder="Contraseña"
              />
              {loginErrors.pass && <p className="form-error">{loginErrors.pass.message}</p>}
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
                <Link className="urlRegister" to="/exercises">
                  Add Work
                </Link>
              </p>
            </li>
            <li className={`viewExercises ${userName && 'active'}`}>
              <p>
                <Link className="urlRegister" to="/calorias">
                  Calorias
                </Link>
              </p>
            </li>
            <li className="addTarea" onClick={toggleModalExercises}>
              <p>Añadir Tarea</p>
            </li>
            <li className="addFood" onClick={toggleModalFoods}>
              <p>Añadir Comida</p>
            </li>
          </ul>
          <ul>
            <li className={`viewExercises ${userName && 'active'}`}>
              <p>
                <Link className="urlRegister" to="/progress">
                  Tu Progreso
                </Link>
              </p>
            </li>
            <li>
              <p>
                <Link className="urlRegister" to="/saberMas">
                  Saber Mas
                </Link>
              </p>
            </li>
             <li>
              <p>
                <Link className="urlRegister" to="/contacto">
                  Contacto
                </Link>
              </p>
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
                <div key={exercise._id} className='exerciseCard'>
                  <CardObj
                    photoLink={exercise.photoName}
                    nameObj={exercise.name}
                    descriptionObj={exercise.description}
                    idObj={exercise._id}
                    calories={exercise.calories}
                    type='exercise'
                    button={true}
                  />
                   <input
                    type="checkbox"
                    checked={selectedExercises.includes(exercise._id)}
                    onChange={() => handleSelectExercise(exercise._id)}
                  />
                </div>
              ))}
            </div>
            <div className='divCustom'>
              <button className='buttonAddCustomExercise' onClick={() => { setModalAddOpen(true); setCustomModalType('exercise') }}>Añadir Manual</button>
              <button className="addSelectedBtn" onClick={addSelectedExercises} disabled={selectedExercises.length === 0}>Añadir </button>
            </div>
          </div>
        </Modal>
        <Modal isActive={isModalFoodsOpen} onClose={toggleModalFoods}>
          <div className="opcionesDeComidas">
            <h2>Opciones</h2>
            <div className="divAddFoods">
              {foodList.map((food, index) => (
                <div key={food._id} className='foodCard'>
                  <CardObj
                    photoLink={food.photoName}
                    nameObj={food.name}
                    descriptionObj={food.description}
                    idObj={food._id}
                    calories={food.calories}
                    type='food'
                    button={false}
                  />
                  <input
                    type="checkbox"
                    checked={selectedFoods.includes(food._id)}
                    onChange={() => handleSelectFood(food._id)}
                  />
                </div>
              ))}
            </div>
            <div className='divCustom'>
              <button className='buttonAddCustomFood' onClick={() => { setModalAddOpen(true); setCustomModalType('food') }}>Añadir Manual</button>
              <button className="addSelectedBtn" onClick={addSelectedFoods} disabled={selectedFoods.length === 0}>Añadir </button>
            </div>
          </div>
        </Modal>
        <Modal isActive={isModalAddOpen} onClose={toggleModalAddCustom}>
          <div className="modalAddManual">
            {customModalType === 'exercise' && (
              <div>
                <h2>Añadir Ejercicio Manualmente</h2>
                <form className="divForm" onSubmit={handleExerciseSubmit(onExerciseSubmit)}>
                  <input
                    {...exerciseRegister('nombreEjercicio')}
                    type="text"
                    className="nombreEjercicio"
                    placeholder="Nombre Ejercicio"
                  />
                  {exerciseErrors.nombreEjercicio && <p className="form-error">{exerciseErrors.nombreEjercicio.message}</p>}

                  <input
                    {...exerciseRegister('urlEjercicio')}
                    type="file"
                    className="urlEjercicio"
                    onChange={(e) => setExerciseValue('file', e.target.files[0])}
                  />
                  {exerciseErrors.urlEjercicio && <p className="form-error">{exerciseErrors.urlEjercicio.message}</p>}

                  <input
                    {...exerciseRegister('caloriesEjercicio', { valueAsNumber: true })}
                    type="number"
                    className="caloriesEjercicio"
                    placeholder="Calorías"
                  />
                  {exerciseErrors.caloriesEjercicio && <p className="form-error">{exerciseErrors.caloriesEjercicio.message}</p>}

                  <select {...exerciseRegister('ejercicio')} id="ejercicioSelect">
                    <option value="back">Espalda</option>
                    <option value="chest">Pecho</option>
                    <option value="shoulders">Hombro</option>
                    <option value="upper legs">Pierna</option>
                    <option value="upper arms">Bíceps</option>
                    <option value="cardio">Cardio</option>
                  </select>

                  <textarea
                    {...exerciseRegister('descripcionEjercicio')}
                    className="descripcionEjercicio"
                    placeholder="Descripción Imagen"
                  ></textarea>
                  {exerciseErrors.descripcionEjercicio && <p className="form-error">{exerciseErrors.descripcionEjercicio.message}</p>}

                  <button className="addCustomExercise submit">Añadir Ejercicio</button>
                </form>
              </div>
            )}
            {customModalType === 'food' && (
              <div>
                <h2>Añadir Comida Manualmente</h2>
                <form className="divForm" onSubmit={handleFoodSubmit(onFoodSubmit)}>
                  <input
                    {...foodRegister('nameFood', { required: 'El nombre es obligatorio' })}
                    type="text"
                    id="nameFood"
                    className="nameFood"
                    placeholder="Nombre del alimento o ejercicio"
                  />
                  {foodErrors.nameFood && <p className="form-error">{foodErrors.nameFood.message}</p>}

                  <input
                    {...foodRegister('photoFood', { required: 'La imagen es obligatoria' })}
                    type="file"
                    id="photoFood"
                    className="photoFood"
                    onChange={(e) => setFoodValue('file', e.target.files[0])}
                  />
                  {foodErrors.photoFood && <p className="form-error">{foodErrors.photoFood.message}</p>}

                  <input
                    {...foodRegister('caloriesFood', {
                      required: 'Las calorías son obligatorias',
                      valueAsNumber: true,
                      min: { value: 1, message: 'Debe ser mayor que 0' },
                    })}
                    type="number"
                    id="caloriesFood"
                    className="caloriesFood"
                    placeholder="Calorías"
                  />
                  {foodErrors.caloriesFood && <p className="form-error">{foodErrors.caloriesFood.message}</p>}

                  <button className="addCustomFood submit">Añadir</button>
                </form>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
});

export default Header;