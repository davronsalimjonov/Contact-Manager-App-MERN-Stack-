import ScheduleHomeWorkCreateForm from "@/components/UI/organisms/ScheduleHomeWorkCreateForm"
import cls from "./ScheduleHomeworkCreate.module.scss"

const ScheduleHomeworkCreate = () => {
  return (
    <div className={cls.ScheduleHomeworkCreate}>
        <h1>Vazifa Yaratish</h1>
        <ScheduleHomeWorkCreateForm />
    </div>
  )
}

export default ScheduleHomeworkCreate