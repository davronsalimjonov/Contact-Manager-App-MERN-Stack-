import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { cn, getUserFullName } from '@/utils/lib';
import { useTransferMutation } from '@/hooks/useGroups';
import Button from '@/components/UI/atoms/Buttons/Button';
import EmptyData from '@/components/UI/organisms/EmptyData';
import ConfirmationModal from '@/components/UI/organisms/ConfirmationModal';
import ChangePasswordForm from '@/components/UI/organisms/ChangePasswordForm';
import TransferStudentModal from '@/components/UI/organisms/TransferStudentModal';
import MainMentorStudentsTableRow from '@/components/UI/moleculs/MainMentorStudentsTableRow';
import cls from './MainMentorStudentsTable.module.scss';

const MainMentorStudentsTable = ({ 
    students = [], 
    startIndex = 1,
    withCheckbox = false,
    groupId,
    selectedStudents,
    onSelectStudent,
    onSelectAll,
    isAllSelected,
    isAllStudentsLoading
}) => {
    const navigate = useNavigate()
    const transferStudentMutation = useTransferMutation()
    const [passwordModal, setPasswordModal] = useState({ isOpen: false, userId: '' })
    const [transferModal, setTransferModal] = useState({ isOpen: false, userIds: [], groupId: '' })
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, userIds: [], from: '', to: '' })

    const handleTransferStudent = async () => {
        const transferData = { from: confirmModal?.from, to: confirmModal?.to, studentIds: confirmModal?.userIds }
        await transferStudentMutation.mutateAsync(transferData, {
            onSuccess: () => toast.success('O\'quvchi transfer qilindi'),
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    const handleTransferAllStudents = () => {
        setTransferModal({ isOpen: true, userIds: Array.from(selectedStudents), groupId })
    }

    const handleSelectAll = (e) => {
        onSelectAll?.(e.target.checked)
    }

    const handleCheckboxChange = (e) => {
        const { checked, value } = e.target
        onSelectStudent?.(value, checked)
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
                onSubmit={(groupId) => setConfirmModal({ 
                    isOpen: true, 
                    userIds: transferModal?.userIds, 
                    to: groupId, 
                    from: transferModal?.groupId 
                })}
            />
            <ConfirmationModal
                title="Rostan ham o'quvchini shu guruhga transfer qilmoqchimisiz?"
                isOpen={confirmModal?.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, userIds: '', from: '', to: '' })}
                onCancel={() => setConfirmModal({ isOpen: false, userIds: '', from: '', to: '' })}
                onConfirm={handleTransferStudent}
            />
            {students?.length > 0 ? (
                <table className={cn(cls.table, withCheckbox && cls.withCheckbox)}>
                    <thead>
                        <tr>
                            {withCheckbox && (
                                <th>
                                    <input 
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                        disabled={isAllStudentsLoading}
                                    />
                                </th>
                            )}
                            <th>№</th>
                            <th>Ism,familiya</th>
                            <th>Telefon raqami</th>
                            <th>Guruhi</th>
                            <th>Statusi {selectedStudents?.size > 0 && <Button onClick={handleTransferAllStudents}>Transfer</Button>}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students?.map((student, index) => (
                            <MainMentorStudentsTableRow
                                key={student?.id}
                                userCourseId={student?.id}
                                index={startIndex + index + 1}
                                avatar={student?.url}
                                group={student?.group}
                                status={student?.status}
                                phoneNumber={student?.phone}
                                fullName={getUserFullName(student)}
                                onClickStudentInfo={() => navigate(student?.id)}
                                onClickChangePassword={() => setPasswordModal({ 
                                    isOpen: true, 
                                    userId: student?.userId 
                                })}
                                onClickTransfer={() => setTransferModal({ 
                                    isOpen: true, 
                                    userIds: [student?.id], 
                                    groupId: student?.groupId 
                                })}
                                checkbox={withCheckbox}
                                checked={selectedStudents.has(student?.id)}
                                onChangeCheckbox={handleCheckboxChange}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <EmptyData text="Hech qanday o'quvchilar mavjud emas" />
            )}
        </div>
    )
}

export default MainMentorStudentsTable