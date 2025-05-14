import * as yup from 'yup'

const schema = yup.object({

    file: yup
    .mixed()
    .required('El archivo es obligatorio')
    .test(
      'fileSize',
      'El archivo es muy grande (máx. 5MB)',
      (value) => value && value.size <= 5 * 1024 * 1024
    )
    .test(
      'fileType',
      'Formato no soportado (solo imágenes JPG, PNG)',
      (value) =>
        value &&
        ['image/jpeg', 'image/png'].includes(value.type)
    ),

    name: yup
        .string()
        .required('El campo nombre es obligatorio')
        .min(3, 'Minimo 3 caracteres')
        .max(50, 'El maximo son 50 caracteres')
        .matches(/^[a-zA-Z\s]+$/, 'Solo letras y espacios'),

    mail: yup
        .string()
        .required('El mail es obligatorio')
        .email('Debe ser mail valido'),

    height: yup
        .number()
        .required('El edad es obligatorio'),

    weight: yup
        .number()
        .required('El edad es obligatorio'),

    activity: yup
        .string()
        .required('El campo actividad es obligatorio')
        .matches(/^[a-zA-Z\s]+$/, 'Solo letras y espacios'),

    pass: yup
        .string()
        .required('El campo pass es obligatorio'),

    passSecond: yup
        .string()
        .required('El campo pass es obligatorio')
        .oneOf([yup.ref('pass')], 'Las contraseñas no coinciden'),
})

export default schema;