import React from 'react';
import './CardObj.css';
import { useAuth } from '../../context/AuthContext';

const CardObj = ({
    nameObj,
    descriptionObj,
    idObj,
    type,
    photoObj = "notImage.webp", // para que puedas personalizar la imagen
    calories,
    button,
    children
}) => {
    const { userName } = useAuth();

    const addItemStorage = () => {
        let arrayObjItems = [];
        if (!userName) {
            alert("No hay usuario en sesión");
            return;
        }

        const safeUserName = userName.toLowerCase().replace(/\s+/g, '_');
        const storageKey = `${type}s-${safeUserName}`;

        if (localStorage.getItem(storageKey)) {
            const storedItems = JSON.parse(localStorage.getItem(storageKey));
            storedItems.push({
                nombre: nameObj,
                foto: photoObj,
                calorias: calories,
            });
            arrayObjItems = storedItems;
            localStorage.removeItem(storageKey);
        } else {
            arrayObjItems = [{
                nombre: nameObj,
                foto: photoObj,
                calorias: calories,
            }];
        }

        localStorage.setItem(storageKey, JSON.stringify(arrayObjItems));
        window.location.reload()
    };

     const endExercise = () => {
        if (!userName) {
            alert("No hay usuario en sesión");
            return;
        }

        const safeUserName = userName.toLowerCase().replace(/\s+/g, '_');
        const keyEjercicios = `${type}s-${safeUserName}`;
        const keyFinalizados = `${type}s-Finalizados-${safeUserName}`;

        let arrayObjExercisesEnded = [];

        if (localStorage.getItem(keyFinalizados)) {
            const ejerciciosFinalizados = JSON.parse(localStorage.getItem(keyFinalizados));
            ejerciciosFinalizados.push({ nombre: nameObj, calorias: calories });
            arrayObjExercisesEnded = ejerciciosFinalizados;
            localStorage.removeItem(keyFinalizados);
        } else {
            arrayObjExercisesEnded = [{ nombre: nameObj, calorias: calories }];
        }

        const ejercicios = JSON.parse(localStorage.getItem(keyEjercicios)) || [];
        const ejerciciosFiltrados = ejercicios.filter(item => item.nombre !== nameObj);

        localStorage.setItem(keyFinalizados, JSON.stringify(arrayObjExercisesEnded));
        localStorage.setItem(keyEjercicios, JSON.stringify(ejerciciosFiltrados));
        window.location.reload()
    };

    return (
        <div className='divAddObj'>
            <div className='divPhotoObj'>
                <img src={photoObj} alt="photo-object" className='imgPhotoObj' />
            </div>
            <div className='divContentObj'>
                <span className='nameObj'>{nameObj}</span>
                <div className='nameInstructions'>
                    {button ? descriptionObj : `${calories} Cal`}
                    {button ? <button id={idObj} className='addButton' onClick={addItemStorage}>+</button> : <button id={idObj} className='addButton' onClick={endExercise}>Finalizar</button>}
                </div>
            </div>
            {children}
        </div>
    );
};

export default CardObj;
