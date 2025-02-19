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

const GroupLessons = () => {
    const navigate = useNavigate()
    const { groupId } = useParams()
    const [videoUrl, setVideoUrl] = useState('')
    const [isOpenNewLessonModal, setIsOpenNewLessonModal] = useState(false)
    const { data: groupLesson, isLoading: isGroupLessonLoading } = useGetGroupLessons(groupId)
    const { data: groupInfo } = useGetGroupInfo(groupId)
console.log(groupInfo);

    const handleVideoPreview = (url) => {
        if(!url) return toast.error('Video topilmadi')
        setVideoUrl(url)
    }

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
                <Button onClick={() => setIsOpenNewLessonModal(true)}><PlusIcon width={20} height={20} /> Boshlash</Button>
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