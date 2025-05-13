import React from 'react';
import './CardHome.css';

const CardHome = ({
    title,
    className,
    description,
    children
}) => {
    return (
        <div className={className}>
            <h2>{title}</h2>
            <div
                className='description'
                dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            {children}
        </div>
    );
};

export default CardHome;
