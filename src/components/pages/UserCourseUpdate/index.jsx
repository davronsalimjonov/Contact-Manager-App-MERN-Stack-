import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import { STUDENTS_STATUS_OPTIONS } from '@/constants';
import { ENGLISH_LEVEL_OPTIONS } from '@/constants/form';
import Button from '@/components/UI/atoms/Buttons/Button';
import RedButton from '@/components/UI/atoms/Buttons/RedButton';
import FormInput from '@/components/UI/moleculs/Form/FormInput';
import FormSelect from '@/components/UI/moleculs/Form/FormSelect';
import { useGetCourses, useGetUserCourseById, useUserCourseMutations } from '@/hooks/useUserCourse';
import FormPasswordInput from '@/components/UI/moleculs/Form/FormPasswordInput';
import cls from './UserCourseUpdate.module.scss';
import FormDatepicker from '@/components/UI/moleculs/Form/FormDatepicker';

const UserCourseUpdate = () => {
    const { userCourseId } = useParams()
    const { data: courses, isLoading: isLoadingCourses } = useGetCourses()
    const { data: userCourse, isLoading } = useGetUserCourseById(userCourseId)
    const { updateMutation } = useUserCourseMutations(userCourseId)
    const { register, reset, control, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm()

    const sanitizeData = (userCourse) => ({
        course: userCourse?.course?.id,
        login: userCourse?.login,
        password: userCourse?.password,
        status: userCourse?.status,
        level: userCourse?.level,
        startDate: userCourse?.startDate,
        endDate: userCourse?.endDate
    })

    useEffect(() => {
        if (userCourse && courses) {
            reset(sanitizeData(userCourse))
        }
    }, [isLoading, isLoadingCourses])

    const handleUpdateUserCourse = async (data) => {
        await updateMutation.mutateAsync(data, {
            onSuccess: (res) => {
                reset(sanitizeData(res))
                toast.success('Malumotlar saqlandi')
            },
            onError: (res) => toast.error(res?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        !isLoading ? (
            <div className={cls.page}>
                <form className={cls.page__form} onSubmit={handleSubmit(handleUpdateUserCourse)}>
                    <div className={cls.page__form__elements}>
                        <FormSelect
                            label='Kursni tanlang'
                            placeholder='Kursni tanlang'
                            options={courses?.map(course => ({ value: course.id, label: course.title }))}
                            control={control}
                            name='course'
                            rules={{ required: 'Kursni tanlang' }}
                            error={errors?.course?.message}
                        />
                        <FormInput
                            label='Login'
                            placeholder='Login'
                            register={register('login')}
                            error={errors?.login?.message}
                        />
                        <FormPasswordInput
                            label='Parol'
                            placeholder='Parol'
                            register={register('password')}
                            error={errors?.password?.message}
                        />
                        <FormSelect
                            label='Foydalanuvchi statusi'
                            placeholder='Foydalanuvchi statusi'
                            options={STUDENTS_STATUS_OPTIONS}
                            control={control}
                            name='status'
                            error={errors?.status?.message}
                        />
                        <FormSelect
                            label='Level'
                            placeholder='Level'
                            options={ENGLISH_LEVEL_OPTIONS}
                            control={control}
                            name='level'
                            error={errors?.level?.message}
                        />
                        <FormDatepicker 
                            label='Boshlanish sanasi'
                            placeholder='Boshlanish sanasi'
                            control={control}
                            name='startDate'
                            error={errors?.startDate?.message}
                        />
                        <FormDatepicker 
                            label='Tugash sanasi'
                            placeholder='Tugash sanasi'
                            control={control}
                            name='endDate'
                            error={errors?.endDate?.message}
                        />
                    </div>
                    <div className={cls.page__form__buttons}>
                        <Button
                            type='submit'
                            isLoading={isSubmitting}
                            disabled={!isDirty}
                        >
                            Saqlash
                        </Button>
                        <RedButton onClick={() => reset(sanitizeData(userCourse))}>Bekor qilish</RedButton>
                    </div>
                </form>
            </div>
        ) : (
            <Loader />
        )
    );
}

export default UserCourseUpdate;