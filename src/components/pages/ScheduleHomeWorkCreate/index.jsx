import ScheduleHomeWorkCreateForm from "@/components/UI/organisms/ScheduleHomeWorkCreateForm"
import cls from "./ScheduleHomeworkCreate.module.scss"
import { useParams } from "react-router-dom"
import { objectToFormData } from "@/utils/lib"
import toast from "react-hot-toast"
import { useHomeWorkMutations } from "@/hooks/useLessonsSchedule"

const ScheduleHomeworkCreate = () => {
  const { homeWorkId } = useParams()
  const { createHomeWorkMutation } = useHomeWorkMutations()

  const handleCreateHomeWork = async (data) => {
    if (data) {
      data.lesson = homeWorkId
      const fd = objectToFormData({...data})

      await createHomeWorkMutation.mutateAsync(fd, {
        onSuccess: () => {
          toast.success("Dars Yaratildi")
        },
        onError: toast.error("Xatolik Yuz Berdi!")
      })
    }
  }

  return (
    <div className={cls.ScheduleHomeworkCreate}>
      <h1>Vazifa Yaratish</h1>
      <ScheduleHomeWorkCreateForm
        onSubmit={handleCreateHomeWork}
      />
    </div>
  )
}

export default ScheduleHomeworkCreate