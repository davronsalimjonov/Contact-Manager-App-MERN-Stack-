import { useRateStudentHomeWorkMutations } from "@/hooks/useLessonsSchedule"
import ScheduleLessonExercise from "../../moleculs/ScheduleLessonExercise"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

const ScheduleLessonFiles = ({
    video = '',
    files = [],
    title = "",
    description = "",
    isLoading,
    homeWorkId,
    mark,
    details={},
    refetch
}) => {

    const { rateHomeWorkMutation } = useRateStudentHomeWorkMutations()
    const navigate = useNavigate()

    const handleRateHomeWork = async (data) => {
        if (data) {
            data.id = homeWorkId
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
                title={title}
                description={description}
                files={files}
                isLoading={isLoading}
                video={video}
                onSubmit={handleRateHomeWork}
                mark={mark}
                details={details}
            />
        </div>
    )
}

export default ScheduleLessonFiles