import { getDayName, getUserFullName } from '@/utils/lib';
import StudentsTableHeader from '../../UI/organisms/StudentsTableHeader';
import StudentsTableRow from '../../UI/organisms/StudentsTableRow';
import cls from './StudentsTable.module.scss';

const StudentsTable = ({
    students = [],
    triggerRef
}) => {
    return (
        <div style={{ overflow: 'auto' }}>
            <table className={cls.table}>
                <StudentsTableHeader />
                <tbody>
                    {students?.length > 0 && students.map((student, index) => (
                        <StudentsTableRow 
                            key={student?.id}
                            index={index + 1}
                            fullName={getUserFullName(student?.user)}
                            phoneNumber={student?.user?.phone}
                            days={student?.days?.map(day => getDayName(day, 'short')).join(', ') || ''}
                            time={student?.connectionTime}
                            status={student?.status}
                            userId={student?.user?.id}
                        />
                    ))}
                    <div ref={triggerRef}></div>
                </tbody>
            </table>
        </div>
    );
}

export default StudentsTable;