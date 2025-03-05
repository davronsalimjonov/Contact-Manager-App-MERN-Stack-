import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn, getUserFullName } from '@/utils/lib';
import Button from '@/components/UI/atoms/Buttons/Button';
import EmptyData from '@/components/UI/organisms/EmptyData';
import ChangePasswordForm from '@/components/UI/organisms/ChangePasswordForm';
import TransferStudentModal from '@/components/UI/organisms/TransferStudentModal';
import MainMentorStudentsTableRow from '@/components/UI/moleculs/MainMentorStudentsTableRow';
import cls from './MainMentorStudentsTable.module.scss';

const MainMentorStudentsTable = ({
    students = [],
    withCheckbox = false,
    groupId,
    selectedStudents,
    onSelectStudent,
    onSelectAll,
    isAllSelected,
}) => {
    const navigate = useNavigate()
    const [passwordModal, setPasswordModal] = useState({ isOpen: false, userId: '' })
    const [transferModal, setTransferModal] = useState({ isOpen: false, userIds: [], groupId: '' })

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
                isOpen={transferModal?.isOpen}
                groupId={transferModal?.groupId}
                userIds={transferModal?.userIds}
                onClose={() => setTransferModal(state => ({ ...state, isOpen: false }))}
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
                                index={index + 1}
                                avatar={student?.url}
                                group={student?.group}
                                status={student?.status}
                                phoneNumber={student?.phone}
                                fullName={getUserFullName(student)}
                                checkbox={withCheckbox}
                                checked={selectedStudents.has(student?.id)}
                                onChangeCheckbox={handleCheckboxChange}
                                onClickStudentInfo={() => navigate(`${student?.id}/${student?.userId}`)}
                                onClickChangePassword={() => setPasswordModal({ isOpen: true, userId: student?.userId })}
                                onClickTransfer={() => setTransferModal({ isOpen: true, userIds: [student?.id], groupId: student?.groupId })}
                                onClick={() => navigate(`chat/${student?.id}`)}
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