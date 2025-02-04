import React, { useEffect } from 'react'
import Dialog from '../Dialog'
import { CloseIcon } from '../../atoms/icons'
import FormInput from '../Form/FormInput'
import FormTextArea from '../Form/FormTextArea'
import cls from './CreateNewLessonForm.module.scss'
import Button from '../../atoms/Buttons/Button'
import { useForm } from 'react-hook-form'

const CreateNewLessonForm = ({
    isOpen = false,
    onClose,
    onSubmit
}) => {
    const { register, reset, handleSubmit, formState: {isDirty, errors, isSubmitting, isSubmitSuccessful}} = useForm()


    useEffect(() => {
        if (isSubmitSuccessful) {
            onClose()
            reset()
        }
    })
    
    return (
        <Dialog isOpen={isOpen}>
            <form className={cls.CreateNewLessonForm} onSubmit={handleSubmit(onSubmit)} >
                <header>
                    <h1>Darsni boshlash</h1>
                    <div onClick={onClose}>
                        <CloseIcon heigh={9.15} width={9.15} />
                    </div>
                </header>
                <FormInput
                    label='Dars Mavzusi'
                    placeholder='Mavzuni Yozing'
                    register={{ ...register('title')}}
                    error={errors?.title?.message}
                />
                <FormTextArea
                    label='Izoh'
                    placeholder='Izoh'
                    register={{ ...register('description')}}
                />
                <Button
                    type='submit'
                    disabled={!isDirty}
                    isLoading={isSubmitting}
                >Qo'shish</Button>
            </form>
        </Dialog>
    )
}

export default CreateNewLessonForm