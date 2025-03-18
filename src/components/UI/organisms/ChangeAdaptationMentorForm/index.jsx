import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { getUserFullName } from '@/utils/lib'
import { useGetMentorsForOptions } from '@/hooks/useMentor'
import { useChangeAdaptationMentorMutation } from '@/hooks/useAdaptation'
import Dialog from '../../moleculs/Dialog'
import FormSelect from '../../moleculs/Form/FormSelect'
import Button from '../../atoms/Buttons/Button'
import cls from './ChangeAdaptationMentorForm.module.scss'

const ChangeAdaptationMentorForm = ({
    isOpen = false,
    adaptationId = "",
    onClose,
}) => {
    const { control, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm()
    const { callMentors: { data: callMentors } } = useGetMentorsForOptions()
    const changeAdaptationMentorMutation = useChangeAdaptationMentorMutation()

    const options = callMentors?.map(mentor => ({ value: mentor.id, label: getUserFullName(mentor) }))

    const handleChangeAdaptationMentor = async (data) => {
        data.id = adaptationId
        await changeAdaptationMentorMutation.mutateAsync(data, {
            onSuccess: () => {
                onClose?.()
                toast.success('Mentor O\'zgartirildi')
                reset({})
            },
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
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