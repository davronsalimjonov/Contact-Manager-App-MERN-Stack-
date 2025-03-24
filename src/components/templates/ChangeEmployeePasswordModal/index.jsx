import toast from 'react-hot-toast';
import { copyToClipboard } from '@/utils/lib';
import { updateEmployeePassword } from '@/services/employee';
import ChangePasswordForm from '@/components/UI/organisms/ChangePasswordForm';

const ChangeEmployeePasswordModal = ({
    isOpen,
    onClose,
    employeeId,
    role
}) => {

    const handleSubmitForm = async (data) => {
        try {
            await updateEmployeePassword(employeeId, { ...data, role })
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

export default ChangeEmployeePasswordModal;