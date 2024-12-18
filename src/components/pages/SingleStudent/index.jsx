import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { customToast } from '@/utils/toast';
import { updateUser } from '@/services/user';
import Loader from '@/components/UI/atoms/Loader';
import { objectToFormData } from '@/utils/lib';
import useGetStudentCourseById from '@/hooks/useGetStudentCourseById';
import StudentInformationForm from '@/components/UI/organisms/StudentInformationForm';
import StudentPersonalInfo from '@/components/UI/organisms/StudentPersonalInfo';
import StudentActionHistory from '@/components/UI/organisms/StudentActionHistory';
import cls from './SingleStudent.module.scss';
import SingleStudentCourse from '@/components/UI/organisms/SingleStudentCourse';

const SingleStudent = () => {
    const { courseId } = useParams()
    
    const queryClient = useQueryClient()
    const { data: course, isLoading: isLoadingStudent } = useGetStudentCourseById(courseId)
    const student = course?.user;

    const studentFormData = {
        id: student?.id,
        avatar: student?.url,
        firstName: student?.firstName,
        lastName: student?.lastName,
        phone: student?.phone,
        birthday: student?.birthday,
        gender: String(student?.gender),
        createdAt: student?.createdAt ? dayjs(student?.createdAt).format('DD.MM.YYYY') : ''
    }

    const handleUpdateUser = async (data) => {
        try {
            const studentId = data?.id
            delete data.id
            delete data.createdAt
            data.phone = data.phone
            data.gender = String(data.gender)

            if (!data?.birthday) delete data.birthday
            if (!(data?.avatar instanceof File) && data?.avatar !== null) delete data.avatar

            const fd = objectToFormData(data)

            const updatedUser = await updateUser(studentId, fd)
            queryClient.setQueryData(['user-course', courseId], (oldData) => ({ ...oldData, user: updatedUser }))
            queryClient.setQueriesData(['students'], oldData => ({
                ...oldData,
                pages: oldData?.pages?.map(page => ({
                    ...page,
                    items: page?.items?.map(item => {
                        if (item?.user?.id === courseId) {
                            item.user = updatedUser
                        }
                        return item
                    })
                }))
            }))
            toast.success("Malumotlar o'zgartirildi")
        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')
        }
    }

    return (
        <div className={cls.page}>
            {!isLoadingStudent ? (
                <>
                    <StudentInformationForm 
                        connectionDays={course?.days}
                        connectionTime={course?.connectionTime}
                        onSubmit={handleUpdateUser} 
                        defaultValues={studentFormData} 
                        courseId={courseId}
                    />
                    <SingleStudentCourse course={course} />
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