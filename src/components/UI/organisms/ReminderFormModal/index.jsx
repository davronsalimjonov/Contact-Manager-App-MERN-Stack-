import { useForm } from 'react-hook-form';
import Button from '../../atoms/Buttons/Button';
import Dialog from '../../moleculs/Dialog';
import FormDatepicker from '../../moleculs/Form/FormDatepicker';
import FormInput from '../../moleculs/Form/FormInput';
import { useCreateReminderMutation } from '@/hooks/useReminder';
import cls from './ReminderFormModal.module.scss';
import toast from 'react-hot-toast';

const ReminderFormModal = ({
    isOpen = false,
    onClose,
}) => {
    const createReminderMutation = useCreateReminderMutation()
    const { register, control, reset, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm()

    const handleClose = () => {
        onClose?.()
        setTimeout(() => reset(), 300)
    }

    const handleCreateReminder = async (data) => {
        data.type = 'notification'
        await createReminderMutation.mutateAsync(data, {
            onSuccess: () => {
                toast.success('Task yaratildi')
                handleClose()
            },
            onError: (res) => toast.error(res?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmit(handleCreateReminder)} >
                <h2 className={cls.form__title}>Task biriktirish</h2>
                <FormInput
                    label='Task nomi'
                    placeholder='Task nomi'
                    register={register('title', { required: 'Task nomi kiritilmadi' })}
                    error={errors?.title?.message}
                />
                <FormDatepicker
                    label='Vaqti'
                    placeholder='Vaqti'
                    showTimeInput
                    minDate={new Date()}
                    dateFormat='dd.MM.yyyy HH:mm'
                    control={control}
                    name='date'
                    error={errors?.date?.message}
                />
                <div className={cls.form__actions}>
                    <Button 
                        className={cls.form__actions__cancel} 
                        onClick={handleClose}
                    >
                        Bekor qilish
                    </Button>
                    <Button 
                        type='submit'
                        isLoading={isSubmitting}
                        disabled={!isDirty}
                    >
                        Saqlash
                    </Button>                    
                </div>
            </form>
        </Dialog>
    );
}

export default ReminderFormModal;