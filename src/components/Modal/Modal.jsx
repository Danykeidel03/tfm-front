import './Modal.css';

const Modal = ({ children, isActive, onClose }) => {
    if (!isActive) return null;

    return (
        <div className={`modalClass ${isActive ? 'active' : ''}`}>
            <div className="overlayModal" onClick={onClose}></div>
            <div className="contentModal">
                <button className="action-close" onClick={onClose} />
                {children}
            </div>
        </div>
    );
};

export default Modal;
