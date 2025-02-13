import dayjs from "dayjs"
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "@/components/UI/atoms/Loader"
import { useGetGroupLessons } from "@/hooks/useLessonsSchedule"
import ScheduleCards from '@/components/UI/moleculs/ScheduleCards'
import ScheduleLessonsBtns from '@/components/UI/moleculs/ScheduleLessonsBtns'
import cls from "./SchduleDetails.module.scss"

const ScheduleLessons = () => {
    const navigate = useNavigate()
    const { groupId } = useParams()
    const { data: groupLesson, refetch, isLoading: isGroupLessonLoading } = useGetGroupLessons(groupId)

    return (
        <div className={cls.ScheduleLessons}>
            <div className={cls.ScheduleLessons__btns}>
                <ScheduleLessonsBtns
                    refetch={refetch}   
                    groupId={groupId}
                />
            </div>
            <div className={cls.ScheduleLessons__cards} >
                {!isGroupLessonLoading ? groupLesson?.map((lesson) => {
                    return (
                        <ScheduleCards
                            key={lesson.id}
                            onClick={() => navigate(lesson?.id)}
                            title={lesson?.title}
                            description={lesson?.description}
                            date={dayjs(lesson?.date).format('DD.MM.YYYY')}
                            duration={lesson?.duration}
                            video={lesson?.video}
                        />
                    );
                }) : <Loader />}
            </div>
        </div>
    )
}

export default ScheduleLessons