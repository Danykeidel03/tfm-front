import { useEffect } from 'react';
import './Error.css';

const Error = ({ errorMessage, clearError, children }) => {
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                clearError();
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage, clearError]);

    if (!errorMessage) return null;

    return (
        <div className='divError'>
            {errorMessage}
            {children}
        </div>
    );
};

export default Error;
