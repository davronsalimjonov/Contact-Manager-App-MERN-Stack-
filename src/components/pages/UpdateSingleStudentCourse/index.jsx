import Loader from "@/components/UI/atoms/Loader";
import SingleStudentCourseForm from "@/components/UI/organisms/SingleStudentCourseForm";
import useGetStudentCourseById from "@/hooks/useGetStudentCourseById";
import { updateUserCourse } from "@/services/course";
import { useParams } from "react-router-dom";

const UpdateSingleStudentCourse = () => {
    const { courseId } = useParams();
    const { data: course, isLoading: isLoadingCourse } = useGetStudentCourseById(courseId);


    const defaultValues = {
        course: course?.course?.id,
        startDate: course?.startDate,
        endDate: course?.endDate,
        login: course?.login,
        password: course?.password,
        teacher: course?.teacher?.id,
        secondTeacher: course?.secondTeacher?.id,
        status: course?.status,
        level: course?.level,
    }


    const onSubmit = async (data) => {

        try {
            const updatedCourse = await updateUserCourse(courseId, data);
            queryClient.setQueryData(['user-course', courseId], updatedCourse);
            toast.success("Ma'lumotlar o'zgartirildi!");
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    if (isLoadingCourse) <Loader />

    return (
        <>
            <SingleStudentCourseForm defaultValues={defaultValues} onSubmit={onSubmit} />
        </>
    )
}

export default UpdateSingleStudentCourse;