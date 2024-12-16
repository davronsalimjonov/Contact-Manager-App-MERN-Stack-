import Loader from "@/components/UI/atoms/Loader";
import AddDiscount from "@/components/UI/organisms/AddDiscount";
import CoursesForm from "@/components/UI/organisms/CoursesForm";
import { PAYMENT_LINK } from "@/constants";
import useGetCourseById from "@/hooks/useGetCourseById";
import { queryClient } from "@/services/api";
import { updateCourse } from "@/services/course";
import { objectToFormData } from "@/utils/lib";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateCourse = () => {
    const { courseId } = useParams();
    const { data: course, isLoading: IsLoadingCourse } = useGetCourseById(courseId);
    const [isOpen, setIsOpen] = useState(false);

    const handleUpdateCourse = async (data) => {
        console.log(data);
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
            const updatedCourse = await updateCourse(courseId, fd)
            queryClient.setQueryData(['courses'], oldData => oldData.map(obj => obj.id === courseId ? updatedCourse : obj));
            toast.success("Ma'lumotlar o'zgartirildi!");
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    return !IsLoadingCourse ? (
        <><CoursesForm
            onOpenDiscount={() => setIsOpen(true)}
            defaultValue={{
                title: course?.title,
                link: course?.link,
                paymentLink: course?.paymentLink,
                paymentLinks: (course?.paymentLinks || []).map(link => link.link),
                description: course?.description,
                image: course?.image?.url,

            }}
            discount={course.prices}
            courseId={course?.id}
            btn={"O'zgartirish"}
            onSubmit={(data) => handleUpdateCourse(data)}
        />
            <AddDiscount
                isOpen={isOpen}
                onclose={() => setIsOpen(false)}
                courseId={courseId}
            />
        </>) : (<Loader />)

}

export default UpdateCourse;