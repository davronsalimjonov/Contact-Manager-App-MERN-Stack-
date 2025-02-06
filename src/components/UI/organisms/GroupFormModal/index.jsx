import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getUserFullName } from '@/utils/lib'
import useGetMentors from '@/hooks/useGetMentors'
import { ENGLISH_LEVEL_OPTIONS } from '@/constants/form'
import Dialog from '../../moleculs/Dialog'
import { CloseIcon } from '../../atoms/icons'
import Button from '../../atoms/Buttons/Button'
import FormInput from '../../moleculs/Form/FormInput'
import FormSelect from '../../moleculs/Form/FormSelect'
import cls from "./GroupFormModal.module.scss"

const GroupFormModal = ({
    defaultValues = {},
    isOpen = false,
    isEdit,
    onClose,
    onSubmit,
}) => {
    const { control, register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({defaultValues})
    const { callMentors: { data: callMentors }, mainMentors: { data: mainMentors } } = useGetMentors()

    const callMentorOptions = callMentors?.map((item) => ({ value: item?.id, label: getUserFullName(item) }))
    const mainMentorOptions = mainMentors?.map((item) => ({ value: item?.id, label: getUserFullName(item) }))

    useEffect(() => {
        if (isSubmitSuccessful) setTimeout(reset, 300)
    }, [isSubmitSuccessful])

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.form__header}>
                    <h2 className={cls.form__header__title}>{isEdit ? "Guruh tahrirlash" : "Guruh qo’shish"}</h2>
                    <button type='button' onClick={onClose}><CloseIcon /></button>
                </div>
                <FormInput
                    label='Guruh Nomi'
                    placeholder='Guruh Nomini Kiriting'
                    register={register('title', { required: 'Guruh Nomini Kiriting!' })}
                    error={errors?.title?.message}
                />
                {!isEdit && <FormSelect
                    label='Level'
                    placeholder="Levelni tanlang"
                    options={ENGLISH_LEVEL_OPTIONS}
                    isClearable
                    isSearchable={true}
                    control={control}
                    name='level'
                    rules={{ required: "Levelni tanlang" }}
                />}
                <FormSelect
                    label='Asosiy Mentor'
                    placeholder="Asosiy Mentorni Tanlang"
                    isClearable
                    isSearchable={true}
                    options={mainMentorOptions}
                    control={control}
                    name='academyMentor'
                    rules={{ required: "Asosiy Mentor Tanlang" }}
                />
                <FormSelect
                    label='Nazoratchi Mentor'
                    placeholder="Nazoratchi Mentorni Tanlang"
                    options={callMentorOptions}
                    isClearable
                    isSearchable={true}
                    control={control}
                    name='callMentor'
                    rules={{ required: "Nazoratchi Mentor Tanlang" }}
                />
                <Button type='submit' isLoading={isSubmitting}>
                    {isEdit ? "O'zgartirish" : "Qo'shish"}
                </Button>
            </form>
        </Dialog>
    )
}

export default GroupFormModal