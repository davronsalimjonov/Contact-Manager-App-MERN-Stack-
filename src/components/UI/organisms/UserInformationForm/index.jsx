import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn, objectToFormData, removeEmptyKeys } from '@/utils/lib';
import { GENDER_OPTIONS } from '@/constants/form';
import { studentInfoSchema } from '@/schemas/student';
import { useGetUserById, useUpdateUserMutation } from '@/hooks/useUsers';
import Loader from '../../atoms/Loader';
import Button from '../../atoms/Buttons/Button';
import FormInput from '../../moleculs/Form/FormInput';
import RedButton from '../../atoms/Buttons/RedButton';
import AvatarUpload from '../../moleculs/AvatarUpload';
import FormDatepicker from '../../moleculs/Form/FormDatepicker';
import FormPhoneInput from '../../moleculs/Form/FormPhoneInput';
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup';
import { EditIcon, LeftArrowIcon } from '../../atoms/icons';
import cls from './UserInformationForm.module.scss';

const UserInformationForm = ({
    userId
}) => {
    const navigate = useNavigate()
    const [isEditable, setIsEditable] = useState(false)
    const updateUserMutation = useUpdateUserMutation()
    const { data: user, isLoading: isLoadingUser } = useGetUserById(userId)
    const { register, control, reset, watch, handleSubmit, setValue, formState: { isDirty, errors, isSubmitting } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(studentInfoSchema)
    })
    const avatar = watch('avatar')

    useEffect(() => {
        if (user) {
            const userFormData = {
                avatar: user?.url || '',
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                phone: user?.phone || '',
                secondPhone: user?.secondPhone || '',
                thirdPhone: user?.thirdPhone || '',
                birthday: user?.birthday || '',
                gender: String(user?.gender) || '',
                createdAt: user?.createdAt ? dayjs(user?.createdAt).format('DD.MM.YYYY') : ''
            }
            reset(userFormData)
        }
    }, [user])

    const onSubmit = async (data) => {
        const updatedUserInfo = Object.assign({}, data)
        delete updatedUserInfo.createdAt
        // updatedUserInfo.gender = String(updatedUserInfo.gender)

        if (!updatedUserInfo?.birthday) delete updatedUserInfo.birthday
        if (!(updatedUserInfo?.avatar instanceof File) && updatedUserInfo?.avatar !== null) delete updatedUserInfo.avatar

        const fd = objectToFormData(removeEmptyKeys({ ...updatedUserInfo, id: userId }))
        
        await updateUserMutation.mutateAsync(fd, {
            onSuccess: () => {
                toast.success('Malumotlar saqlandi')
                setIsEditable(false)
            },
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            {isLoadingUser ? (
                <Loader />
            ) : (
                <>
                    <div className={cls.form__header}>
                        <button
                            type='button'
                            onClick={() => navigate(-1)}
                            className={cls.form__header__btn}
                        >
                            <LeftArrowIcon />
                        </button>
                        <AvatarUpload
                            value={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
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
                        <FormPhoneInput
                            name='secondPhone'
                            placeholder='+998'
                            label='Qo`shimcha Telefon Nomer'
                            disabled={!isEditable}
                            control={control}
                            error={errors?.secondPhone?.message}
                        />
                        <FormPhoneInput
                            name='thirdPhone'
                            placeholder='+998'
                            label='Qo`shimcha Telefon Nomer*'
                            disabled={!isEditable}
                            control={control}
                            error={errors?.thirdPhone?.message}
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
                </>
            )}
        </form>
    );
}

export default UserInformationForm;