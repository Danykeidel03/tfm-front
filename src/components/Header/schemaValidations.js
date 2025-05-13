import * as yup from 'yup'

const schema = yup.object({
    mail: yup
        .string()
        .required('El mail es obligatorio')
        .email('Debe ser mail valido'),

    pass: yup
        .string()
        .required('La contraseña es obligatoria'),
})

export default schema;