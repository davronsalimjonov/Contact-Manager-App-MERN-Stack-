import toast from 'react-hot-toast';
import { copyToClipboard } from '@/utils/lib';
import { updateMentorPassword } from '@/services/employee';
import ChangePasswordForm from '@/components/UI/organisms/ChangePasswordForm';

const MentorChangePasswordModal = ({
    isOpen,
    onClose,
    mentorId,
    role
}) => {

    const handleSubmitForm = async (data) => {
        try {
            await updateMentorPassword(mentorId, { ...data, role })
            copyToClipboard(data?.password)
            toast.success('Parol muvaffaqiyatli oʼzgartirildi va buferga kopiyalandi!')
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        }
    }

    return (
        <ChangePasswordForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmitForm}
        />
    );
}

export default MentorChangePasswordModal;