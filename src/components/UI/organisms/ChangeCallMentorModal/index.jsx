import { useState } from 'react';
import toast from 'react-hot-toast';
import { getUserFullName } from '@/utils/lib';
import { updateUserCourse } from '@/services/course';
import { useGetMentorsForOptions } from '@/hooks/useMentor';
import Button from '../../atoms/Buttons/Button';
import { CloseIcon } from '../../atoms/icons';
import Dialog from '../../moleculs/Dialog';
import FormSelect from '../../moleculs/Form/FormSelect';
import cls from './ChangeCallMentorModal.module.scss';
import { useUpdateCallMentorMutation } from '@/hooks/useUserCourse';

const ChangeCallMentorModal = ({
    isOpen = false,
    userCourseId = '',
    currentMentorId,
    onClose
}) => {
    const [selectedMentor, setSelectedMentor] = useState()
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
    const updateCallMentorMutation = useUpdateCallMentorMutation(userCourseId)
    const { callMentors: { data: callMentors } } = useGetMentorsForOptions()
    const callMentorOptions = callMentors?.map(mentor => ({ value: mentor?.id, label: getUserFullName(mentor) }))?.filter(option => option?.value !== currentMentorId)

    const handleSubmitForm = async (e) => {
        try {
            e.preventDefault()
            setIsLoadingSubmit(true)
            await updateCallMentorMutation.mutateAsync({ secondTeacher: selectedMentor })
            toast.success('Mentor muvaffaqiyatli oʼzgartirildi!')
            onClose()
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        } finally {
            setIsLoadingSubmit(false)
        }
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmitForm}>
                <div className={cls.form__header}>
                    <span className={cls.form__header__title}>Call mentorni almashtirish</span>
                    <button type='button' onClick={onClose}><CloseIcon /></button>
                </div>
                <FormSelect
                    label='Nazoratchi mentor'
                    placeholder='Nazoratchi mentorni tanlang'
                    options={callMentorOptions}
                    onChange={option => setSelectedMentor(option?.value)}
                    defaultValue={selectedMentor}
                />
                <Button
                    type='submit'
                    isLoading={isLoadingSubmit}
                    disabled={!selectedMentor}
                >
                    Saqlash
                </Button>
            </form>
        </Dialog>
    );
}

export default ChangeCallMentorModal;