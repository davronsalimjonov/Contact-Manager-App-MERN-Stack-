import Loader from "@/components/UI/atoms/Loader";
import AddDiscount from "@/components/UI/organisms/AddDiscount";
import useGetCourseById from "@/hooks/useGetCourseById";
import { useState } from "react";
import { useParams } from "react-router-dom";
import cls from './UpdateCourse.module.scss';
import AllDiscounts from "@/components/UI/organisms/AllDiscounts";
import CoursesForm from "@/components/UI/organisms/CoursesForm";
import { PAYMENT_LINK } from "@/constants";
import {  updateCourse } from "@/services/course";
import toast from "react-hot-toast";
import { queryClient } from "@/services/api";
import { objectToFormData } from "@/utils/lib";


const UpdateCourse = () => {
    const { courseId } = useParams();
    const { data: course, isLoading: IsLoadingCourse } = useGetCourseById(courseId);
    const [isOpen, setIsOpen] = useState(false);

    const handleUpdateCourse = async (data) => {
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
console.log(data);  
            const fd = objectToFormData(data);
            const updatedCourse = await updateCourse(courseId, fd);
            queryClient.setQueryData(['course',courseId],oldData=>({...oldData, updatedCourse}));
            toast.success("Kurs ma'lumotlari o'zgartirildi!");

        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }


    return !IsLoadingCourse ? (
        <>
            <div className={cls.content}>
                <CoursesForm
                    className={cls.content__form}
                    onOpenDiscount={() => setIsOpen(true)}
                    defaultValue={{
                        title: course?.title,
                        link: course?.link,
                        paymentLink: course?.paymentLink,
                        paymentLinks: (course?.paymentLinks || []).map(link => link.link),
                        description: course?.description,
                        image: course?.image?.url,

                    }}
                    btn={"O'zgartirish"}
                    onSubmit={handleUpdateCourse}
                />

                {
                    course.prices && <AllDiscounts discounts={course.prices} courseId={courseId} />

                }
            </div>

            <AddDiscount
                isOpen={isOpen}
                onclose={() => setIsOpen(false)}
                courseId={courseId}
            />
        </>) : (<Loader />)

}

export default UpdateCourse;



