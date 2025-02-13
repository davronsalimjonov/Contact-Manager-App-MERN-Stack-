import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDayName } from '@/utils/time';
import { cn, getUserFullName } from '@/utils/lib';
import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import Button from '@/components/UI/atoms/Buttons/Button';
import EmptyData from '@/components/UI/organisms/EmptyData';
import ChangePasswordForm from '@/components/UI/organisms/ChangePasswordForm';
import TransferStudentModal from '@/components/UI/organisms/TransferStudentModal';
import StudentsTableRow from '../../UI/moleculs/StudentsTableRow';
import cls from './StudentsTable.module.scss';

const StudentsTable = ({
    groupId = '',
    students = [],
    isLoading,
    menuButtons = true
}) => {
    const navigate = useNavigate()
    const [checkedStudents, setCheckedStudents] = useState([])
    const [changePassword, setChangePassword] = useState({ isOpen: false, userId: '' })
    const [transfer, setTransfer] = useState({ isOpen: false, userIds: [], groupId: '' })

    const handleCheckboxChange = (e) => {
        const { checked, value } = e.target
        setCheckedStudents(prev => {
            if (checked) return [...prev, value]
            else return prev.filter(id => id !== value)
        })
    }

    const handleSelectAll = (e) => {
        const { checked } = e.target
        setCheckedStudents(checked ? students.map(student => student.id) : [])
    }

    const handleMultipleTransfer = () => {
        setTransfer({ isOpen: true, userIds: checkedStudents, groupId })
    }

    useEffect(() => {
        setCheckedStudents([])
    }, [groupId])

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
                    onClose={() => setTransfer({ isOpen: false, userIds: [], groupId: '' })}
                />
            )}
            {students?.length > 0 ? (
                <table className={cn(cls.table, groupId && cls.table__withCheckbox)}>
                    <thead>
                        <tr>
                            {groupId && <th><input type="checkbox" onChange={handleSelectAll} checked={checkedStudents.length === students.length} /></th>}
                            <th>№</th>
                            <th>Ism,familiya</th>
                            <th>Bog’lanish kuni</th>
                            <th>Bog’lanish vaqti</th>
                            <th>Telefon raqami</th>
                            <th>Statusi {checkedStudents.length > 0 && <Button onClick={handleMultipleTransfer}>Transfer</Button>}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <Mapper
                            data={students}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(student, index) => (
                                <StudentsTableRow
                                    key={student?.id}
                                    withCheckbox={!!groupId}
                                    index={index + 1}
                                    chatId={student?.id}
                                    avatar={student?.url}
                                    status={student?.status}
                                    userCourseId={student?.id}
                                    phoneNumber={student?.phone}
                                    time={student?.connectionTime}
                                    fullName={getUserFullName(student)}
                                    unreadedMessagesCount={student?.messageCount}
                                    days={student?.days?.map(day => getDayName(day, 'short')).join(', ') || ''}
                                    checked={checkedStudents.includes(student?.id)}
                                    onChangeCheckbox={handleCheckboxChange}
                                    onClick={() => navigate(`/students/chat/${student?.id}`)}
                                    onClickChangePassword={() => setChangePassword({ isOpen: true, userId: student?.userId })}
                                    onClickTransfer={() => setTransfer({ isOpen: true, userIds: [student?.id], groupId: student?.groupId })}
                                    onClickUserInfo={() => navigate(`/students/${student?.id}/${student?.userId}`)}
                                    menuButtons={menuButtons}
                                />
                            )}
                        />
                    </tbody>
                </table>
            ) : (
                !isLoading && <EmptyData text="Sizda hozirda hech qanday ma'lumot mavjud emas." />
            )}
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default StudentsTable;