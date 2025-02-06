import cls from "./SchduleDetails.module.scss"
import ScheduleCards from '@/components/UI/moleculs/ScheduleCards'
import { useNavigate, useParams } from 'react-router-dom'
import ScheduleLessonsBtns from '@/components/UI/moleculs/ScheduleLessonsBtns'
import { useGetMentorLessonsSchedule } from "@/hooks/useLessonsSchedule"
import dayjs from "dayjs"
import Loader from "@/components/UI/atoms/Loader"

const ScheduleLessons = () => {
    const navigate = useNavigate()
    const { groupId } = useParams()
    const { mentorGroupLesson: { data: groupLesson, refetch, isLoading: isGroupLessonLoading } } = useGetMentorLessonsSchedule()

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
                            onClick={() => navigate(`/schedule/homework/${lesson?.id}`)}
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