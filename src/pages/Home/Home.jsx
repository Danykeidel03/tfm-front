import React from 'react';
import './Home.css'
import CardHome from '../../components/CardHome/CardHome'

const Home = () => {

    const textHome = [
        {
            title: 'Funciones',
            description: `<ul>
            <li>Añadir tareas: Permitir a los usuarios agregar nuevas tareas de ejercicios con detalles como nombre, descripción, duración y nivel de intensidad.</li>
            <li>Eliminar tareas: Brindar la opción de eliminar ejercicios que ya no sean necesarios o relevantes.</li>
            <li>Ver tareas: Mostrar una lista organizada de los ejercicios programados con información clara y actualizada.</li>
        </ul>`,
            className: 'explicacionApp'
        },
        {
            title: 'Objetivos',
            description: `<ul>
            <li>Facilitar la planificación y el seguimiento de ejercicios en el gimnasio.</li>
            <li>Mantener un registro actualizado de los entrenamientos realizados.</li>
            <li>Ofrecer una interfaz intuitiva y fácil de usar.</li>
            <li>Permitir la gestión eficiente del tiempo y las rutinas de ejercicios.</li>
            <li>Fomentar la consistencia en el entrenamiento mediante un control visual de las tareas pendientes.</li>
        </ul>`,
            className: 'objetivosApp'
        }
    ];

    return (
        <div className='textoHome'>
            {textHome.map((text, index) => (
                <CardHome
                    key={index}
                    title={text.title}
                    className={text.className}
                    description={text.description}
                />
            ))}
        </div>
    );
}

export default Home