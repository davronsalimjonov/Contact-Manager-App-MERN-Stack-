import CoursesForm from "@/components/UI/organisms/CoursesForm";
import useGetCourseById from "@/hooks/useGetCourseById";
import { queryClient } from "@/services/api";
import { UpdateCourse } from "@/services/course";
import { updateEmployee } from "@/services/user";
import { objectToFormData } from "@/utils/lib";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateCourse = ({courseId}) => {
    const courseId = useParams();
const {data:course,isLoading:IsLoadingCourse}=useGetCourseById(courseId);


    const handleUpdateCourse = async (data) => {
        try {
            if (!(data?.avatar instanceof File) && data?.avatar !== null) delete data.avatar
            const fd = objectToFormData(data)
            const addedCourse = await UpdateCourse(fd)
            queryClient.setQueryData(['add-course'], addedCourse)
            toast.success('Malumotlar ozgartirildi')
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    return (
        <>
            <CoursesForm defaultValue={{
                title: course.title,
                link: course.link,
                paymentLink: course.paymentLink,
                description: course.description,
                image:course.image
            }} btn={"Qo'shish"} onSubmit={(data) => { handleUpdateCourse(data) }} />


        </>
    )
}

export default UpdateCourse;