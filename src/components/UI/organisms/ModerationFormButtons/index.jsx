import { useForm } from "react-hook-form";
import RadioButton from "../../atoms/Form/RadioButton";
import { useEffect } from "react";
import { queryClient } from "@/services/api";
import toast from "react-hot-toast";
import { changeIsActiveCourseRate } from "@/services/course";
import Button from "../../atoms/Buttons/Button";

const ModerationFormButtons = ({
    preffix1,
    preffix2,
    label1,
    label2,
    classNameForm,
    classNameLabel,
    commentId,
    courseId,
    params,
    onClose
}) => {

    const onSubmit = async (isActive) => {
        try {
            const updatedCourse = await changeIsActiveCourseRate(commentId, isActive);



            queryClient.setQueriesData(['course-rate', courseId], oldData => {
                return {
                    ...oldData,
                    items: oldData?.items?.filter(obj => obj.id !== commentId)
                }
            });
            toast.success("Komentariya aktivligi o'zgartirildi!");
            queryClient.setQueriesData(['course-rate', courseId, { ...params, isActive: isActive }], oldData => {
                return {
                    ...oldData,
                    items: [...oldData?.items, updatedCourse]
                }
            });
            onClose&&onClose();

        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    return (
        <div className={classNameForm}>
            <Button
                className={classNameLabel}
                onClick={() => onSubmit(true)}
            >{label1}{preffix1}</Button>
            <Button
                onClick={() => onSubmit(false)}
                className={classNameLabel}
            >{label2}{preffix2}
            </Button>
        </div>
    )
}

export default ModerationFormButtons;