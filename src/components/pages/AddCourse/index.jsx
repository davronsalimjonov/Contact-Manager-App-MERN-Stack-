import CoursesForm from "@/components/UI/organisms/CoursesForm";
import { PAYMENT_LINK } from "@/constants";
import { queryClient } from "@/services/api";
import { addCourse } from "@/services/course";
import { objectToFormData } from "@/utils/lib";
import toast from "react-hot-toast";

const AddCourse = () => {
    const handleAddCourse = async (data) => {

        try {
            const paymentLinks = data?.paymentLinks;
            data.paymentLinks = paymentLinks.map(paymentLink => {
                const value = PAYMENT_LINK.find(link => link?.value === paymentLink);
                return ({
                    title: value?.label.toLocaleLowerCase(),
                    link: value?.value,
                })
            });
            if (!(data?.image instanceof File) && data?.image !== null) delete data.image;
           
            const fd = objectToFormData(data);
            console.log(fd.get('paymentLinks'),data);
            const addedCourse = await addCourse(fd)
            queryClient.setQueryData(['add-course'], addedCourse)
            toast.success("Yangi kurs qo'shildi!")
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
                image: "",
            }} btn={"Qo'shish"} onSubmit={(data) => { handleAddCourse(data) }} />


        </>
    )
}

export default AddCourse;