import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import { useTransferMutation } from '@/hooks/useGroups';
import EmptyData from '@/components/UI/organisms/EmptyData';
import ConfirmationModal from '@/components/UI/organisms/ConfirmationModal';
import ChangePasswordForm from '@/components/UI/organisms/ChangePasswordForm';
import TransferStudentModal from '@/components/UI/organisms/TransferStudentModal';
import MainMentorStudentsTableRow from '@/components/UI/moleculs/MainMentorStudentsTableRow';
import cls from './MainMentorStudentsTable.module.scss';

const MainMentorStudentsTable = ({ students = [], startIndex = 1 }) => {
    const navigate = useNavigate()
    const transferStudentMutation = useTransferMutation()
    const [passwordModal, setPasswordModal] = useState({ isOpen: false, userId: '' })
    const [transferModal, setTransferModal] = useState({ isOpen: false, userId: '', groupId: '' })
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: '', from: '', to: '' })

    const handleTransferStudent = async () => {
        const transferData = { from: confirmModal?.from, to: confirmModal?.to, studentIds: [confirmModal?.userId] }
        await transferStudentMutation.mutateAsync(transferData, {
            onSuccess: () => toast.success('O\'quvchi transfer qilindi'),
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <ChangePasswordForm
                isOpen={passwordModal?.isOpen}
                userId={passwordModal?.userId}
                onClose={() => setPasswordModal({ isOpen: false, userId: '' })}
            />
            <TransferStudentModal
                initialGroupId={transferModal?.groupId}
                isOpen={transferModal?.isOpen}
                onClose={() => setTransferModal(state => ({ ...state, isOpen: false }))}
                onSubmit={(groupId) => setConfirmModal({ isOpen: true, userId: transferModal?.userId, to: groupId, from: transferModal?.groupId })}
            />
            <ConfirmationModal
                title='Rostan ham o’quvchini shu guruhga transfer qilmoqchimisiz?'
                isOpen={confirmModal?.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, userId: '', from: '', to: '' })}
                onCancel={() => setConfirmModal({ isOpen: false, userId: '', from: '', to: '' })}
                onConfirm={handleTransferStudent}
            />
            {students?.length > 0 ? (
                <table className={cls.table}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Ism,familiya</th>
                            <th>Telefon raqami</th>
                            <th>Guruhi</th>
                            <th>Statusi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students?.map((student, index) => (
                            <MainMentorStudentsTableRow
                                key={student?.id}
                                index={startIndex + index + 1}
                                avatar={student?.url}
                                group={student?.group}
                                status={student?.status}
                                phoneNumber={student?.phone}
                                fullName={getUserFullName(student)}
                                onClickStudentInfo={() => navigate(student?.id)}
                                onClickChangePassword={() => setPasswordModal({ isOpen: true, userId: student?.userId })}
                                onClickTransfer={() => setTransferModal({ isOpen: true, userId: student?.id, groupId: student?.groupId })}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <EmptyData text="Hech qanday o'quvchilar mavjud emas" />
            )}
        </div>
    );
}

export default MainMentorStudentsTable;