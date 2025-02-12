import { useForm } from "react-hook-form"
import Button from "../../atoms/Buttons/Button"
import { UploadIcon } from "../../atoms/icons"
import CustomFormFilePicker from "../../moleculs/Form/CustomFormFilePicker"
import FormInput from "../../moleculs/Form/FormInput"
import FormTextArea from "../../moleculs/Form/FormTextArea"
import cls from "./ScheduleHomeWorkCreateForm.module.scss"
import { useEffect } from "react"
import { useGetMentorLessonsSchedule } from "@/hooks/useLessonsSchedule"
import Loader from "../../atoms/Loader"

const ScheduleHomeWorkCreateForm = ({
    onSubmit
}) => {
    const pathname = location.pathname
    const { singleMentorHomeTask: {data: homeTask, isLoading: isHomeTaskLoading}} = useGetMentorLessonsSchedule()
    const { register, handleSubmit, reset,  formState: { errors, isSubmitting, isSubmitSuccessful, isDirty }, setValue } = useForm()

    useEffect(() => {
        register('files', { required: 'Material kiritilishi shart' })
    }, [register])

    useEffect(() => {
        if (isSubmitSuccessful) reset()
    }, [isSubmitSuccessful])

    return (
        isHomeTaskLoading ? <Loader /> : (
            <form className={cls.ScheduleHomeWorkCreateForm} onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label={`Title`}
                    placeholder={'Title Kiriting'}
                    register={{...register('title', { required: "Dars Nomini Kiriting" })}}
                    error={errors?.title?.message}
                    defaultValue={homeTask?.title}
                />
                <CustomFormFilePicker
                    label='Material'
                    placeholder={(
                        <div className={cls.ScheduleHomeWorkCreateForm__files__placeholder}>
                            <p>File Kiriting</p>
                            <UploadIcon />
                        </div>
                    )}
                    accept='image/*, application/pdf, video/*, audio/*, .doc, .docx'
                    onChange={(files) => setValue('files', files, { shouldDirty: true, shouldValidate: true })}
                    error={errors.files?.message}
                    isMulti={homeTask && true}
                    defaultFile={homeTask?.lessonFiles}
                />
                <FormTextArea
                    label={'Description'}
                    placeholder={'Description Kiriting'}
                    register={{...register('description', { required: "Darsga ta'rif kiriting!"})}}
                    error={errors?.description?.message}
                    defaultValue={homeTask?.description}
                />
                <div className={cls.ScheduleHomeWorkCreateForm__submit}>
                    <Button 
                        type="submit"
                        isLoading={isSubmitting}
                        disabled={!isDirty}
                    >{pathname.startsWith("/schedule/homework/view/") ? "O'zgartirish" : "Yaratish"}</Button>
                </div>
            </form>
        )
    )
}

export default ScheduleHomeWorkCreateForm