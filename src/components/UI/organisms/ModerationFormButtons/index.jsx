import { useForm } from "react-hook-form";
import RadioButton from "../../atoms/Form/RadioButton";
import { useEffect } from "react";
import { queryClient } from "@/services/api";
import toast from "react-hot-toast";
import { changeIsActiveCourseRate } from "@/services/course";

const ModerationFormButtons = ({
    preffix1,
    preffix2,
    label1,
    label2,
    classNameForm,
    classNameLabel,
    classNameRadio,
    commentId,
    courseId,
    params,
    onClose
}) => {
    const { register, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
    });

    const selectedOption = watch('isActive', '');

    const onSubmit = async ({ isActive }) => {
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


        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }


    useEffect(() => {
        if (selectedOption) {
            handleSubmit(onSubmit)();
            onClose && onClose();
        }
    }, [selectedOption, handleSubmit, onSubmit]);

    return (
        <form className={classNameForm}>
            <RadioButton
                label={label1}
                className={classNameLabel}
                radioClassName={classNameRadio}
                register={{ ...register('isActive') }}
                value={true}
                preffix={preffix1}
            />

            <RadioButton
                label={label2}
                className={classNameLabel}
                radioClassName={classNameRadio}
                register={{ ...register('isActive') }}
                value={false}
                preffix={preffix2}
            />
        </form>)
}

export default ModerationFormButtons;