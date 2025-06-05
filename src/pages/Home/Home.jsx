import React from 'react';
import './Home.css'
import CardHome from '../../components/CardHome/CardHome'

const Home = () => {

    const beneficiosHome = [
        {
            title: 'Control de Calorías',
            description: `<ul>
            <li>Registra fácilmente las calorías consumidas en cada comida.</li>
            <li>Consulta el aporte calórico de miles de alimentos para una dieta equilibrada.</li>
            <li>Recibe recomendaciones personalizadas para optimizar tu ingesta diaria.</li>
        </ul>`,
            className: 'cardCalorias'
        },
        {
            title: 'Rutinas Personalizadas',
            description: `<ul>
            <li>Ejercicios adaptados a tu nivel y objetivos específicos.</li>
            <li>Planes de entrenamiento que combinan fuerza, cardio y flexibilidad.</li>
            <li>Seguimiento detallado para mejorar tu rendimiento día a día.</li>
        </ul>`,
            className: 'cardRutinas'
        },
        {
            title: 'Monitoreo Integral',
            description: `<ul>
            <li>Combina datos de actividad física y alimentación en una sola plataforma.</li>
            <li>Visualiza tu progreso y ajusta tus metas fácilmente.</li>
            <li>Acceso a estadísticas y reportes para mantener la motivación.</li>
        </ul>`,
            className: 'cardMonitoreo'
        }
    ];


    return (
        <div className='textoHome'>
            <div className='videoHome'>
                <video src='homeVideo.mp4' autoPlay muted loop playsInline></video>
            </div>
            <div className='whoDiv'>
                <h2>Quienes Somos</h2>
                <div className='subDiv'>
                    <p>En FitCount creemos que llevar un estilo de vida saludable debe ser sencillo, accesible y motivador. Nuestra plataforma te ofrece rutinas de ejercicios adaptadas a tus objetivos y nivel, además de herramientas inteligentes para controlar tu alimentación y el consumo de calorías de forma práctica.</p>
                    <p>FitCount se adapta a ti con planes personalizados que combinan ejercicio y nutrición. Registra tus comidas, conoce el valor calórico de cada alimento y mejora tus hábitos para alcanzar tus metas con confianza, todo en un solo lugar pensado para tu bienestar.</p>
                </div>
                <button>Saber Mas</button>
            </div>
            <h2>Beneficios</h2>
            <div className='beneficiosDiv'>
                {beneficiosHome.map((text, index) => (
                    <CardHome
                        key={index}
                        title={text.title}
                        className={text.className}
                        description={text.description}
                    />
                ))}
            </div>
            <div className='freeDiv'>
                <img src="free.jpg" alt="free image" />
                <div className='content'>
                    <h3>1 Mes de Prueba Gratis</h3>
                    <button>Comienza Tu Prueba</button>
                </div>
            </div>
        </div>
    );
}

export default Home