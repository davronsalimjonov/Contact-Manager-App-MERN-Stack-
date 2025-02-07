import ScheduleHomeWorkCreateForm from "@/components/UI/organisms/ScheduleHomeWorkCreateForm"
import cls from "./ScheduleHomeworkCreate.module.scss"
import { useNavigate, useParams } from "react-router-dom"
import { objectToMultiPartFormData } from "@/utils/lib"
import toast from "react-hot-toast"
import { useHomeWorkMutations } from "@/hooks/useLessonsSchedule"

const ScheduleHomeworkCreate = () => {
  const { homeWorkId } = useParams()
  const { createHomeWorkMutation } = useHomeWorkMutations()
  const navigate = useNavigate()

  const handleCreateHomeWork = async (data) => {
    if (data) {
      data.lesson = homeWorkId
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