import { objectToMultiPartFormData } from "@/utils/lib"
import ScheduleHomeWorkCreateForm from "@/components/UI/organisms/ScheduleHomeWorkCreateForm"
import cls from "./CreateLessonHomework.module.scss"
import Button from "@/components/UI/atoms/Buttons/Button"

const CreateLessonHomework = () => {

  return (
    <div className={cls.form}>
      <h1 className={cls.form__title}>Vazifa Yaratish</h1>
      <div className={cls.form__elements}>
    
      </div>
      <Button className={cls.form__btn}>Yaratish</Button>
    </div>
  )
}

export default CreateLessonHomework;