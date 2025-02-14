import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { LESSON_TIME_OPTIONS, WEEKDAY_OPTIONS } from '@/constants/form';
import { useCreateLessonScheduleMutation, useGetGroupLessonsSchedule } from '@/hooks/useLessonsSchedule';
import Dialog from '../../moleculs/Dialog';
import { CloseIcon } from '../../atoms/icons';
import Button from '../../atoms/Buttons/Button';
import FormSelect from '../../moleculs/Form/FormSelect';
import cls from './CreateScheduleFormModal.module.scss';

const isTimeSlotAvailable = (timeValue, lessons, weekday) => {
    if (!weekday) return false;
    return !lessons?.filter(lesson => lesson.weekday === weekday)?.some(lesson => {
        return timeValue >= lesson.startTime && timeValue < lesson.endTime;
    });
};

const filterTimeOptions = (lessons, weekday) => {
    return LESSON_TIME_OPTIONS.filter(option => {
        return isTimeSlotAvailable(option.value, lessons, weekday);
    });
};

const filterEndTimeOptions = (selectedStartTime, lessons, weekday) => {
    if (!weekday || isNaN(selectedStartTime)) return [];
    return LESSON_TIME_OPTIONS.filter(option => {
        if (option.value <= selectedStartTime) {
            return false;
        }

        const isSlotFree = lessons.every(lesson => {
            if (option.value > lesson.startTime && option.value <= lesson.endTime && lesson.weekday === weekday) {
                return false;
            }
            if (selectedStartTime < lesson.startTime && option.value >= lesson.endTime && lesson.weekday === weekday) {
                return false;
            }
            return true;
        });

        return isSlotFree;
    });
};

const CreateScheduleFormModal = ({
    groupId,
    isOpen,
    onClose
}) => {
    const { control, handleSubmit, watch, reset, formState: { isSubmitting, isValid, isDirty } } = useForm()
    const { data: lessons } = useGetGroupLessonsSchedule(groupId)
    const createScheduleMutation = useCreateLessonScheduleMutation()
    const selectedWeekday = watch('weekday')
    const selectedStartTime = watch('startTime')

    const handleCreateSchedule = async (data) => {
        data.group = groupId
        await createScheduleMutation.mutateAsync(data, {
            onSuccess: () => {
                toast.success('Dars jadval muvaffaqiyatli qo’shildi')
                reset({})
                onClose()
            },
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmit(handleCreateSchedule)}>
                <div className={cls.form__header}>
                    <span className={cls.form__header__title}>Dars jadval qo’shish</span>
                    <button type='button' onClick={onClose}><CloseIcon /></button>
                </div>
                <FormSelect
                    label='Hafta kunini tanlang'
                    placeholder='Tanlang'
                    options={WEEKDAY_OPTIONS}
                    control={control}
                    name='weekday'
                    rules={{ required: 'Hafta kunini tanlang' }}
                />
                <FormSelect
                    label='Start time'
                    placeholder='Tanlang'
                    options={filterTimeOptions(lessons?.items, selectedWeekday)}
                    control={control}
                    name='startTime'
                    isSearchable
                    rules={{ required: 'Dars boshlash vaqtini tanlang' }}
                />
                <FormSelect
                    label='End time'
                    placeholder='Tanlang'
                    options={filterEndTimeOptions(selectedStartTime, lessons?.items, selectedWeekday)}
                    control={control}
                    name='endTime'
                    isSearchable
                    rules={{ required: 'Dars tugash vaqtini tanlang' }}
                />
                <Button type='submit' isLoading={isSubmitting} disabled={!isValid || !isDirty}>Qo’shish</Button>
            </form>
        </Dialog>
    );
}

export default CreateScheduleFormModal;