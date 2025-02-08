import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import { getUserFullName } from '@/utils/lib';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './AllStudentsTable.module.scss';
import AllStudentsTableRow from '@/components/UI/moleculs/AllStudentsTableRow';
import AllStudentsTableHeader from '@/components/UI/organisms/AllStudentsTableHeader';

const AllStudentsTable = ({
    students = [],
    triggerRef,
    isLoading
}) => {

    const currenPage = students?.meta?.currentPage;
    const limit = students?.meta?.itemsPerPage;

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {students?.items?.length > 0 ? (
                <table className={cls.table}>
                    <AllStudentsTableHeader />
                    <tbody>
                        <Mapper
                            data={students?.items}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(student, index) => (
                                <AllStudentsTableRow
                                    key={student?.id}
                                    index={(currenPage - 1) * limit + index + 1}
                                    fullName={getUserFullName(student?.user)}
                                    url={student?.user?.url}
                                    phoneNumber={student?.user?.phone}
                                    status={student?.status}
                                    teacher={getUserFullName(student?.teacher)}
                                    secondTeacher={getUserFullName(student?.secondTeacher)}
                                    course={student?.course?.title}
                                    level={student?.level}
                                    studentId={student?.id}
                                    startDate={student?.startDate}
                                    userId={student?.user?.id}
                                    userCourseId={student?.id}
                                />
                            )}
                        />
                        <tr ref={triggerRef}></tr>
                    </tbody>
                </table>
            ) : (
                !isLoading && <EmptyData text="Sizda hozirda bunday o'quvchi mavjud emas." />
            )}
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default AllStudentsTable;