import cls from "./SchduleDetails.module.scss"
import ScheduleCards from '@/components/UI/moleculs/ScheduleCards'
import { useNavigate } from 'react-router-dom'
import ScheduleLessonsBtns from '@/components/UI/moleculs/ScheduleLessonsBtns'
import { useGetMentorLessonsSchedule } from "@/hooks/useLessonsSchedule"
import dayjs from "dayjs"

const ScheduleLessons = () => {
    const navigate = useNavigate()
    const { mentorGroupLesson: { data: groupLesson, refetch } } = useGetMentorLessonsSchedule()

    return (
        <div className={cls.ScheduleLessons}>
            <div className={cls.ScheduleLessons__btns}>
                <ScheduleLessonsBtns
                    refetch={refetch}
                />
            </div>
            <div className={cls.ScheduleLessons__cards} >
                {groupLesson && groupLesson?.map((lesson) => {
                    return (
                        <ScheduleCards
                            key={lesson.id}  
                            onClick={() => navigate('/schedule/table')}
                            title={lesson?.title}
                            description={lesson?.description}
                            date={dayjs(lesson?.date).format('DD.MM.YYYY')}
                            duration={lesson?.duration}
                            video={lesson?.video}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default ScheduleLessons