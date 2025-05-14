import React from 'react';
import './CardObj.css';

const CardObj = ({
    photoLink,
    nameObj,
    descriptionObj,
    idObj,
    children
}) => {
    return (
        <div className='divAddObj'>
            <div className='divPhotoObj'>
                <img src="notImage.webp" alt="photo-object" className='imgPhotoObj' />
            </div>
            <div className='divContentObj'>
                <span className='nameObj'>{nameObj}</span>
                <div className='nameInstructions'>
                    {descriptionObj}
                    <button id={idObj} className='addButton'>+</button>
                </div>
            </div>
            {children}
        </div>
    );
};

export default CardObj;
