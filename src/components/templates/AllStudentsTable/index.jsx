import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import EmptyData from '@/components/UI/organisms/EmptyData';
import ChangePasswordForm from '@/components/UI/organisms/ChangePasswordForm';
import AllStudentsTableRow from '@/components/UI/moleculs/AllStudentsTableRow';
import TransferStudentModal from '@/components/UI/organisms/TransferStudentModal';
import cls from './AllStudentsTable.module.scss';
import { STUDENT_STATUS_ENUMS } from '@/constants/enum';

const AllStudentsTable = ({
    students = [],
    startIndex = 0
}) => {
    const navigate = useNavigate()
    const [changePassword, setChangePassword] = useState({ isOpen: false, userId: null })
    const [transferStudent, setTransferStudent] = useState({ isOpen: false, userIds: null, groupId: null })

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <ChangePasswordForm
                isOpen={changePassword.isOpen}
                userId={changePassword.userId}
                onClose={() => setChangePassword({ isOpen: false, userId: null })}
            />
            <TransferStudentModal 
                isOpen={transferStudent.isOpen}
                userIds={transferStudent.userIds}
                groupId={transferStudent.groupId}
                onClose={() => setTransferStudent({ isOpen: false, userIds: null, groupId: null })}
            />
            {students?.length > 0 ? (
                <table className={cls.table}>
                    <thead className={cls.head}>
                        <tr >
                            <th>№</th>
                            <th>Ism familyasi</th>
                            <th>Telefon nomer</th>
                            <th>Status</th>
                            <th>Mentor</th>
                            <th>Darajasi</th>
                            <th>Kursi</th>
                            <th>Guruh</th>
                            <th>Tugash sanasi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <AllStudentsTableRow
                                key={student?.id}
                                index={startIndex + index + 1}
                                avatar={student?.user?.url}
                                fullName={getUserFullName(student?.user)}
                                phoneNumber={student?.user?.phone}
                                status={student?.status}
                                mainTeacher={getUserFullName(student?.teacher)}
                                secondTeacher={getUserFullName(student?.secondTeacher)}
                                level={student?.level}
                                course={student?.course?.title}
                                group={student?.group?.title}
                                courseEndDate={student?.endDate}
                                isAdaptation={student?.status === STUDENT_STATUS_ENUMS.ADAPTATION}
                                adaptationTecherFullName={getUserFullName(student?.adaptation)}
                                onClickUserInfo={() => navigate(`${student?.id}/${student?.user?.id}`)}
                                onClickChangePassword={() => setChangePassword({ isOpen: true, userId: student?.user?.id })}
                                onClickTransfer={() => setTransferStudent({ isOpen: true, userIds: [student?.id], groupId: student?.group?.id })}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <EmptyData text="Sizda hozirda bunday o'quvchi mavjud emas." />
            )}
        </div>
    );
}

export default AllStudentsTable;