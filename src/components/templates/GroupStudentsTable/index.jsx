import { getUserFullName } from '@/utils/lib';
import StudentStatus from '@/components/UI/atoms/StudentStatus';
import cls from './GroupStudentsTable.module.scss';

const GroupStudentsTable = ({
    students = [],
    startIndex = 1
}) => {
    return (
        <table className={cls.table}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>O’quvchi ismi</th>
                    <th>Statusi</th>
                </tr>
            </thead>
            <tbody>
                {students?.map((student, index) => (
                    <tr key={student?.id}>
                        <td>{startIndex + index + 1}</td>
                        <td>{getUserFullName(student?.user)}</td>
                        <td><StudentStatus status={student?.status} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default GroupStudentsTable;