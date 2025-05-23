import React from 'react';
import userServices from '../../services/apiUsers';
import Swal from 'sweetalert2';

const AdminTable = ({
    name,
    photo,
    id,
    type,
    calories,
    children
}) => {

    async function changeStatus(id, type) {
        try {
            if (type === 'exercise') {
                await userServices.updateStatusExercises(id);
            } else if (type === 'food') {
                await userServices.updateStatusFoods(id);
            }
            Swal.fire({
                icon: 'success',
                title: 'Estado actualizado',
                text: `El estado del ${type} ha sido actualizado correctamente.`,
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error actualizando estado:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el estado. Inténtalo nuevamente.',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    return (
        <>
            <tr className={`${type}Row`}>
                <td className={`${type}Td`}>
                    {photo.startsWith('https') ? (
                        <>
                            <img className='img' alt={`${type}-image`} src={photo} />
                        </>
                    ) : (
                        <img className='img' alt={`${type}-image`} src={`https://res.cloudinary.com/dp5ykchgc/image/upload/v1747747884/photos/${type}s/${photo}`} />
                    )}
                </td>
                <td className={`${type}Td`}>
                    {name}
                </td>
                <td className={`${type}Td`}>
                    {calories}
                </td>
                <td className={`approve${(type)}Button`} onClick={() => changeStatus(id.replace(/^id-/, ''), type)}>
                    Aprobar
                </td>
            </tr>
            {children}
        </>
    );
};

export default AdminTable;
