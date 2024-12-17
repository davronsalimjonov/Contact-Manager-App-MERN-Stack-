

import { getDayName } from '@/utils/time';
import { getUserFullName } from '@/utils/lib';
import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import EmptyData from '@/components/UI/organisms/EmptyData';
import StudentsTableRow from '../../UI/moleculs/StudentsTableRow';
import StudentsTableHeader from '../../UI/organisms/StudentsTableHeader';
import cls from './MainMentorStudentsTable.module.scss';
import MainMentorStudentsTableRow from '@/components/UI/moleculs/MainMentorStudentsTableRow';
import MainMentorStudentsTableHeader from '@/components/UI/organisms/MainMentorsStudentsTableHeader';

const MainMentorStudentsTable = ({
    students = [],
    triggerRef,
    isLoading
}) => {
    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {students?.length > 0 ? (
                <table className={cls.table}>
                    <MainMentorStudentsTableHeader />
                    <tbody>
                        <Mapper
                            data={students}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(student, index) => (
                                <MainMentorStudentsTableRow
                                    key={student?.id}
                                    index={index + 1}
                                    unreadedMessagesCount={student?.messageCount}
                                    avatar={student?.url}
                                    fullName={getUserFullName(student)}
                                    phoneNumber={student?.phone}
                                    days={student?.days?.map(day => getDayName(day, 'short')).join(', ') || ''}
                                    time={student?.connectionTime}
                                    status={student?.status}
                                    userCourseId={student.id}
                                    hidden={true}
                                    chatId={student?.id}
                                />
                            )}
                        />
                        <tr ref={triggerRef}></tr>
                    </tbody>
                </table>
            ) : (
                !isLoading && <EmptyData />
            )}
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default MainMentorStudentsTable;