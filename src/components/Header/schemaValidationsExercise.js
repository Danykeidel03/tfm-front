import * as yup from 'yup';

const schemaExercises = yup.object({
    nombreEjercicio: yup
        .string()
        .required('El nombre es obligatorio'),
    urlEjercicio: yup
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
    caloriesEjercicio: yup
        .number()
        .typeError('Las calorías deben ser un número')
        .required('Las calorías son obligatorias')
        .positive('Debe ser mayor que 0'),
    ejercicio: yup
        .string()
        .required('Selecciona un tipo de ejercicio')
        .oneOf(['back', 'chest', 'shoulders', 'upper legs', 'upper arms', 'cardio']),
    descripcionEjercicio: yup
        .string()
        .required('La descripción es obligatoria'),
});

export default schemaExercises;
