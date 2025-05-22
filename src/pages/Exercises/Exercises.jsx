import { useState, useEffect } from 'react';
import './Exercises.css'
import CardObj from '../../components/CardObj/CardObj';
import { useAuth } from '../../context/AuthContext';
import objServices from '../../services/apiObj';
import Swal from 'sweetalert2';

const Exercises = () => {

    const { userName } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [foods, setFoods] = useState([]);
    const [exercisesEnded, setExercisesEnded] = useState([]);
    const [foodsEnded, setFoodsEnded] = useState([]);
    const safeUserName = userName.toLowerCase().replace(/\s+/g, '_');

    useEffect(() => {
        if (!userName) {
            Swal.fire({
                title: 'Error',
                text: 'Debes Iniciar Sesion',
                icon: 'error',
                confirmButtonText: 'Aceptar'
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

        const storedItemsExercisesEnded = localStorage.getItem(storageKeyExerciseEnded);
        if (storedItemsExercisesEnded) {
            setExercisesEnded(JSON.parse(storedItemsExercisesEnded));
        }

        const storageKeyFoodEnded = `foods-Finalizados-${safeUserName}`;

        const storedItemsFoodsEnded = localStorage.getItem(storageKeyFoodEnded);
        if (storedItemsFoodsEnded) {
            setFoodsEnded(JSON.parse(storedItemsFoodsEnded));
        }
    }, [userName]);

    function endRoutine() {
        let finalCalories = 0;
        const keyFinalizadosFods = JSON.parse(localStorage.getItem(`foods-Finalizados-${safeUserName}`)) || [];
        const keyFinalizadosExercises = JSON.parse(localStorage.getItem(`exercises-Finalizados-${safeUserName}`)) || [];

        keyFinalizadosExercises.forEach(exercise => {
            finalCalories += exercise.calorias;
        });
        keyFinalizadosFods.forEach(food => {
            finalCalories += food.calorias;
        });
        const formData = new FormData();
        formData.append('calories', finalCalories);
        objServices.endRoutine(formData);
        localStorage.removeItem(`foods-Finalizados-${safeUserName}`);
        localStorage.removeItem(`exercises-Finalizados-${safeUserName}`);
        Swal.fire({
            title: '¡Rutina finalizada!',
            text: `Has quemado un total de ${finalCalories} calorías.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.reload();
        });
    }

    return (
        <div className='content-fitness'>
            <h1>Fitness</h1>
            <div className="divGetEjercicios">
                <h3>Ejercicios</h3>
                {exercises.length > 0 ? (
                    exercises.map((exercise, index) => (
                        <CardObj
                            photoLink={exercise.foto}
                            nameObj={exercise.nombre}
                            calories={exercise.calorias}
                            type={'exercise'}
                            key={index}
                        />
                    ))
                ) : (
                    <p>No hay ejercicios guardados.</p>
                )}
            </div>
            <div className="divGetEjercicios">
                <h3>Comidas</h3>
                {foods.length > 0 ? (
                    foods.map((exercise, index) => (
                        <CardObj
                            photoLink={exercise.foto}
                            nameObj={exercise.nombre}
                            type={'food'}
                            calories={exercise.calorias}
                            key={index}
                        />
                    ))
                ) : (
                    <p>No hay comidas guardadas.</p>
                )}
            </div>
            <h1>Completado</h1>
            <div className="divGetEjerciciosEnded">
                <h3>Ejercicios</h3>
                {exercisesEnded.length > 0 ? (
                    exercisesEnded.map((exercise, index) => (
                        <CardObj
                            photoLink={exercise.foto}
                            nameObj={exercise.nombre}
                            calories={exercise.calorias}
                            type={'exercise'}
                            key={index}
                        />
                    ))
                ) : (
                    <p>No hay ejercicios completados.</p>
                )}
            </div>
            <div className="divGetEjerciciosEnded">
                <h3>Comidas</h3>
                {foodsEnded.length > 0 ? (
                    foodsEnded.map((exercise, index) => (
                        <CardObj
                            photoLink={exercise.foto}
                            nameObj={exercise.nombre}
                            type={'food'}
                            calories={exercise.calorias}
                            key={index}
                        />
                    ))
                ) : (
                    <p>No hay comidas completados.</p>
                )}
            </div>
            <button className='finalizarRutina' onClick={endRoutine}>Finalizar Rutina</button>
        </div>
    )
}

export default Exercises