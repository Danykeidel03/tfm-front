import Modal from '../Modal/Modal'
import React, { useState } from 'react';
import userServices from '../../services/apiUsers';
import Swal from 'sweetalert2';

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
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacíos',
                text: 'No hay campos para actualizar.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            console.log(idUser);
            await userServices.updateUser(idUser, objUser);
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado',
                text: 'Los datos del usuario se actualizaron correctamente.',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error actualizando el usuario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar el usuario.',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const deleteUserFunction = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción eliminará al usuario definitivamente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await userServices.deleteUser(idUser);
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario eliminado',
                        text: 'El usuario fue eliminado correctamente.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        window.location.reload();
                    });
                } catch (error) {
                    console.error('Error eliminando el usuario:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al eliminar el usuario.',
                        confirmButtonText: 'Aceptar'
                    });
                }
            }
        });
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
