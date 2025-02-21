import { useEffect } from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { objectToFormData } from "@/utils/lib"
import { useNavigate, useParams } from "react-router-dom"
import Button from "@/components/UI/atoms/Buttons/Button"
import FormInput from "@/components/UI/moleculs/Form/FormInput"
import { useCreateLessonHomeWorkMutation } from "@/hooks/useLessons"
import FormTextArea from "@/components/UI/moleculs/Form/FormTextArea"
import FormMultipleFilePicker from "@/components/UI/moleculs/Form/FormMultipleFilePicker"
import cls from "./CreateLessonHomework.module.scss"
import { MEDIA_FILES_TYPES } from "@/constants"

const CreateLessonHomework = () => {
  const navigate = useNavigate()
  const { lessonId } = useParams()
  const createLessonHomeWorkMutation = useCreateLessonHomeWorkMutation()
  const { register, setValue, formState: { errors, isSubmitting, isDirty }, handleSubmit } = useForm()

  useEffect(() => {
    register('files', { required: 'Fayl tanlang' })
  }, [])

  const handleSubmitForm = async (data) => {
    data.lesson = lessonId
    const fd = objectToFormData(data)
    await createLessonHomeWorkMutation.mutateAsync(fd, {
      onSuccess: () => {
        toast.success('Vazifa qo\'shildi')
        navigate(-1)
      },
      onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
    })

  }

  return (
    <form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
      <h1 className={cls.form__title}>Vazifa Yaratish</h1>
      <div className={cls.form__elements}>
        <FormInput
          label="Vazifa nomi"
          placeholder="Title kiriting"
          register={register('title', { required: 'Title kiritilishi shart' })}
          error={errors.title?.message}
        />
        <FormMultipleFilePicker
          label='Fayl'
          accept={MEDIA_FILES_TYPES}
          placeholder="Fayl tanlang"
          onChange={files => setValue('files', files, { shouldDirty: true, shouldValidate: true })}
          error={errors.files?.message}
        />
        <FormTextArea
          label="Description"
          placeholder='Description kiriting'
          register={register('description', { required: 'Description kiritilishi shart' })}
          error={errors.description?.message}
        />
      </div>
      <Button
        type='submit'
        disabled={!isDirty}
        isLoading={isSubmitting}
        className={cls.form__btn}
      >
        Yaratish
      </Button>
    </form>
  )
}

export default CreateLessonHomework;