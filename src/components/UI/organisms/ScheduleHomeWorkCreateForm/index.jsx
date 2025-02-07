import { useForm } from "react-hook-form"
import Button from "../../atoms/Buttons/Button"
import { UploadIcon } from "../../atoms/icons"
import CustomFormFilePicker from "../../moleculs/Form/CustomFormFilePicker"
import FormInput from "../../moleculs/Form/FormInput"
import FormTextArea from "../../moleculs/Form/FormTextArea"
import cls from "./ScheduleHomeWorkCreateForm.module.scss"
import { useEffect } from "react"

const ScheduleHomeWorkCreateForm = ({
    onSubmit
}) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful }, setValue } = useForm()

    useEffect(() => {
        register('files', { required: 'Material kiritilishi shart' })
    }, [register])

    useEffect(() => {
        if (isSubmitSuccessful) reset()
    }, [isSubmitSuccessful])

    return (
        <form className={cls.ScheduleHomeWorkCreateForm} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                label={`Title`}
                placeholder={'Title Kiriting'}
                register={register('title', { required: "Dars Nomini Kiriting" })}
                error={errors?.title?.message}
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
                isMulti={true}
            />
            <FormTextArea
                label={'Description'}
                placeholder={'Description Kiriting'}
                register={register('description', { required: "Darsga ta'rif kiriting!"})}
                error={errors?.description?.message}
            />
            <div className={cls.ScheduleHomeWorkCreateForm__submit}>
                <Button 
                    type="submit"
                    isLoading={isSubmitting}
                >Yaratish</Button>
            </div>
        </form>
    )
}

export default ScheduleHomeWorkCreateForm