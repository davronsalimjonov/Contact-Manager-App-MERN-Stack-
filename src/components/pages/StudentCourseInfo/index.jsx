import UserCourseTable from '@/components/UI/organisms/UserCourseTable';
import StudentInformationForm from '@/components/UI/organisms/StudentInformationForm';
import cls from './StudentCourseInfo.module.scss';

const StudentCourseInfo = () => {
    return (
        <div className={cls.page}>
            <StudentInformationForm />
            <UserCourseTable />
        </div>
    );
}

export default StudentCourseInfo;