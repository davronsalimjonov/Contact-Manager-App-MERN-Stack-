import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { objectToMultiPartFormData } from "@/utils/lib"
import ScheduleHomeWorkCreateForm from "@/components/UI/organisms/ScheduleHomeWorkCreateForm"
import cls from "./CreateLessonHomework.module.scss"

const CreateLessonHomework = () => {

  return (
    <div className={cls.form}>
      <h1>Vazifa Yaratish</h1>
    </div>
  )
}

export default CreateLessonHomework;