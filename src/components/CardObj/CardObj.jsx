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
    };

    return (
        <div className='divAddObj'>
            <div className='divPhotoObj'>
                <img src={photoObj} alt="photo-object" className='imgPhotoObj' />
            </div>
            <div className='divContentObj'>
                <span className='nameObj'>{nameObj}</span>
                <div className='nameInstructions'>
                    {button ? descriptionObj : `${calories} Calorias`}
                    {button && <button id={idObj} className='addButton' onClick={addItemStorage}>+</button>}
                </div>
            </div>
            {children}
        </div>
    );
};

export default CardObj;
