import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Dialog from '../../moleculs/Dialog'
import Button from '../../atoms/Buttons/Button'
import FormInput from '../../moleculs/Form/FormInput'
import cls from "./ChangePasswordForm.module.scss"

const ChangePasswordForm = ({
    isOpen = false,
    onSubmit,
    onClose,
}) => {
    const { register, handleSubmit, reset, formState: { errors, isDirty, isSubmitting, isSubmitSuccessful } } = useForm()

    useEffect(() => {
        if(isSubmitSuccessful){
            reset()
            onClose?.()
        }
    }, [isSubmitSuccessful])

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
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