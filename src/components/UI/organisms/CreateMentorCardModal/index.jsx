import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useCreateMentorCardMutation } from '@/hooks/useMentorCard';
import Dialog from '../../moleculs/Dialog';
import { CloseIcon } from '../../atoms/icons';
import Button from '../../atoms/Buttons/Button';
import FormSelect from '../../moleculs/Form/FormSelect';
import FormTextArea from '../../moleculs/Form/FormTextArea';
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup';
import cls from './CreateMentorCardModal.module.scss';
import { MENTOR_CARDS_ENUM } from '@/constants/enum';

const CreateMentorCardModal = ({
    mentorId,
    isOpen = false,
    onClose
}) => {
    const createMentorCardMutation = useCreateMentorCardMutation()
    const { register, control, watch, unregister, handleSubmit, reset, formState: { errors, isDirty, isSubmitting } } = useForm()
    const type = watch('type')

    useEffect(() => {
        if (type === MENTOR_CARDS_ENUM.WARNING) {
            unregister('amount')
        }
    }, [type])

    const handleClose = () => {
        onClose?.()
        setTimeout(reset, 300)
    }

    const handleSubmitForm = async (data) => {
        await createMentorCardMutation.mutateAsync({...data, mentor: mentorId}, {
            onSuccess: () => {
                toast.success('Kartochka qoshildi')
                handleClose()
            },
            onError: (res) => toast.error(res?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <Dialog isOpen={isOpen} onClose={handleClose}>
            <form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
                <div className={cls.form__header}>
                    <h2 className={cls.form__header__title}>Bonus/jarima yaratish</h2>
                    <button onClick={handleClose} type='button'><CloseIcon /></button>
                </div>
                <FormRadioGroup
                    name='type'
                    register={register('type', { required: 'Turi tanlang' })}
                    options={[
                        { label: 'Bonus', value: MENTOR_CARDS_ENUM.BONUS },
                        { label: 'Jarima', value: MENTOR_CARDS_ENUM.FINE },
                        { label: 'Ogohlantirish', value: MENTOR_CARDS_ENUM.WARNING }
                    ]}
                    error={errors?.type?.message}
                />
                {type !== MENTOR_CARDS_ENUM.WARNING && (
                    <FormSelect
                        label='Summa'
                        name='amount'
                        control={control}
                        placeholder='Summani tanlang'
                        options={[
                            { value: 50000, label: '50 000 UZS' },
                            { value: 100000, label: '100 000 UZS' },
                            { value: 150000, label: '150 000 UZS' },
                            { value: 200000, label: '200 000 UZS' },
                        ]}
                        rules={{ required: 'Summa tanlang' }}
                        error={errors?.amount?.message}
                    />
                )}
                <FormTextArea
                    label='Izoh'
                    placeholder='Izohni yozing'
                    register={register('description', { required: 'Izoh kiritilishi shart' })}
                    error={errors?.description?.message}
                />
                <Button 
                    type='submit' 
                    disabled={!isDirty} 
                    isLoading={isSubmitting}
                >
                    Yaratish
                </Button>
            </form>
        </Dialog>
    );
}

export default CreateMentorCardModal;