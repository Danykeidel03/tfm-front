import { useState, useEffect } from "react";
import "./Exercises.css";
import CardObj from "../../components/CardObj/CardObj";
import { useAuth } from "../../context/AuthContext";
import objServices from "../../services/apiObj";
import Swal from "sweetalert2";

const Exercises = ({ headerRef }) => {
  const { userName } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [foods, setFoods] = useState([]);
  const [exercisesEnded, setExercisesEnded] = useState([]);
  const [foodsEnded, setFoodsEnded] = useState([]);

  const safeUserName = userName
    ? userName.toLowerCase().replace(/\s+/g, "_")
    : "";

  useEffect(() => {
    if (!userName) {
      Swal.fire({
        title: "Error",
        text: "Debes Iniciar Sesion",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const storageKeyExercise = `exercises-${safeUserName}`;
    const storedItemsExercises = localStorage.getItem(storageKeyExercise);
    if (storedItemsExercises) {
      setExercises(JSON.parse(storedItemsExercises));
    }

    const storageKeyFood = `foods-${safeUserName}`;
    const storedItemsFoods = localStorage.getItem(storageKeyFood);
    if (storedItemsFoods) {
      setFoods(JSON.parse(storedItemsFoods));
    }

    const storageKeyExerciseEnded = `exercises-Finalizados-${safeUserName}`;
    const storedItemsExercisesEnded = localStorage.getItem(
      storageKeyExerciseEnded
    );
    if (storedItemsExercisesEnded) {
      setExercisesEnded(JSON.parse(storedItemsExercisesEnded));
    }

    const storageKeyFoodEnded = `foods-Finalizados-${safeUserName}`;
    const storedItemsFoodsEnded = localStorage.getItem(storageKeyFoodEnded);
    if (storedItemsFoodsEnded) {
      setFoodsEnded(JSON.parse(storedItemsFoodsEnded));
    }
  }, [userName, safeUserName]);

  return (
    <div className="content-fitness">
      <h1>Fitness</h1>
      <div className="divGetEjercicios">
        <h3>Ejercicios</h3>
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <CardObj
              photoLink={exercise.foto}
              nameObj={exercise.nombre}
              calories={exercise.calorias}
              type={"exercise"}
              key={index}
            />
          ))
        ) : (
          <div className="empty">
            <p>No hay ejercicios guardados.</p>
            <button onClick={() => headerRef.current?.openOpcionesEjercicios()}>
              Opciones Ejercicios
            </button>
          </div>
        )}
      </div>
      <div className="divGetEjercicios">
        <h3>Comidas</h3>
        {foods.length > 0 ? (
          foods.map((exercise, index) => (
            <CardObj
              photoLink={exercise.foto}
              nameObj={exercise.nombre}
              type={"food"}
              calories={exercise.calorias}
              key={index}
            />
          ))
        ) : (
          <div className="empty">
            <p>No hay ejercicios guardados.</p>
            <button onClick={() => headerRef.current?.openOpcionesComidas()}>
              Opciones Comidas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercises;
