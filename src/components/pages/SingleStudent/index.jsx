import StudentInformationForm from '@/components/UI/organisms/StudentInformationForm';
import StudentPersonalInfo from '@/components/UI/organisms/StudentPersonalInfo';
import StudentActionHistory from '@/components/UI/organisms/StudentActionHistory';
import cls from './SingleStudent.module.scss';

const SingleStudent = () => {
    return (
        <div className={cls.page}>
            <StudentInformationForm />
            <div className={cls.page__cards}>
                <StudentActionHistory />
                <StudentPersonalInfo />
            </div>
        </div>
    );
}

export default SingleStudent;