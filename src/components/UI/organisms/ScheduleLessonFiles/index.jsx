import { useRateStudentHomeWorkMutations } from "@/hooks/useLessonsSchedule"
import ScheduleLessonExercise from "../../moleculs/ScheduleLessonExercise"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const ScheduleLessonFiles = ({
    isLoading,
    studentSubmit,
    refetch
}) => {

    const { rateHomeWorkMutation } = useRateStudentHomeWorkMutations()
    const navigate = useNavigate()

    const handleRateHomeWork = async (data) => {
        if (data) {
            data.id = studentSubmit?.id
            await rateHomeWorkMutation.mutateAsync(data, {
                onSuccess: () => {
                    toast.success("O'quvchi Baholandi")
                    navigate(-1)
                    refetch()
                },
                onError: (err) => toast.error(err?.response?.data?.message || "Xatolik Yuz Berdi!")
            })
        }
    }

    return (
        <div>
            <ScheduleLessonExercise
                isLoading={isLoading}
                onSubmit={handleRateHomeWork}
                studentSubmit={studentSubmit}
            />
        </div>
    )
}

export default ScheduleLessonFiles