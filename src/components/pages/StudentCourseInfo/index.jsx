import UserCourseTable from '@/components/UI/organisms/UserCourseTable';
import StudentInformationForm from '@/components/UI/organisms/StudentInformationForm';
import cls from './StudentCourseInfo.module.scss';
import GroupPickerModal from '@/components/UI/organisms/GroupPickerModal';

const StudentCourseInfo = () => {
    return (
        <div className={cls.page}>
            <GroupPickerModal />
            <StudentInformationForm />
            <UserCourseTable />
        </div>
    );
}

export default StudentCourseInfo;