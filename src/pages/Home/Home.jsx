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
                    <p>En Nombre de la Web creemos que llevar un estilo de vida saludable debe ser sencillo, accesible y motivador para todos. Por eso, hemos creado una plataforma integral donde no solo encuentras rutinas de ejercicios diseñadas para diferentes niveles y objetivos, sino también herramientas inteligentes para ayudarte a controlar tu alimentación y el consumo de calorías de forma fácil y práctica.</p>
                    <p>Nuestro objetivo es acompañarte en cada paso de tu camino hacia una vida más activa y equilibrada. Aquí puedes registrar tus comidas diarias, conocer el aporte calórico de cada alimento y ajustar tus hábitos alimenticios para maximizar los resultados de tu entrenamiento. Todo esto en un solo lugar, pensado para que tu salud y bienestar sean prioridad sin complicaciones.</p>
                    <p>Sabemos que cada persona es única, por eso nuestra plataforma se adapta a tus necesidades, ofreciéndote planes personalizados que combinan ejercicio y nutrición. Estamos comprometidos en brindarte la mejor experiencia para que puedas alcanzar tus metas con confianza y disfrutando el proceso.</p>
                </div>
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
                <h3>1 Mes de Prueba</h3>
            </div>
        </div>
    );
}

export default Home