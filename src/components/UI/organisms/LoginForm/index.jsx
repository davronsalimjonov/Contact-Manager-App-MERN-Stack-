import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { login } from '@/services/auth';
import { customToast } from '@/utils/toast';
import useAuth from '@/store/auth/auth.thunk';
import Tabs from '../../moleculs/Tabs';
import Button from '../../atoms/Buttons/Button';
import FormInput from '../../moleculs/Form/FormInput';
import FormPhoneInput from '../../moleculs/Form/FormPhoneInput';
import FormPasswordInput from '../../moleculs/Form/FormPasswordInput';
import cls from './LoginForm.module.scss';
import { USER_ROLES } from '@/constants';

const LoginForm = () => {
    const authState = useAuth()
    const queryClient = useQueryClient()
    const [savedErrors, setSavedErrors] = useState({});
    const [authStrategy, setAuthStrategy] = useState('phone')
    const { register, control, handleSubmit, clearErrors, setError, formState: { errors, isDirty, isSubmitting } } = useForm({ mode: 'onSubmit' })

    const handleChangeTab = (value) => {
        setSavedErrors((prevErrors) => ({ ...prevErrors, [authStrategy]: errors?.[authStrategy]?.message }));
        setAuthStrategy(value)
        clearErrors(authStrategy)
        if (savedErrors[value]) {
            setError(value, { message: savedErrors[value] });
        }
    }

    const handleLogin = async (data) => {
        try {
            const userLogin = authStrategy === 'phone' ? data.phone : data.email
            const body = { password: data.password, login: userLogin }
            const res = await login(body)

            localStorage.setItem('access-token', JSON.stringify(res.accessToken))
            localStorage.setItem('refresh-token', JSON.stringify(res.refreshToken))

            if(res?.user?.role === USER_ROLES.CALL_MENTOR || res?.user?.role === USER_ROLES.MAIN_MENTOR) {
                await queryClient.invalidateQueries(['user-info'])
            } else {
                queryClient.setQueryData(['user-info'], res?.user)
            }

            authState.login()
        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message)
        }

    }

    return (
        <form className={cls.form} onSubmit={handleSubmit(handleLogin)}>
            <h1 className={cls.form__title}>Kirish</h1>
            <Tabs
                className={cls.form__tabs}
                tabClassName={cls.form__tabs__btn}
                activeTabClassName={cls.form__tabs__active}
                options={[{ value: 'phone', label: 'Telefon nomer' }, { value: 'email', label: 'Email' }]}
                onChange={handleChangeTab}
            />
            <div className={cls.form__inputs}>
                {authStrategy === 'phone' && (
                    <FormPhoneInput
                        label='Telefon nomer'
                        placeholder='Telefon nomer'
                        control={control}
                        name='phone'
                        rules={{
                            required: { value: authStrategy === 'phone', message: 'Telefon raqamni kiriting' },
                            validate: (value) => value && isValidPhoneNumber(value) || "Telefon raqamni to'liq kiriting"
                        }}
                        error={errors?.phone?.message}
                        autoFocus
                    />
                )}
                {authStrategy === 'email' && (
                    <FormInput
                        label='Email'
                        placeholder='Emailni kiriting'
                        register={{
                            ...register('email', {
                                required: { value: authStrategy === 'email', message: "Emailni kiriting" },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Notog'ri email address"
                                }
                            })
                        }}
                        error={errors?.email?.message}
                        autoFocus
                    />
                )}
                <FormPasswordInput
                    label='Parol'
                    placeholder='Parolni kiriting'
                    register={{ ...register('password', { required: 'Parolni kiriting' }) }}
                    error={errors?.password?.message}
                />
                <Link className={cls.form__inputs__link} to=''>Parolni unitdingizmi?</Link>
            </div>
            <Button
                type='submit'
                className={cls.form__btn}
                disabled={!isDirty}
                isLoading={isSubmitting}
            >
                Kirish
            </Button>
        </form>
    );
}

export default LoginForm;