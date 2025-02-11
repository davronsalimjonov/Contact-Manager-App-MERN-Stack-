import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mentorSchema } from '@/schemas/employee';
import { ENGLISH_LEVEL_OPTIONS, GENDER_OPTIONS, MENTOR_TYPES } from '@/constants/form';
import Button from '../../atoms/Buttons/Button';
import FormInput from '../../moleculs/Form/FormInput';
import RedButton from '../../atoms/Buttons/RedButton';
import AvatarUpload from '../../moleculs/AvatarUpload';
import FormDatepicker from '../../moleculs/Form/FormDatepicker';
import FormPhoneInput from '../../moleculs/Form/FormPhoneInput';
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup';
import FormSelect from '../../moleculs/Form/FormSelect';
import cls from './MentorInformationForm.module.scss';

const MentorInformationForm = ({
    defaultValues,
    onSubmit
}) => {
    const { register, control, reset, watch, handleSubmit, setValue, formState: { isDirty, errors, isSubmitting, isSubmitSuccessful } } = useForm({ defaultValues, mode: 'onSubmit', resolver: yupResolver(mentorSchema) })
    const avatar = watch('avatar')

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValues)
        }
    }, [isSubmitSuccessful])

    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.form__container}>
                <div className={cls.form__header}>
                    <AvatarUpload
                        value={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
                        onChange={file => setValue('avatar', file, { shouldDirty: true, shouldValidate: true })}
                        onDelete={() => setValue('avatar', null, { shouldDirty: true, shouldValidate: true })}
                    />
                </div>
                <div className={cls.form__elements}>
                    <FormInput
                        label='Ismi'
                        placeholder='Ismi'
                        register={{ ...register('firstName') }}
                        error={errors?.firstName?.message}
                    />
                    <FormInput
                        label='Familyasi'
                        placeholder='Familyasi'
                        register={{ ...register('lastName') }}
                        error={errors?.lastName?.message}
                    />
                    <FormPhoneInput
                        name='phone'
                        placeholder='+998'
                        label='Telefon nomer'
                        control={control}
                        error={errors?.phone?.message}
                    />
                    <FormDatepicker
                        name='birthday'
                        label='Tug’ilgan sanasi'
                        placeholder='Tug’ilgan sanasi'
                        control={control}
                        error={errors?.birthday?.message}
                    />
                    <FormRadioGroup
                        label='Jinsi'
                        options={GENDER_OPTIONS}
                        register={{ ...register('gender') }}
                        error={errors?.gender?.message}
                    />
                    <FormSelect
                        label='Til bilish darajasi'
                        placeholder="Darajani tanlang"
                        options={ENGLISH_LEVEL_OPTIONS}
                        control={control}
                        name='degree'
                        isclearable
                        error={errors?.degree?.message}
                    />
                    <FormInput
                        label='SIP raqami'
                        placeholder='SIP raqami'
                        type='number'
                        register={register('sip')}
                        error={errors?.sip?.message}
                    />
                    <FormSelect
                        label='Mentor'
                        placeholder="Mentorni Tanlang"
                        options={MENTOR_TYPES}
                        control={control}
                        name='role'
                        error={errors?.role?.message}
                    />
                </div>
                <div className={cls.form__buttons}>
                    <Button
                        type='submit'
                        isLoading={isSubmitting}
                        disabled={!isDirty}
                    >
                        Tahrirlash
                    </Button>
                    <RedButton
                        disabled={!isDirty}
                        type='button'
                        onClick={reset}
                    >
                        Bekor qilish
                    </RedButton>
                </div>
            </div>
        </form>
    );
}

export default MentorInformationForm;