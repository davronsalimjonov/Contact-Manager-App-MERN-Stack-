import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { objectToMultiPartFormData } from "@/utils/lib"
import ScheduleHomeWorkCreateForm from "@/components/UI/organisms/ScheduleHomeWorkCreateForm"
import { useHomeWorkMutations, useUpdateHomeWorkMutations } from "@/hooks/useLessonsSchedule"
import cls from "./ScheduleHomeworkCreate.module.scss"

const ScheduleHomeworkCreate = () => {
  const { lessonId } = useParams()
  const { createHomeWorkMutation } = useHomeWorkMutations()
  const { updateHomeWorkMutation } = useUpdateHomeWorkMutations()
  const navigate = useNavigate()
  const pathname = location.pathname
  const { lessonHomeTaskId } = useParams()
  console.log(lessonHomeTaskId);
  

  const handleCreateHomeWork = async (data) => {
    if (data) {
      data.lesson = lessonId
      const fd = objectToMultiPartFormData({...data})
      fd.delete('files')

      await createHomeWorkMutation.mutateAsync(fd, {
        onSuccess: () => {
          toast.success("Dars Yaratildi")
          navigate(-1)
        },
        onError: (err) => toast.error(err?.response?.data?.message || "Xatolik Yuz Berdi!")
      })
    }
  }

  const handleUpdateHomeWork = async (data) => {
    if (data) {
      const fd = objectToMultiPartFormData({...data})
      fd.delete('files')
      const id = lessonHomeTaskId

      await updateHomeWorkMutation.mutateAsync({id, ...fd}, {
        onSuccess: () => {
          toast.success("Dars O'zgartirildi")
          navigate(-1)
        },
        onError: (err) => toast.error(err?.response?.data?.message || "Xatolik Yuz Berdi!")
      })
    }
  }

  return (
    <div className={cls.ScheduleHomeworkCreate}>
      <h1>Vazifa Yaratish</h1>
      <ScheduleHomeWorkCreateForm
        onSubmit={pathname.startsWith("/schedule/homework/view/") ? handleUpdateHomeWork : handleCreateHomeWork}
      />
    </div>
  )
}

export default ScheduleHomeworkCreate