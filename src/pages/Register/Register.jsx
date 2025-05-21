import { useState } from 'react';
import './Register.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "./schemaValidations";
import userServices from '../../services/apiUsers';
import Error from '../../components/Error/Error';


const Register = () => {

    const [errorMessage, setErrorMessage] = useState('');

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
        } catch (error) {
            if (error.response.data.code === 11000) {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message)
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Crear nueva cuenta de cliente</h1>
            <div className='registroDiv'>
                <div className='registerForm'>
                    <h2>Información Personal</h2>
                    <div className='divPersonalInfo'>
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => setValue('file', e.target.files[0])}
                        />
                        {errors.file && <p className="form-error">{errors.file.message}</p>}

                        <input
                            {...register('name')}
                            type="text"
                            placeholder="Nombre"
                        />
                        {errors.name && <p className="form-error">{errors.name.message}</p>}

                        <input
                            {...register('mail')}
                            type="email"
                            placeholder="Mail"
                        />
                        {errors.mail && <p className="form-error">{errors.mail.message}</p>}

                        <input
                            {...register('height')}
                            type="number"
                            placeholder="Altura en cm"
                        />
                        <input
                            {...register('weight')}
                            type="number"
                            placeholder="Peso en kg"
                        />
                        <select {...register('activity')}>
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
                        />
                        <input
                            {...register('passSecond')}
                            type="password"
                            placeholder="Repetir contraseña"
                        />
                        {errors.passSecond && <p className="form-error">{errors.passSecond.message}</p>}
                    </div>
                    <div className='divConfirm'>
                        <button className="btnRegister submit">Registrarme</button>
                    </div>
                    {errorMessage && <Error errorMessage={errorMessage} clearError={() => setErrorMessage('')}
                    />}
                </div>
            </div>
        </form>
    );
}

export default Register