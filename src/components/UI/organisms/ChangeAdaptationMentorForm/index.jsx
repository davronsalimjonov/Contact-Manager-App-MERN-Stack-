import { useGetMentorsForOptions } from '@/hooks/useMentor'
import Dialog from '../../moleculs/Dialog'
import FormSelect from '../../moleculs/Form/FormSelect'
import cls from './ChangeAdaptationMentorForm.module.scss'
import { getUserFullName } from '@/utils/lib'
import { useForm } from 'react-hook-form'
import Button from '../../atoms/Buttons/Button'
import { useChangeAdaptationMentorMutation } from '@/hooks/useAdaptation'
import toast from 'react-hot-toast'

const ChangeAdaptationMentorForm = ({
    isOpen = false,
    setIsOpen,
    adaptationId=""
}) => {
    const { control, handleSubmit, reset,  formState: { isSubmitting, isDirty } } = useForm()
    const { callMentors: { data: callMentors } } = useGetMentorsForOptions()
    const changeAdaptationMentorMutation = useChangeAdaptationMentorMutation()

    const options = [{ value: 'mentorsiz', label: 'Mentorsiz' }]
    callMentors?.forEach(mentor => options.push({ value: mentor.id, label: getUserFullName(mentor) }))

    const handleChangeAdaptationMentor = async (data) => {
        data.id = adaptationId
        await changeAdaptationMentorMutation.mutateAsync(data, {
            onSuccess: () => {
                setIsOpen(false)
                toast.success('Mentor O\'zgartirildi')
                reset({})
            },
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <form className={cls.ChangeAdaptationMentorForm} onSubmit={handleSubmit(handleChangeAdaptationMentor)}>
                <h2>Adaptatsiya Mentor Almashtirish</h2>
                <FormSelect
                    label="Adaptatsiya mentor"
                    placeholder='Adaptatsiya mentorni tanlang'
                    control={control}
                    options={options}
                    name='mentor'
                    isSearchable
                    className={cls.ChangeAdaptationMentorForm__select}
                />
                <Button
                    type='submit'
                    disabled={!isDirty}
                    isLoading={isSubmitting}
                    className={cls.ChangeAdaptationMentorForm__button}
                >
                    Yangilash
                </Button>

            </form>
        </Dialog>
    )
}

export default ChangeAdaptationMentorForm