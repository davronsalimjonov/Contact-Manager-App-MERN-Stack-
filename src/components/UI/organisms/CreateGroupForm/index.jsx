import { useForm } from 'react-hook-form'
import { getUserFullName } from '@/utils/lib'
import useGetMentors from '@/hooks/useGetMentors'
import Dialog from '../../moleculs/Dialog'
import Button from '../../atoms/Buttons/Button'
import RedButton from '../../atoms/Buttons/RedButton'
import FormInput from '../../moleculs/Form/FormInput'
import FormSelect from '../../moleculs/Form/FormSelect'
import cls from "./createGroupForm.module.scss"
import { useEffect } from 'react'

export const CreateGroupForm = ({
    isOpen = false,
    onClose,
    onSubmit
}) => {
    const { callMentors: { data: callMentors } } = useGetMentors()
    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting, isDirty, isSubmitSuccessful } } = useForm()
    const mentorOptions = callMentors?.map(mentor => ({ value: mentor?.id, label: getUserFullName(mentor) }))

    useEffect(() => {
        if(isSubmitSuccessful) reset()
    }, [isSubmitSuccessful])

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.MainMentorStudentsGroupTab__dialog} onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label='Guruh qo’shish'
                    placeholder='Guruh Nomini Yozing'
                    register={register('title', { required: 'Guruh Nomini Kiriting!' })}
                    error={errors?.title?.message}
                />
                <FormSelect
                    label='Nazoratchi mentor'
                    placeholder='Nazoratchi Mentorni Tanlang'
                    options={mentorOptions}
                    control={control}
                    name='callMentor'
                    rules={{ required: 'Nazoratchi Mentor Tanlang' }}
                    error={errors?.callMentor?.message}
                    isClearable
                    isSearchable
                />
                <div className={cls.MainMentorStudentsGroupTab__dialog__btns}>
                    <RedButton onClick={onClose}>Bekor Qilish</RedButton>
                    <Button type='submit' disabled={!isDirty} isLoading={isSubmitting}>Qo'shish</Button>
                </div>
            </form>
        </Dialog>
    )
}