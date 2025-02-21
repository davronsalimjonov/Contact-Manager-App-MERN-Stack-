import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "@/components/UI/atoms/Loader"
import { useGetGroupInfo } from '@/hooks/useGroups'
import { useGetGroupLessons } from '@/hooks/useLessons'
import Button from "@/components/UI/atoms/Buttons/Button"
import EmptyData from "@/components/UI/organisms/EmptyData"
import LessonCard from '@/components/UI/moleculs/LessonCard'
import { PersonsIcon, PlusIcon } from "@/components/UI/atoms/icons"
import MediaPreviewer from '@/components/UI/moleculs/MediaPreviewer'
import CreateNewLessonForm from '@/components/UI/organisms/CreateNewLessonForm'
import cls from "./GroupLessons.module.scss"
import { useGetUserId } from '@/hooks/useGetUser'

function checkSchedule(scheduleData = []) {
    const beforeUntilStart = 10
    const afterUntilStart = -30
    
    const now = new Date();
    const currentWeekday = now.getDay();
    
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const currentDate = now.toISOString().split('T')[0];

    for (const lesson of scheduleData) {
        if (lesson.lessonScheduleMoves && lesson.lessonScheduleMoves.date === currentDate) {
            const minutesUntilStart = lesson.lessonScheduleMoves.startTime - currentMinutes;
            
            if (minutesUntilStart <= beforeUntilStart && minutesUntilStart >= afterUntilStart) {
                return true;
            }
            continue;
        }
        
        if (lesson.lessonScheduleMoves && 
            lesson.lessonScheduleMoves.fromDate === currentDate) {
            continue;
        }
        
        if (lesson.weekday === currentWeekday) {
            const minutesUntilStart = lesson.startTime - currentMinutes;
            if (minutesUntilStart <= beforeUntilStart && minutesUntilStart >= afterUntilStart) {
                return true;
            }
        }
    }
    
    return false;
}

const GroupLessons = () => {
    const navigate = useNavigate()
    const mentorId = useGetUserId()
    const { groupId } = useParams()
    const [videoUrl, setVideoUrl] = useState('')
    const [isOpenNewLessonModal, setIsOpenNewLessonModal] = useState(false)
    const { data: groupLesson, isLoading: isGroupLessonLoading } = useGetGroupLessons(groupId)
    const { data: groupInfo } = useGetGroupInfo(groupId)

    const redirectToPlatform = (url = '') => {
        const link = new URL(url)
        link.searchParams.set('user', mentorId)
        window.open(link.toString(), '_blank')
    }

    const handleVideoPreview = (url) => {
        if(!url) return toast.error('Video topilmadi')
        setVideoUrl(url)
    }

    const isLessonAvailable = checkSchedule(groupInfo?.lessonSchedules);

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
                setVisible={() => setVideoUrl('')}
            />
            <div className={cls.lessons__header}>
                <div className={cls.lessons__header__title}><PersonsIcon fill="var(--blue-color)" />{groupInfo?.title}</div>
                <Button 
                    onClick={() => setIsOpenNewLessonModal(true)}
                    disabled={!isLessonAvailable}
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
                            onClickLesson={() => redirectToPlatform(lesson?.url)}
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