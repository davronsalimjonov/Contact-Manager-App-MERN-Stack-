import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/utils/lib';
import { getDayName } from '@/utils/time';
import { useGetUserId } from '@/hooks/useGetUser';
import { GENDER_OPTIONS } from '@/constants/form';
import { updateUserCourse } from '@/services/course';
import { studentInfoSchema } from '@/schemas/student';
import Dialog from '../../moleculs/Dialog';
import Button from '../../atoms/Buttons/Button';
import FormInput from '../../moleculs/Form/FormInput';
import RedButton from '../../atoms/Buttons/RedButton';
import AvatarUpload from '../../moleculs/AvatarUpload';
import FormDatepicker from '../../moleculs/Form/FormDatepicker';
import FormPhoneInput from '../../moleculs/Form/FormPhoneInput';
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup';
import ConnectionTimeFormPopup from '../ConnectionTimeFormPopup';
import { EditIcon, LeftArrowIcon, PlusIcon } from '../../atoms/icons';
import cls from './MentorInformationForm.module.scss';

const MentorInformationForm = ({
    courseId = '',
    connectionDays = [],
    connectionTime = '',
    defaultValues,
    onSubmit
}) => {
    const userId = useGetUserId()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isEditable, setIsEditable] = useState(false)
    const { register, control, reset, watch, handleSubmit, setValue, getValues, formState: { isDirty, errors, isSubmitting, isSubmitSuccessful } } = useForm({
        defaultValues,
        mode: 'onSubmit',
        resolver: yupResolver(studentInfoSchema)
    })
    const avatar = watch('avatar')
    const connectionTimesLabel = [
        `${connectionDays?.length > 0 ? `${connectionDays?.map(day => getDayName(day, 'short')).join(', ')} kunlari` : ''}`,
        `${connectionTime ? `${connectionTime} oralig’ida` : ''}`
    ].filter(text => text).join('; ')

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValues)
        }
    }, [isSubmitSuccessful])

    const handleUpdateConnectionTimes = async (data) => {
        try {
            data.days = data?.days?.sort((a, b) => a - b)
            await updateUserCourse(id, data)
            queryClient.setQueryData(['user-course', id], oldData => ({ ...oldData, ...data }))
            queryClient.setQueryData(['students', userId], oldData => ({
                ...oldData,
                pages: oldData?.pages?.map(page => ({
                    ...page,
                    items: page.items?.map(item => {
                        if(item.id === id){
                            item.days = data.days
                            item.connectionTime = data.connectionTime 
                        }
                        return item
                    })
                }))
            }))
            toast.success("Bog'lanish vaqti o'zgartirildi!")
            setIsOpenDialog(false)
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    return (
        <>
            <Dialog isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
                <ConnectionTimeFormPopup
                    onSubmit={handleUpdateConnectionTimes}
                    defaultValues={{ days: connectionDays, connectionTime }}
                />
            </Dialog>
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
                    <FormInput
                        label='Bog’lanish kunlari'
                        placeholder='Bog’lanish kunlarini kiriting'
                        value={connectionTimesLabel}
                        readOnly
                        preffix={(
                            <button
                                type='button'
                                className={cls.form__elements__btn}
                                onClick={() => setIsOpenDialog(true)}
                            >
                                {connectionTimesLabel ? <EditIcon /> : <PlusIcon fill='#5F6C86' />}
                            </button>
                        )}
                    />
                    <span></span>
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
        </>
    );
}

export default MentorInformationForm;