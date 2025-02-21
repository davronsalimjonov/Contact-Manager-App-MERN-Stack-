import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "@/components/UI/atoms/Loader"
import { useGetGroupLessons } from '@/hooks/useLessons'
import Button from "@/components/UI/atoms/Buttons/Button"
import EmptyData from "@/components/UI/organisms/EmptyData"
import LessonCard from '@/components/UI/moleculs/LessonCard'
import { PersonsIcon, PlusIcon } from "@/components/UI/atoms/icons"
import MediaPreviewer from '@/components/UI/moleculs/MediaPreviewer'
import CreateNewLessonForm from '@/components/UI/organisms/CreateNewLessonForm'
import cls from "./GroupLessons.module.scss"
import { useGetGroupInfo } from '@/hooks/useGroups'

function checkSchedule(scheduleData = [], now = new Date()) {
    // Получаем текущую дату и время
    // const now = new Date();
    const currentWeekday = now.getDay(); // 0 = воскресенье, 1 = понедельник, и т.д.
    
    // Преобразуем текущее время в минуты от начала дня
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    console.log(currentMinutes);
    
    // Форматируем текущую дату в строку YYYY-MM-DD для сравнения
    const currentDate = now.toISOString().split('T')[0];

    for (const lesson of scheduleData) {
        // Проверяем, есть ли перенос занятия на сегодня
        if (lesson.lessonScheduleMoves && lesson.lessonScheduleMoves.date === currentDate) {
            // Проверяем время до начала перенесенного занятия
            const minutesUntilStart = lesson.lessonScheduleMoves.startTime - currentMinutes;
            if (minutesUntilStart >= 0 && minutesUntilStart <= 10) {
                return true;
            }
            continue; // Пропускаем дальнейшие проверки для этого занятия
        }
        
        // Проверяем, не отменено ли занятие на сегодня
        if (lesson.lessonScheduleMoves && 
            lesson.lessonScheduleMoves.fromDate === currentDate) {
            continue; // Пропускаем это занятие
        }
        
        // Проверяем обычное расписание
        if (lesson.weekday === currentWeekday) {
            // Проверяем время до начала занятия
            const minutesUntilStart = lesson.startTime - currentMinutes;
            if (minutesUntilStart >= 0 && minutesUntilStart <= 10) {
                return true;
            }
        }
    }
    
    return false;
}

const GroupLessons = () => {
    const navigate = useNavigate()
    const { groupId } = useParams()
    const [videoUrl, setVideoUrl] = useState('')
    const [isOpenNewLessonModal, setIsOpenNewLessonModal] = useState(false)
    const { data: groupLesson, isLoading: isGroupLessonLoading } = useGetGroupLessons(groupId)
    const { data: groupInfo } = useGetGroupInfo(groupId)

    const handleVideoPreview = (url) => {
        if(!url) return toast.error('Video topilmadi')
        setVideoUrl(url)
    }
    // console.log(groupInfo?.lessonSchedules);
    // console.log(checkSchedule(groupInfo?.lessonSchedules, new Date('2025-02-17T08:50:00.000Z')));

    return (
        <div className={cls.lessons}>
            <CreateNewLessonForm 
                groupId={groupId}
                isOpen={isOpenNewLessonModal} 
                onClose={() => setIsOpenNewLessonModal(false)} 
            />
            <MediaPreviewer 
                visible={!!videoUrl}
                urls={[videoUrl]}
                onClose={() => setVideoUrl(null)}
            />
            <div className={cls.lessons__header}>
                <div className={cls.lessons__header__title}><PersonsIcon fill="var(--blue-color)" />{groupInfo?.title}</div>
                <Button 
                    onClick={() => setIsOpenNewLessonModal(true)}
                    disabled={checkSchedule(groupLesson?.lessonSchedules)}
                >
                        <PlusIcon width={20} height={20} /> Boshlash
                </Button>
            </div>
            <div className={cls.lessons__cards} >
                {!isGroupLessonLoading ? (
                    groupLesson?.length > 0 ? groupLesson?.map((lesson, index) => (
                        <LessonCard
                            key={lesson.id}
                            lessonNumber={index + 1}
                            title={lesson?.title}
                            date={lesson?.date}
                            duration={lesson?.duration}
                            isLive={lesson?.status === 'ongoing'}
                            onClick={() => navigate(lesson?.id)}
                            onClickVideo={() => handleVideoPreview(lesson?.video)}
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