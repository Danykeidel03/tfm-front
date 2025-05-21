import Modal from '../Modal/Modal'
import React, { useState } from 'react';
import userServices from '../../services/apiUsers';

const CardUserAdmin = ({
    mail,
    idUser,
    children
}) => {
    const [isModalEditOpen, setModalEditOpen] = useState(false);
    const [nameUpdate, setNameUpdate] = useState('');
    const [mailUpdate, setMailUpdate] = useState('');
    const [rolUpdate, setRolUpdate] = useState('');

    const toggleModalAddEdit = () => {
        setModalEditOpen(!isModalEditOpen);
    };

    const handleUpdate = async () => {
        let objUser = {};

        if (nameUpdate.trim() !== '') {
            objUser.name = nameUpdate.trim();
        }

        if (mailUpdate.trim() !== '') {
            objUser.mail = mailUpdate.trim();
        }

        if (rolUpdate.trim() !== '') {
            objUser.rol = rolUpdate.trim();
        }

        if (Object.keys(objUser).length === 0) {
            alert('No hay campos para actualizar.');
            return;
        }

        try {
            console.log(idUser);
            await userServices.updateUser(idUser, objUser);
            window.location.reload()
        } catch (error) {
            console.error('Error actualizando el usuario:', error);
            alert('Error al actualizar el usuario.');
        }
    };

    const deleteUserFunction = async () => {
        try {
            await userServices.deleteUser(idUser);
            window.location.reload()
        } catch (error) {
            console.error('Error actualizando el usuario:', error);
            alert('Error al actualizar el usuario.');
        }
    };

    return (
        <>

            <tr className='userTd'>
                <td className='userTd'>{mail}</td>
                <td className="editUser" onClick={toggleModalAddEdit}></td>
                <td className="deleteUser" onClick={deleteUserFunction}></td>
                <td>
                    <Modal isActive={isModalEditOpen} onClose={toggleModalAddEdit}>
                        <h3>Campos a editar</h3>
                        <div className="inputsUser">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nombre"
                                value={nameUpdate}
                                onChange={(e) => setNameUpdate(e.target.value)}
                            />
                            <input
                                type="text"
                                name="mail"
                                id="mail"
                                placeholder="Mail"
                                value={mailUpdate}
                                onChange={(e) => setMailUpdate(e.target.value)}
                            />
                            <input
                                type="text"
                                name="rol"
                                id="rol"
                                placeholder="Rol"
                                value={rolUpdate}
                                onChange={(e) => setRolUpdate(e.target.value)}
                            />
                            <button className="buttonUpdateUser" onClick={handleUpdate}>Actualizar</button>
                        </div>
                    </Modal>
                </td>
            </tr>
            {children}
        </>
    );
};

export default CardUserAdmin;
