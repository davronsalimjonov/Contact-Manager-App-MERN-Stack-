import React, { useEffect } from 'react'
import Dialog from '../../moleculs/Dialog'
import cls from "./ChangePasswordForm.module.scss"
import FormInput from '../../moleculs/Form/FormInput'
import Button from '../../atoms/Buttons/Button'
import { useForm } from 'react-hook-form'

const ChangePasswordForm = ({
    isOpen = false,
    onClose,
    onSubmit
}) => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful, isDirty, isSubmitting } } = useForm()

    useEffect (() => {
        if (isSubmitSuccessful) reset()
    }, [isSubmitSuccessful])

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form
                className={cls.change__psw}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormInput
                    label="Parol O'zgartirish"
                    placeholder='Yangi Parolni Kiriting'
                    register={register('password', {required: "Parol Kiriting"})}
                    error={errors?.title?.message}
                    isClearable
                />
                <Button
                    className={cls.change__psw__btn}
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