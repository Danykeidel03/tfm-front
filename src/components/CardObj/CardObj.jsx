import React from 'react';
import './CardObj.css';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const CardObj = ({
    nameObj,
    descriptionObj,
    idObj,
    type,
    photoLink,
    calories,
    button,
    date,
    children
}) => {
    const { userName } = useAuth();

    const addItemStorage = () => {
        let arrayObjItems = [];
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
        const storageKey = `${type}s-${safeUserName}`;

        if (localStorage.getItem(storageKey)) {
            const storedItems = JSON.parse(localStorage.getItem(storageKey));
            storedItems.push({
                nombre: nameObj,
                foto: photoLink,
                calorias: calories,
            });
            arrayObjItems = storedItems;
            localStorage.removeItem(storageKey);
        } else {
            arrayObjItems = [{
                nombre: nameObj,
                foto: photoLink,
                calorias: calories,
            }];
        }

        localStorage.setItem(storageKey, JSON.stringify(arrayObjItems));
        window.location.reload()
    };

    const endExercise = () => {
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
        const keyEjercicios = `${type}s-${safeUserName}`;
        const keyFinalizados = `${type}s-Finalizados-${safeUserName}`;

        let arrayObjExercisesEnded = [];

        if (localStorage.getItem(keyFinalizados)) {
            const ejerciciosFinalizados = JSON.parse(localStorage.getItem(keyFinalizados));
            ejerciciosFinalizados.push({ nombre: nameObj, calorias: calories, foto: photoLink });
            arrayObjExercisesEnded = ejerciciosFinalizados;
            localStorage.removeItem(keyFinalizados);
        } else {
            arrayObjExercisesEnded = [{ nombre: nameObj, calorias: calories, foto: photoLink }];
        }

        const ejercicios = JSON.parse(localStorage.getItem(keyEjercicios)) || [];
        const ejerciciosFiltrados = ejercicios.filter(item => item.nombre !== nameObj);

        localStorage.setItem(keyFinalizados, JSON.stringify(arrayObjExercisesEnded));
        localStorage.setItem(keyEjercicios, JSON.stringify(ejerciciosFiltrados));
        window.location.reload()
    };

    return (
        <>
            {type === 'calories' ? (
                <>
                    <div className='divCalories'>
                        <div className='dateCalories'>{date.split('T')[0]}</div>
                        <div className='divContentObj'>
                            <div className='nameInstructions'>
                                {button ? descriptionObj : `${calories} Calorias`}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='divAddObj'>
                        <div className='divPhotoObj'>
                            {photoLink.startsWith('https') ? (
                                <>
                                    <img className='img' alt={`${type}-object`} src={photoLink} />
                                </>
                            ) : (
                                <img src={`https://res.cloudinary.com/dp5ykchgc/image/upload/v1747747884/photos/${type}s/${photoLink}`} alt="photo-object" className='imgPhotoObj' />
                            )}
                        </div>
                        <div className='divContentObj'>
                            <span className='nameObj'>{nameObj}</span>
                            <div className='nameInstructions'>
                                {button ? descriptionObj : `${calories} Cal`}
                                {button ? <button id={idObj} className='addButton' onClick={addItemStorage}>+</button> : <button id={idObj} className='addButton' onClick={endExercise}>Finalizar</button>}
                            </div>
                        </div>
                    </div>
                </>
            )}
            {children}
        </>
    );
};

export default CardObj;
