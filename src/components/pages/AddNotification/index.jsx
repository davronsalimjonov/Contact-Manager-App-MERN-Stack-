import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import cls from './AddNotification.module.scss';
import FormInput from '@/components/UI/moleculs/Form/FormInput';
import { ClockIcon, CloseIcon } from '@/components/UI/atoms/icons';
import FormTimeInput from '@/components/UI/moleculs/Form/FormTimeInput';
import Button from '@/components/UI/atoms/Buttons/Button';
import { STUDENTS_STATUS_OPTIONS } from '@/constants';
import FormSelect from '@/components/UI/moleculs/Form/FormSelect';
import FormDatepicker from '@/components/UI/moleculs/Form/FormDatepicker';
import { addNotification } from '@/services/notification';
import { notificationSchema } from '@/schemas/student';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { customToast } from '@/utils/toast';
import { queryClient } from '@/services/api';
import FormTextArea from '@/components/UI/moleculs/Form/FormTextArea';
import { useGetCourses } from '@/hooks/useUserCourse';

const AddNotification = () => {
    const { data: courses } = useGetCourses();
    const defaultValues = {
        title: "",
        description: "",
        time: "",
        startDate: "",
        endDate: "",
        course: "",
        status: "",
        isPro: "",
        login: ""
    }

    const navigate = useNavigate();

    const { register, control, reset, handleSubmit, formState: { isDirty, errors, isSubmitting } } = useForm({
        defaultValues,
        mode: 'onSubmit',
        resolver: yupResolver(notificationSchema)
    })

    const USER__TYPE = [
        {
            label: 'pro',
            value: 'pro',
        },
        {
            label: 'free',
            value: 'free',
        },
    ]

    const LOGIN__TYPE = [
        {
            label: '3 kun',
            value: '3',
        },
        {
            label: '5 kun',
            value: '5',
        },
        {
            label: '7 kun',
            value: '7',
        },
    ]

    const handleAddNotification = async (data) => {
        try {
            const condition = {
                startDate: data.startDate,
                endDate: data.endDate,
                course: data.course,
                status: data.status,
                isPro: data.isPro,
                login: data.login,
                level: data.level,
            }

            delete data.startDate;
            delete data.endDate,
                delete data.course,
                delete data.status,
                delete data.isPro,
                delete data.login,
                delete data.level,


                data.condition = condition;
            data.type = 'notification';
            data.isAuto = true;

            const addedNotification = await addNotification(data);


            queryClient.setQueriesData(['notification', 'notification'], oldData => {
                return {
                    ...oldData,
                    items: [...oldData?.items, addedNotification]
                }
            });

            reset(defaultValues);

            toast.success("Yangi eslatma qo'shildi")
        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')
        }
    }


    return (
        <div className={cls.notification}>
            <div className={cls.notification__header}>
                <h2 className={cls.notification__header__text}>Eslatmalar qo’shish</h2>
                <Button className={cls.notification__header__button} onClick={() => navigate(-1)} type='button'><CloseIcon /></Button>
            </div>
            <form className={cls.form} onSubmit={handleSubmit(handleAddNotification)}>
                <div className={cls.form__elements}>


                    <div className={cls.form__top}>
                        <FormInput
                            label='Eslatma nomi'
                            placeholder='Kiriting'
                            register={{ ...register('title') }}
                            error={errors?.title?.message}
                        />
                        <FormSelect
                            className={cls.filter__select}
                            label='Kursi'
                            control={control}
                            name='course'
                            options={courses?.map(course => ({ value: course.id, label: course.title }))}
                            isclearable={true}
                            placeholder='Kurslar bo’yicha'
                        />
                        <FormTimeInput
                            control={control}
                            label="Vaqt"
                            name="time"
                            register={{ ...register('time') }}
                            preffix={<ClockIcon />}
                            error={errors?.time?.message}
                        />
                    </div>
                    <div className={cls.form__dates}>
                        <FormDatepicker
                            name='startDate'
                            label='Registratsiya vaqti(...dan)'
                            placeholder='dd/mm/yy'
                            control={control}
                            error={errors?.startDate?.message}
                        />
                        <FormDatepicker
                            name='endDate'
                            label='Registratsiya vaqti(...gacha)'
                            placeholder='dd/mm/yy'
                            control={control}
                            error={errors?.endDate?.message}
                        />
                    </div>
                    <div className={cls.form__bottom}>
                        <FormSelect
                            className={cls.filter__select}
                            label='Statusi'
                            control={control}
                            name='status'
                            options={STUDENTS_STATUS_OPTIONS}
                            isclearable={true}
                            placeholder='Status user'
                        />

                        <FormSelect
                            label='User turi'
                            className={cls.filter__select}
                            control={control}
                            name='isPro'
                            options={USER__TYPE}
                            isclearable={true}
                            placeholder='User turi'
                        />

                        <FormSelect
                            label='Tizimga kirmagan'
                            className={cls.filter__select}
                            control={control}
                            name='login'
                            options={LOGIN__TYPE}
                            isclearable={true}
                            placeholder='Tanlang'
                        />

                    </div>
                    <FormTextArea
                        className={cls.form__input}
                        label='Matn'
                        register={{ ...register('description') }}
                        error={errors?.description?.message}
                    />
                    <Button
                        className={cls.form__button}
                        type='submit'
                        isLoading={isSubmitting}
                        disabled={!isDirty}
                    >Eslatma qo'shish</Button>  
                </div>
            </form>
        </div>
    );
}

export default AddNotification;