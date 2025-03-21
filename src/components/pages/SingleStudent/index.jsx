import { useParams } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import UserCourseTable from '@/components/templates/UserCourseTable';
import useGetStudentCourseById from '@/hooks/useGetStudentCourseById';
import StudentInformationForm from '@/components/UI/organisms/StudentInformationForm';
import StudentPersonalInfo from '@/components/UI/organisms/StudentPersonalInfo';
import StudentActionHistory from '@/components/UI/organisms/StudentActionHistory';
import cls from './SingleStudent.module.scss';

const SingleStudent = () => {
    const { courseId, userId } = useParams()
    const { data: course, isLoading: isLoadingStudent } = useGetStudentCourseById(courseId)
    const student = course?.user

    return (
        <div className={cls.page}>
            {!isLoadingStudent ? (
                <>
                    <StudentInformationForm courseId={courseId} />
                    <UserCourseTable userId={userId} userCourseId={courseId} />
                    <div className={cls.page__cards}>
                        <StudentActionHistory />
                        <StudentPersonalInfo
                            email={student?.email}
                            direction={student?.onboarding?.learnField}
                            purpose={student?.onboarding?.aim}
                            level={student?.onboarding?.degree}
                            address={student?.onboarding?.address}
                            job={student?.onboarding?.job}
                        />
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default SingleStudent;