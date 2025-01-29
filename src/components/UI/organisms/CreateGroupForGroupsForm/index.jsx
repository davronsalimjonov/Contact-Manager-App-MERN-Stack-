import React, { useEffect } from 'react'
import Dialog from '../../moleculs/Dialog'
import { useForm } from 'react-hook-form'
import Button from '../../atoms/Buttons/Button'
import cls from "./CreateGroupForGroupsForm.module.scss"
import FormInput from '../../moleculs/Form/FormInput'
import FormSelect from '../../moleculs/Form/FormSelect'
import useGetMentors from '@/hooks/useGetMentors'

const CreateGroupForGroupsForm = ({
    onSubmit,
    isOpen = false,
    onClose
}) => {
    const { control, register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm()
    const { callMentors: { data: callMentors }, mainMentors: { data: mainMentors } } = useGetMentors()

    const callMentorOptions = callMentors?.map((item) => ({ value: `${item?.id}`, label: `${item?.firstName} ${item?.lastName}` }))
    const mainMentorOptions = mainMentors?.map((item) => ({ value: `${item?.id}`, label: `${item?.firstName} ${item?.lastName}` }))

    useEffect(() => {
        if (isSubmitSuccessful) reset()

    }, [isSubmitSuccessful])

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.MainMentorStudentsGroupTab__dialog} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <FormInput
                        label='Guruh Nomi'
                        placeholder='Guruh Nomini Kiriting'
                        register={register('title', { required: 'Guruh Nomini Kiriting!' })}
                        error={errors?.title?.message}
                    />
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                    <FormSelect
                        label='Status Tanlang'
                        placeholder="Levelni Kiriting"
                        options={[
                            { value: 'A1', label: 'A1' },
                            { value: 'A2', label: 'A2' },
                            { value: 'B1', label: 'B1' },
                            { value: 'B2', label: 'B2' },
                            { value: 'C1', label: 'C1' },
                            { value: 'C2', label: 'C2' },
                        ]}
                        isClearable
                        isSearchable={true}
                        control={control}
                        name='level'
                        rules={{ required: "Status Tanlang" }}
                    />
                </div>
                <div onClick={(e) => e.stopPropagation()}>
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
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                    <FormSelect
                        label='Call Mentorni Tanlang'
                        placeholder="Nazoratchi Mentorni Tanlang"
                        options={callMentorOptions}
                        isClearable
                        isSearchable={true}
                        control={control}
                        name='callMentor'
                        rules={{ required: "Nazoratchi Mentor Tanlang" }}
                    />
                </div>
                <div>
                    <Button
                        type='submit'
                        isLoading={isSubmitting}
                        className={cls.MainMentorStudentsGroupTab__dialog__btn}
                    >Qo'shish</Button>
                </div>
            </form>
        </Dialog>
    )
}

export default CreateGroupForGroupsForm