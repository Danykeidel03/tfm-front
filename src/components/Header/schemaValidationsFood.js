import * as yup from 'yup';

const schemaFood = yup.object({
    nameFood: yup
        .string()
        .required('El nombre es obligatorio'),

    photoFood: yup
        .mixed()
        .required('La imagen es obligatoria')
        .test(
            'fileType',
            'Formato no válido',
            value => {
                if (!value || !value.length) return false;
                const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                return fileTypes.includes(value[0]?.type);
            }
        ),

    caloriesFood: yup
        .number()
        .typeError('Las calorías deben ser un número')
        .required('Las calorías son obligatorias')
        .positive('Debe ser mayor que 0'),
});

export default schemaFood;
