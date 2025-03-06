import toast from 'react-hot-toast';
import { copyToClipboard } from '@/utils/lib';
import { updateUserPassword } from '@/services/user';
import ChangePasswordForm from '@/components/UI/organisms/ChangePasswordForm';

const StudentChangePasswordModal = ({
    isOpen,
    onClose,
    userId
}) => {
    const handleSubmitForm = async (data) => {
        try {
            await updateUserPassword(userId, data)
            copyToClipboard(data?.password)
            toast.success('Parol muvaffaqiyatli oʼzgartirildi va buferga kopiyalandi!')
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        }
    }

    return (
        <ChangePasswordForm 
            onSubmit={handleSubmitForm}
            isOpen={isOpen}
            onClose={onClose}
        />
    );
}

export default StudentChangePasswordModal;