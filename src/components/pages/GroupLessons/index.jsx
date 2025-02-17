import dayjs from "dayjs"
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "@/components/UI/atoms/Loader"
import { useGetGroupLessons } from "@/hooks/useLessonsSchedule"
import ScheduleCards from '@/components/UI/moleculs/LessonCard'
import Button from "@/components/UI/atoms/Buttons/Button"
import { PersonsIcon, PlusIcon } from "@/components/UI/atoms/icons"
import cls from "./GroupLessons.module.scss"
import EmptyData from "@/components/UI/organisms/EmptyData"

const GroupLessons = () => {
    const navigate = useNavigate()
    const { groupId } = useParams()
    const { data: groupLesson, isLoading: isGroupLessonLoading } = useGetGroupLessons(groupId)
    console.log(groupLesson);

    return (
        <div className={cls.lessons}>
            <div className={cls.lessons__header}>
                <div className={cls.lessons__header__title}><PersonsIcon fill="var(--blue-color)" /> A2 level</div>
                <Button><PlusIcon width={20} height={20} /> Boshlash</Button>
            </div>
            <div className={cls.lessons__cards} >
                {!isGroupLessonLoading ? (
                    groupLesson?.length > 0 ? groupLesson?.map((lesson, index) => (
                        <ScheduleCards
                            key={lesson.id}
                            lessonNumber={index + 1}
                            title={lesson?.title}
                            date={lesson?.date}
                            duration={lesson?.duration}
                            video={lesson?.video}
                            onClick={() => navigate(lesson?.id)}
                        />
                    )) : (
                        <EmptyData />
                    )
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    )
}

export default GroupLessons;