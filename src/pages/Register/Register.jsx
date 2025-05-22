import { useState, useEffect } from 'react';
import './Register.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "./schemaValidations";
import userServices from '../../services/apiUsers';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Register = () => {

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })

    const uploadToCloudinary = async (file, folder) => {
        const cloudName = 'dp5ykchgc';
        const uploadPreset = 'photos';

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', `photos/${folder}`);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error.message || 'Error subiendo a Cloudinary');
        return data.secure_url;
    };

    const onSubmit = async (dataRegisterUser) => {
        try {
            setLoading(true);
            let imageUrl = '';

            if (dataRegisterUser.file) {
                imageUrl = await uploadToCloudinary(dataRegisterUser.file, 'users');
            }

            const formData = new FormData();
            formData.append('name', dataRegisterUser.name);
            formData.append('mail', dataRegisterUser.mail);
            formData.append('role', 'usuario');
            formData.append('photo', imageUrl);
            formData.append('weight', dataRegisterUser.weight);
            formData.append('height', dataRegisterUser.height);
            formData.append('activity', dataRegisterUser.activity);
            formData.append('pass', dataRegisterUser.pass);

            let datosRegister = await userServices.registerUser(formData);
            console.log(datosRegister);

            Swal.fire({
                title: '¡Añadido!',
                text: 'Usuario creado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/');
            });

        } catch (error) {
            if (error.response?.data?.code === 11000) {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (errorMessage) {
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }, [errorMessage]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Crear nueva cuenta de cliente</h1>
            <div className='registroDiv'>

                {loading && (
                    <div className='spinerLoading'>
                        <ClipLoader color="#36d7b7" size={50} />
                    </div>
                )}

                <div className='registerForm'>
                    <h2>Información Personal</h2>
                    <div className='divPersonalInfo'>
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => setValue('file', e.target.files[0])}
                            disabled={loading}
                        />
                        {errors.file && <p className="form-error">{errors.file.message}</p>}

                        <input
                            {...register('name')}
                            type="text"
                            placeholder="Nombre"
                            disabled={loading}
                        />
                        {errors.name && <p className="form-error">{errors.name.message}</p>}

                        <input
                            {...register('mail')}
                            type="email"
                            placeholder="Mail"
                            disabled={loading}
                        />
                        {errors.mail && <p className="form-error">{errors.mail.message}</p>}

                        <input
                            {...register('height')}
                            type="number"
                            placeholder="Altura en cm"
                            disabled={loading}
                        />
                        <input
                            {...register('weight')}
                            type="number"
                            placeholder="Peso en kg"
                            disabled={loading}
                        />
                        <select {...register('activity')} disabled={loading}>
                            <option value="">Selecciona una opción</option>
                            <option value="low">Poca</option>
                            <option value="medium">Media</option>
                            <option value="high">Alta</option>
                        </select>
                        {errors.activity && <p className="form-error">{errors.activity.message}</p>}
                    </div>
                    <h2>Contraseña</h2>
                    <div className='divPass'>
                        <input
                            {...register('pass')}
                            type="password"
                            placeholder="Contraseña"
                            disabled={loading}
                        />
                        <input
                            {...register('passSecond')}
                            type="password"
                            placeholder="Repetir contraseña"
                            disabled={loading}
                        />
                        {errors.passSecond && <p className="form-error">{errors.passSecond.message}</p>}
                    </div>
                    <div className='divConfirm'>
                        <button className="btnRegister submit" disabled={loading}>
                            {loading ? 'Registrando...' : 'Registrarme'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Register;
