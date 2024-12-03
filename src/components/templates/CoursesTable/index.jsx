import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './CoursesTable.module.scss';
import CoursesTableHeader from '@/components/UI/organisms/CoursesTableHeader';
import CoursesTableRow from '@/components/UI/moleculs/CoursesTableRow';
import useGetStudentCourses from '@/hooks/useGetStudentCourses';
import { useParams } from 'react-router-dom';

const CoursesTable = ({
    courses = [],
    triggerRef,
    isLoading
}) => {
console.log(courses);
    

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {courses?.length > 0 ? (
                <table className={cls.table}>
                    <CoursesTableHeader />
                    <tbody>
                        <Mapper
                            data={courses}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(course, index) => (
                                <CoursesTableRow
                                index={index}
                                course={course.title}
                                startDate={"12.09.89"}
                                endDate={"12.08.1990"}
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

export default CoursesTable;