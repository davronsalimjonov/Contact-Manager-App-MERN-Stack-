import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { objectToFormData } from "@/utils/lib"
import { useCreateLessonHomeWorkMutation } from "@/hooks/useLessons"
import LessonHomeworkForm from "@/components/UI/organisms/LessonHomeworkForm"

const CreateLessonHomework = () => {
  const navigate = useNavigate()
  const { lessonId } = useParams()
  const createLessonHomeWorkMutation = useCreateLessonHomeWorkMutation()

  const createLessonHomeWork = async (data) => {
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
    <LessonHomeworkForm onSubmit={createLessonHomeWork} />
  )
}

export default CreateLessonHomework;