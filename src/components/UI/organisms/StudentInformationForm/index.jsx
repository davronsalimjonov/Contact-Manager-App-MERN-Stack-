import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { getDayName } from '@/utils/time';
import { updateUser } from '@/services/user';
import { useGetUserId } from '@/hooks/useGetUser';
import { GENDER_OPTIONS } from '@/constants/form';
import { cn, objectToFormData } from '@/utils/lib';
import { updateUserCourse } from '@/services/course';
import { studentInfoSchema } from '@/schemas/student';
import useGetStudentCourseById from '@/hooks/useGetStudentCourseById';
import Loader from '../../atoms/Loader';
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
import cls from './StudentInformationForm.module.scss';

const StudentInformationForm = ({ courseId = '' }) => {
    const userId = useGetUserId()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [isEditable, setIsEditable] = useState(false)
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const { data: course, isLoading: isLoadingStudent } = useGetStudentCourseById(courseId)
    const { register, control, reset, watch, handleSubmit, setValue, formState: { isDirty, errors, isSubmitting } } = useForm({ mode: 'onSubmit', resolver: yupResolver(studentInfoSchema) })
    const avatar = watch('avatar')
    const student = course?.user
    const defaultValues = {
        id: student?.id,
        avatar: student?.url,
        firstName: student?.firstName,
        lastName: student?.lastName,
        phone: student?.phone,
        birthday: student?.birthday,
        gender: String(student?.gender),
        createdAt: student?.createdAt ? dayjs(student?.createdAt).format('DD.MM.YYYY') : ''
    }
    const connectionDays = course?.days
    const connectionTime = course?.connectionTime
    const defaultConnectionTimes = { days: connectionDays, connectionTime }
    const connectionTimesLabel = [
        `${connectionDays?.length > 0 ? `${connectionDays?.map(day => getDayName(day, 'short')).join(', ')} kunlari` : ''}`,
        `${connectionTime ? `${connectionTime} oralig’ida` : ''}`
    ].filter(text => text).join('; ')

    useEffect(() => {
        if (!isLoadingStudent) {
            reset(defaultValues)
        }
    }, [isLoadingStudent])

    const handleUpdateUser = async (data) => {
        try {
            const updatedUserInfo = Object.assign({}, data)
            const studentId = updatedUserInfo?.id
            delete updatedUserInfo.id
            delete updatedUserInfo.createdAt
            updatedUserInfo.phone = updatedUserInfo.phone
            updatedUserInfo.gender = String(updatedUserInfo.gender)

            if (!updatedUserInfo?.birthday) delete updatedUserInfo.birthday
            if (!(updatedUserInfo?.avatar instanceof File) && updatedUserInfo?.avatar !== null) delete updatedUserInfo.avatar

            const fd = objectToFormData(updatedUserInfo)

            const updatedUser = await updateUser(studentId, fd)
            queryClient.setQueryData(['user-course', courseId], (oldData) => ({ ...oldData, user: updatedUser }))
            queryClient.setQueriesData(['students'], oldData => {
                return oldData?.map(item => {
                    if (item?.id === courseId) {
                        delete updatedUser.id
                        item = { ...item, ...updatedUser }
                    }
                    return item
                })
            })
            
            setIsEditable(false)
            toast.success("Malumotlar o'zgartirildi")
        } catch (error) {
            const res = error?.response?.data
            toast.error(res?.message || error?.message || 'Xatolik yuz berdi')
        }
    }

    const handleUpdateConnectionTimes = async (data) => {
        try {
            data.days = data?.days?.sort((a, b) => a - b)
            const updatedUser = await updateUserCourse(courseId, data)
            queryClient.setQueryData(['user-course', courseId], oldData => ({ ...oldData, ...data }))
            queryClient.setQueriesData(['students', userId], oldData => {
                return oldData?.map(item => {
                    if (item?.id === courseId) {
                        item = { ...item, days: updatedUser?.days, connectionTime: updatedUser?.connectionTime }
                    }
                    return item
                })
            })
            toast.success("Bog'lanish vaqti o'zgartirildi!")
            setIsOpenDialog(false)
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    return isLoadingStudent ? (
        <Loader className={cls.loader} />
    ) : (
        <>
            <Dialog isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
                <ConnectionTimeFormPopup
                    onSubmit={handleUpdateConnectionTimes}
                    defaultValues={defaultConnectionTimes}
                />
            </Dialog>
            <form className={cls.form} onSubmit={handleSubmit(handleUpdateUser)}>
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
                        readOnly
                        placeholder='Bog’lanish kunlarini kiriting'
                        value={connectionTimesLabel}
                        disabled={!isEditable}
                        preffix={(
                            <button
                                type='button'
                                className={cls.form__elements__btn}
                                onClick={() => setIsOpenDialog(true)}
                                disabled={!isEditable}
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

export default StudentInformationForm;