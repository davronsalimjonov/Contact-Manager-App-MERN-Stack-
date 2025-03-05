import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getUserFullName } from '@/utils/lib'
import { useGetMentorsForOptions } from '@/hooks/useMentor'
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
    const { control, register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful, dirtyFields, isDirty } } = useForm({ defaultValues })
    const { mainMentors: { data: mainMentors } } = useGetMentorsForOptions({ enabled: isOpen })

    const mainMentorOptions = mainMentors?.map((item) => ({ value: item?.id, label: getUserFullName(item) }))

    useEffect(() => {
        if (isSubmitSuccessful) setTimeout(() => reset(defaultValues), 300)
    }, [isSubmitSuccessful])

    const handleSubmitForm = async (data) => {
        const updatedData = Object.keys(dirtyFields).reduce((acc, key) => {
            if (dirtyFields[key]) acc[key] = data[key];
            return acc;
        }, {})

        await onSubmit?.(updatedData)
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
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
                    isclearable
                    isSearchable={true}
                    control={control}
                    name='level'
                    rules={{ required: "Levelni tanlang" }}
                    error={errors?.level?.message}
                />}
                <FormSelect
                    label='Asosiy Mentor'
                    placeholder="Asosiy Mentorni Tanlang"
                    isclearable={!isEdit}
                    isSearchable={true}
                    options={mainMentorOptions}
                    control={control}
                    name='academyMentor'
                    rules={{ required: "Asosiy Mentor Tanlang" }}
                    error={errors?.academyMentor?.message}
                />
                <Button
                    type='submit'
                    isLoading={isSubmitting}
                    disabled={!isDirty}
                >
                    {isEdit ? "O'zgartirish" : "Qo'shish"}
                </Button>
            </form>
        </Dialog>
    )
}

export default GroupFormModal