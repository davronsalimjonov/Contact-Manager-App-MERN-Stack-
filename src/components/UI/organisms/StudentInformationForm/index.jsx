import { useEffect, useState } from 'react';
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

const StudentInformationForm = ({
    defaultValues,
    onSubmit
}) => {
    const navigate = useNavigate()
    const [isEditable, setIsEditable] = useState(false)
    const { register, control, reset, watch, handleSubmit, setValue, getValues, formState: { isDirty, errors, isSubmitting, isSubmitSuccessful } } = useForm({
        defaultValues,
        mode: 'onSubmit',
        resolver: yupResolver(studentInfoSchema)
    })

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValues)
        }
    }, [isSubmitSuccessful])

    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.form__header}>
                <button
                    type='button'
                    onClick={() => navigate(-1)}
                    className={cls.form__header__btn}
                >
                    <LeftArrowIcon />
                </button>
                <AvatarUpload
                    defaultValue={getValues('avatar')}
                    disabled={!isEditable}
                    onChange={file => setValue('avatar', file, { shouldDirty: true, shouldValidate: true })}
                    onDelete={() => setValue('avatar', null, { shouldDirty: true })}
                />
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
                    disabled={!isEditable}
                    register={{ ...register('firstName') }}
                    error={errors?.firstName?.message}
                />
                <FormInput
                    label='Familyasi'
                    placeholder='Familyasi'
                    disabled={!isEditable}
                    register={{ ...register('lastName') }}
                    error={errors?.lastName?.message}
                />
                <FormPhoneInput
                    name='phone'
                    placeholder='+998'
                    label='Telefon nomer'
                    disabled={!isEditable}
                    control={control}
                    error={errors?.phone?.message}
                />
                <FormDatepicker
                    name='birthday'
                    label='Tug’ilgan sanasi'
                    placeholder='Tug’ilgan sanasi'
                    disabled={!isEditable}
                    control={control}
                    error={errors?.birthday?.message}
                />
                <FormRadioGroup
                    label='Jinsi'
                    disabled={!isEditable}
                    options={GENDER_OPTIONS}
                    register={{ ...register('gender') }}
                    error={errors?.gender?.message}
                />
                <FormInput
                    label='Ro’yxatdan o’tgan sanasi'
                    placeholder='Ro’yxatdan o’tgan sanasi'
                    disabled
                    register={{ ...register('createdAt') }}
                />
                <Button
                    type='submit'
                    isLoading={isSubmitting}
                    disabled={!isEditable || !isDirty}
                >
                    Tahrirlash
                </Button>
                <RedButton
                    disabled={!isDirty || !isEditable}
                    onClick={() => reset(defaultValues)}
                >
                    Bekor qilish
                </RedButton>
            </div>
        </form>
    );
}

export default StudentInformationForm;