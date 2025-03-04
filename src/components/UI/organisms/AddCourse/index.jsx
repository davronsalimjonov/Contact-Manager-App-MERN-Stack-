import Dialog from "@/components/UI/moleculs/Dialog";
import CoursesForm from "@/components/UI/organisms/CoursesForm";
import { PAYMENT_LINK } from "@/constants";
import { queryClient } from "@/services/api";
import { addCourse, getAllCourses } from "@/services/course";
import { objectToFormData } from "@/utils/lib";
import toast from "react-hot-toast";
import cls from './AddCourse.module.scss';

const AddCourse = ({
    isOpen,
    onclose
}) => {
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
            const addedCourse = await addCourse(fd)
            queryClient.setQueryData(['courses'], oldData => [...oldData, addedCourse]);
            toast.success("Yangi kurs qo'shildi!");
            onclose();
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    return (
        <Dialog isOpen={isOpen} onClose={onclose}>
            <div className={cls.content}>
                <CoursesForm defaultValue={{
                    title: "",
                    link: "",
                    paymentLink: "",
                    description: "",
                    image: "",
                }} btn={"Qo'shish"} onSubmit={(data) => { handleAddCourse(data) }} />
            </div>
        </Dialog>
    )
}

export default AddCourse;