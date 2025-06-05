import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>FitCount</h4>
                    <p>Tu compañero ideal para llevar una vida activa y saludable. Ejercicios, control de comidas y progreso en un solo lugar.</p>
                </div>
                <div className="footer-section">
                    <h4>Enlaces Rápidos</h4>
                    <div className='list'>
                        <ul>
                            <li><a href="/ejercicios">Ejercicios</a></li>
                            <li><a href="/comidas">Comidas</a></li>
                        </ul>
                        <ul>
                            <li><a href="/progreso">Tu Progreso</a></li>
                            <li><a href="/contacto">Contacto</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Contacto</h4>
                    <p>Email: soporte@tuappdeejercicio.com</p>
                    <p>Tel: +34 600 123 456</p>
                    <div className="social-links">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} FitCount. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
