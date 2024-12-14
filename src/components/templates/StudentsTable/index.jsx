import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import { getDayName, getUserFullName } from '@/utils/lib';
import EmptyData from '@/components/UI/organisms/EmptyData';
import StudentsTableRow from '../../UI/moleculs/StudentsTableRow';
import StudentsTableHeader from '../../UI/organisms/StudentsTableHeader';
import cls from './StudentsTable.module.scss';

const StudentsTable = ({
    students = [],
    triggerRef,
    isLoading
}) => {

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {students?.length > 0 ? (
                <table className={cls.table}>
                    <StudentsTableHeader />
                    <tbody>
                        <Mapper
                            data={students}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(student, index) => (
                                <StudentsTableRow
                                    key={student?.id}
                                    index={index + 1}
                                    fullName={getUserFullName(student)}
                                    phoneNumber={student?.phone}
                                    days={student?.days?.map(day => getDayName(day, 'short')).join(', ') || ''}
                                    time={student?.connectionTime}
                                    status={student?.status}
                                    userCourseId={student?.id}
                                    chatId={student?.id}
                                />
                            )}
                        />
                        <tr ref={triggerRef}></tr>
                    </tbody>
                </table>
            ) : (
                !isLoading && <EmptyData text="Sizda hozirda hech qanday ma'lumot mavjud emas."/>
            )}
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default StudentsTable;