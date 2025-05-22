import { useState, useEffect } from 'react';
import '../Exercises/Exercises.css'
import CardObj from '../../components/CardObj/CardObj';
import objServices from '../../services/apiObj';
import { ClipLoader } from 'react-spinners';


const Calories = () => {
    const [calories, setSalories] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCalories = async () => {
        try {
            setLoading(true)
            const response = await objServices.getCalories();
            console.log(response);
            setSalories(response.data)
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCalories();
    }, []);

    return (
        <>
            {loading && (
                <div className='spinerLoading'>
                    <ClipLoader color="#36d7b7" size={50} />
                </div>
            )}
            <h1>Calorias Diarias</h1>
            <div className="divGetEjercicios calories">
                {calories.length > 0 ? (
                    calories.map((calories, index) => (
                        <CardObj
                            nameObj={calories.mailUser}
                            calories={calories.calories}
                            type={'calories'}
                            date={calories.fechaCreacion}
                            key={index}
                        />
                    ))
                ) : (
                    <p>No hay ejercicios guardados.</p>
                )}
            </div>
        </>
    )
}

export default Calories