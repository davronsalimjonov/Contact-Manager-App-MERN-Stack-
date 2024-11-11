import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/utils/lib';
import { GENDER_OPTIONS } from '@/constants/form';
import { studentInfoSchema } from '@/schemas/student';
import Button from '../../atoms/Buttons/Button';
import FormInput from '../../moleculs/Form/FormInput';
import RedButton from '../../atoms/Buttons/RedButton';
import AvatarUpload from '../../moleculs/AvatarUpload';
import { EditIcon, LeftArrowIcon } from '../../atoms/icons';
import FormDatepicker from '../../moleculs/Form/FormDatepicker';
import FormPhoneInput from '../../moleculs/Form/FormPhoneInput';
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup';
import cls from './StudentInformationForm.module.scss';

const StudentInformationForm = () => {
    const navigate = useNavigate()
    const [isEditable, setIsEditable] = useState(false)
    const { register, watch, control, reset, handleSubmit, formState: { isValid, isDirty, errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(studentInfoSchema)
    })
    console.log(watch());
    console.log(errors);
    
    return (
        <form className={cls.form} onSubmit={handleSubmit(console.log)}>
            <div className={cls.form__header}>
                <button
                    type='button'
                    onClick={() => navigate(-1)}
                    className={cls.form__header__btn}
                >
                    <LeftArrowIcon />
                </button>
                <AvatarUpload />
                <button
                    type='button'
                    className={cn(cls.form__header__btn, isEditable && cls.form__header__btn__edit)}
                    onClick={() => setIsEditable(state => !state)}
                >
                    <EditIcon />
                </button>
            </div>
            <div className={cls.form__elements}>
                <FormInput
                    label='Ismi'
                    placeholder='Ismi'
                    readOnly={!isEditable}
                    register={{ ...register('firstName') }}
                    error={errors?.firstName?.message}
                />
                <FormInput
                    label='Familyasi'
                    placeholder='Familyasi'
                    readOnly={!isEditable}
                    register={{ ...register('lastName') }}
                    error={errors?.lastName?.message}
                />
                <FormPhoneInput
                    name='phone'
                    placeholder='+998'
                    label='Telefon nomer'
                    readOnly={!isEditable}
                    control={control}
                    error={errors?.phone?.message}
                />
                <FormDatepicker
                    label='Tug’ilgan sanasi'
                    placeholder='Tug’ilgan sanasi'
                    readOnly={!isEditable}
                // error={errors?.firstName?.message}
                />
                <FormRadioGroup
                    label='Jinsi'
                    // name='gender'
                    disabled={!isEditable}
                    options={GENDER_OPTIONS}
                    register={{ ...register('gender', { valueAsNumber: true }) }}
                    error={errors?.gender?.message}
                />
                <FormInput
                    label='Ro’yxatdan o’tgan sanasi'
                    placeholder='Ro’yxatdan o’tgan sanasi'
                    disabled
                />
                <Button
                    type='submit'
                    disabled={!isEditable || !isDirty}
                >
                    Tahrirlash
                </Button>
                <RedButton
                    disabled={!isDirty || !isEditable}
                    onClick={() => reset()}
                >
                    Bekor qilish
                </RedButton>
            </div>
        </form>
    );
}

export default StudentInformationForm;