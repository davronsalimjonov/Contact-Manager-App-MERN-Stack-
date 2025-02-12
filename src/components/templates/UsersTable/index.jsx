import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import EmptyData from '@/components/UI/organisms/EmptyData';
import UsersTableRow from '@/components/UI/moleculs/UsersTableRow';
import cls from './UsersTable.module.scss';

const UsersTable = ({
    students = [],
    startIndex = 0,
}) => {
    const navigate = useNavigate()

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {students?.length > 0 ? (
                <table className={cls.table}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Ism,familiya</th>
                            <th>Telefon raqami</th>
                            <th>Status</th>
                            <th>ID</th>
                            <th>Ro'yxatdan O'tdi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <UsersTableRow
                                key={student?.id}
                                index={startIndex + index + 1}
                                avatar={student?.url}
                                fullName={getUserFullName(student)}
                                phoneNumber={student?.phone}
                                status={student?.status}
                                uniqueId={student?.uniqueId}
                                createdAt={student?.createdAt}
                                onClickUserInfo={() => navigate(student?.id)}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <EmptyData />
            )}
        </div>
    );
}

export default UsersTable;