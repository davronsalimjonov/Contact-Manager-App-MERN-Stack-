import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { copyToClipboard } from '@/utils/lib'
import { updateUserPassword } from '@/services/user'
import Dialog from '../../moleculs/Dialog'
import Button from '../../atoms/Buttons/Button'
import FormInput from '../../moleculs/Form/FormInput'
import cls from "./ChangePasswordForm.module.scss"

const ChangePasswordForm = ({
    isOpen = false,
    userId = '',
    onClose,
}) => {
    const { register, handleSubmit, reset, formState: { errors, isDirty, isSubmitting } } = useForm()

    const handleSubmitForm = async (data) => {
        try {
            await updateUserPassword(userId, data)
            copyToClipboard(data?.password)
            toast.success('Parol muvaffaqiyatli oʼzgartirildi va buferga kopiyalandi!')
            reset()
            onClose()
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        }
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
                <FormInput
                    label="Parol O'zgartirish"
                    placeholder='Yangi Parolni Kiriting'
                    register={register('password', {required: "Parol Kiriting"})}
                    error={errors?.title?.message}
                    isclearable
                />
                <Button
                    type='submit'
                    disabled={!isDirty}
                    isLoading={isSubmitting}
                >
                    Yangilash
                </Button>

            </form>
        </Dialog>
    )
}

export default ChangePasswordForm