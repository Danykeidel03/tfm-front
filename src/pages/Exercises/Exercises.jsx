import { useState, useEffect } from 'react';
import './Exercises.css'
import CardObj from '../../components/CardObj/CardObj';
import { useAuth } from '../../context/AuthContext';


const Exercises = () => {

    const { userName } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        if (!userName) {
            alert("No hay usuario en sesión");
            return;
        }

        const safeUserName = userName.toLowerCase().replace(/\s+/g, '_');
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
    }, [userName]);
    

    return (
        <div className='content-fitness'>
            <h1>Fitness</h1>
            <div className="divGetEjercicios">
                <h3>Ejercicios</h3>
                {exercises.length > 0 ? (
                    exercises.map((exercise, index) => (
                        <CardObj
                            photoLink={exercise.photoName}
                            nameObj={exercise.nombre}
                            calories={exercise.calorias}
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
                            calories={exercise.calorias}
                            key={index}
                        />
                    ))
                ) : (
                    <p>No hay ejercicios guardados.</p>
                )}
            </div>
        </div>
    )
}

export default Exercises