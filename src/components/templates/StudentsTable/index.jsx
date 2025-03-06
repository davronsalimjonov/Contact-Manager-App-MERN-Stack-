import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDayName } from '@/utils/time';
import { cn, getUserFullName } from '@/utils/lib';
import EmptyData from '@/components/UI/organisms/EmptyData';
import ChangePasswordForm from '@/components/UI/organisms/ChangePasswordForm';
import TransferStudentModal from '@/components/UI/organisms/TransferStudentModal';
import ChangeCallMentorModal from '@/components/UI/organisms/ChangeCallMentorModal';
import StudentsTableRow from '../../UI/moleculs/StudentsTableRow';
import cls from './StudentsTable.module.scss';

const StudentsTable = ({
    students = [],
    menuButtons = true
}) => {
    const navigate = useNavigate()
    const [changePassword, setChangePassword] = useState({ isOpen: false, userId: '' })
    const [transfer, setTransfer] = useState({ isOpen: false, userIds: [], groupId: '' })
    const [changeCallMentor, setChangeCallMentor] = useState({ isOpen: false, userCourseId: null, currentMentorId: null })

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {menuButtons && (
                <ChangePasswordForm
                    isOpen={changePassword.isOpen}
                    userId={changePassword.userId}
                    onClose={() => setChangePassword({ isOpen: false, userId: '' })}
                />
            )}
            {menuButtons && (
                <TransferStudentModal
                    isOpen={transfer.isOpen}
                    groupId={transfer.groupId}
                    userIds={transfer.userIds}
                    onClose={() => setTransfer(state => ({ ...state, isOpen: false, userIds: [], }))}
                />
            )}
            {menuButtons && (
                <ChangeCallMentorModal
                    isOpen={changeCallMentor.isOpen}
                    userCourseId={changeCallMentor.userCourseId}
                    currentMentorId={changeCallMentor.currentMentorId}
                    onClose={() => setChangeCallMentor(state => ({ ...state, isOpen: false, userCourseId: null, currentMentorId: null }))}
                />
            )}
            {students?.length > 0 ? (
                <table className={cn(cls.table)}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Ism,familiya</th>
                            <th>Bog’lanish kuni</th>
                            <th>Bog’lanish vaqti</th>
                            <th>Telefon raqami</th>
                            <th>Statusi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students?.map((student, index) => (
                            <StudentsTableRow
                                key={student?.id}
                                index={index + 1}
                                chatId={student?.id}
                                avatar={student?.url}
                                status={student?.status}
                                phoneNumber={student?.phone}
                                time={student?.connectionTime}
                                fullName={getUserFullName(student)}
                                unreadedMessagesCount={student?.messageCount}
                                days={student?.days?.map(day => getDayName(day, 'short')).join(', ') || ''}
                                onClick={() => navigate(`/students/chat/${student?.id}`)}
                                onClickChangePassword={() => setChangePassword({ isOpen: true, userId: student?.userId })}
                                onClickTransfer={() => setTransfer({ isOpen: true, userIds: [student?.id], groupId: student?.groupId })}
                                onClickUserInfo={() => navigate(`/students/${student?.id}/${student?.userId}`)}
                                onClickChangeCallMentor={() => setChangeCallMentor({ isOpen: true, userCourseId: student?.id, currentMentorId: student?.secondTeacher?.id })}
                                menuButtons={menuButtons}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <EmptyData text="Sizda hozirda hech qanday ma'lumot mavjud emas." />
            )}
        </div>
    );
}

export default StudentsTable;