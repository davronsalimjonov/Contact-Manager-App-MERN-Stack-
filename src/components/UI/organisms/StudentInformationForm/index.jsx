import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/lib';
import { GENDER_OPTIONS } from '@/constants/form';
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
    const { register, watch, control, reset, formState: { isValid, isDirty } } = useForm()
    console.log(watch());

    return (
        <form className={cls.form}>
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
                />
                <FormInput
                    label='Familyasi'
                    placeholder='Familyasi'
                    readOnly={!isEditable}
                    register={{ ...register('lastName') }}
                />
                <FormPhoneInput
                    label='Telefon nomer'
                    placeholder='+998'
                    name='phone'
                    readOnly={!isEditable}
                    control={control}
                />
                <FormDatepicker
                    label='Tug’ilgan sanasi'
                    placeholder='Tug’ilgan sanasi'
                    readOnly={!isEditable}
                />
                <FormRadioGroup
                    label='Jinsi'
                    name='gender'
                    disabled={!isEditable}
                    options={GENDER_OPTIONS}
                    register={{ ...register('gender', { valueAsNumber: true }) }}
                />
                <FormInput
                    label='Ro’yxatdan o’tgan sanasi'
                    placeholder='Ro’yxatdan o’tgan sanasi'
                    disabled
                />
                <Button
                    type='submit'
                    disabled={!isEditable || !isValid || !isDirty}
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