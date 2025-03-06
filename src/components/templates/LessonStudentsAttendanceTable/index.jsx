import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import EmptyData from '@/components/UI/organisms/EmptyData';
import LessonStudentsAttendanceTableRow from '@/components/UI/organisms/LessonStudentsAttendanceTableRow';
import cls from './LessonStudentsAttendanceTable.module.scss';

const LessonStudentsAttendanceTable = ({ 
    students = [],
    startIndex = 0 
}) => {
    const navigate = useNavigate()

    return (
        <div className={cls.wrapper}>
            {students?.length > 0 ? (
                <table className={cls.table}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Ism Familiya</th>
                            <th>O'quvchi Vazifasi</th>
                            <th>Baho</th>
                            <th>Davomati</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <LessonStudentsAttendanceTableRow
                                key={student?.id}
                                index={startIndex + index + 1}
                                fullName={getUserFullName(student?.student?.user)}
                                attendance={student?.attendance}
                                hasHomeWork={!!student?.lessonHomeWork}
                                mark={student?.mark}
                                onClickHomeWork={() => navigate(`/homework/${student?.id}`)}
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

export default LessonStudentsAttendanceTable;