import { useEffect } from 'react';
import './Success.css';

const Success = ({ successMessage, clearSuccess, children }) => {
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                clearSuccess();
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [successMessage, clearSuccess]);

    if (!successMessage) return null;

    return (
        <div className='divSuccess'>
            {successMessage}
            {children}
        </div>
    );
};

export default Success;
