import React from 'react';
import userServices from '../../services/apiUsers';


const AdminTable = ({
    name,
    photo,
    id,
    type,
    calories,
    children
}) => {

    async function changeStatus(id, type) {
        if (type === 'exercise') {
            await userServices.updateStatusExercises(id)
        } else if (type === 'food') {
            await userServices.updateStatusFoods(id)
        }
        window.location.reload()
    }

    return (
        <>
            <tr className={`${type}Row`}>
                <td className={`${type}Td`}>
                    <img className='img' alt={`${type}-image`} src={photo} />
                </td>
                <td className={`${type}Td`}>
                    {name}
                </td>
                <td className={`${type}Td`}>
                    {calories}
                </td>
                <td className={`approve${(type)}Button`} onClick={ () => changeStatus(id.replace(/^id-/, ''), type)}>
                    Aprobar
                </td>
            </tr>
            {children}
        </>
    );
};

export default AdminTable;
