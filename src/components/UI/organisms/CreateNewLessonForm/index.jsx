import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useGetUserId } from '@/hooks/useGetUser'
import { useCreateLessonMutation } from '@/hooks/useLessons'
import Dialog from '../../moleculs/Dialog'
import { CloseIcon } from '../../atoms/icons'
import Button from '../../atoms/Buttons/Button'
import FormInput from '../../moleculs/Form/FormInput'
import FormTextArea from '../../moleculs/Form/FormTextArea'
import cls from './CreateNewLessonForm.module.scss'

const CreateNewLessonForm = ({
    isOpen = false,
    groupId,
    onClose,
}) => {
    const mentorId = useGetUserId()
    const { register, reset, handleSubmit, formState: { isDirty, errors, isSubmitting } } = useForm()
    const createLessonMutation = useCreateLessonMutation()
    
    const handleCreateNewLesson = async (data) => {
        data = { ...data, group: groupId }
        await createLessonMutation.mutateAsync(data, {
            onSuccess: (res) => {
                const videoPlatformUrl = new URL(res?.url || '')
                videoPlatformUrl.searchParams.set('user', mentorId)
                window.open(videoPlatformUrl.toString(), '_blank')
                
                toast.success("Dars Yaratildi")
                setTimeout(reset, 300)
                onClose?.()
            },
            onError: (res) => toast.error(res?.response?.data?.message || 'Xatolik yuz berdi')
        })    
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmit(handleCreateNewLesson)} >
                <div className={cls.form__header}>
                    <span className={cls.form__header__title}>Darsni boshlash</span>
                    <button onClick={onClose} type='button'>
                        <CloseIcon />
                    </button>
                </div>
                <FormInput
                    label='Dars Mavzusi'
                    placeholder='Mavzuni Yozing'
                    register={register('title', { required: 'Dars mavzusi kiritish shart' })}
                    error={errors?.title?.message}
                />
                <FormTextArea
                    label='Izoh'
                    placeholder='Izoh'
                    register={register('description', { required: 'Izoh kiritish shart' })}
                    error={errors?.description?.message}
                />
                <Button
                    type='submit'
                    disabled={!isDirty}
                    isLoading={isSubmitting}
                >
                    Qo'shish
                </Button>
            </form>
        </Dialog>
    )
}

export default CreateNewLessonForm