import { useParams } from 'react-router-dom';
import UserCourseTable from '@/components/UI/organisms/UserCourseTable';
import StudentInformationForm from '@/components/UI/organisms/StudentInformationForm';
import cls from './StudentCourseInfo.module.scss';

const StudentCourseInfo = () => {
    const { courseId, userId } = useParams()

    return (
        <div className={cls.page}>
            <StudentInformationForm courseId={courseId} />
            <UserCourseTable userId={userId} userCourseId={courseId} />
        </div>
    );
}

export default StudentCourseInfo;