import CoursesForm from "@/components/UI/organisms/CoursesForm";
import { queryClient } from "@/services/api";
import { addCourse } from "@/services/course";
import { updateEmployee } from "@/services/user";
import { objectToFormData } from "@/utils/lib";
import toast from "react-hot-toast";

const AddCourse = () => {
    const handleAddCourse = async (data) => {
        try {
            if (!(data?.avatar instanceof File) && data?.avatar !== null) delete data.avatar
            const fd = objectToFormData(data)
            const addedCourse = await addCourse(fd)
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
                title: "",
                link: "",
                paymentLink: "",
                description: "",
                image:"",
            }} btn={"Qo'shish"} onSubmit={(data) => { handleAddCourse(data) }} />


        </>
    )
}

export default AddCourse;