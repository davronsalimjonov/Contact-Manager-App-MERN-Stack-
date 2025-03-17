import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "@/components/UI/atoms/Loader"
import { useGetUserId } from '@/hooks/useGetUser'
import { useGetGroupInfo } from '@/hooks/useGroups'
import { convertMinutesFromUTC0 } from '@/utils/time'
import { useGetGroupLessons } from '@/hooks/useLessons'
import Button from "@/components/UI/atoms/Buttons/Button"
import EmptyData from "@/components/UI/organisms/EmptyData"
import LessonCard from '@/components/UI/moleculs/LessonCard'
import { PersonsIcon, PlusIcon } from "@/components/UI/atoms/icons"
import MediaPreviewer from '@/components/UI/moleculs/MediaPreviewer'
import CreateNewLessonForm from '@/components/UI/organisms/CreateNewLessonForm'
import cls from "./GroupLessons.module.scss"
import { redirectToPlatform } from '@/utils/lib'
import { useSocket } from '@/providers/SocketProvider'
import { useQueryClient } from 'react-query'
import { LESSON_STATUS_ENUMS } from '@/constants/enum'
import MediaMergingDialog from '@/components/templates/MediaMergingDialog'

function checkSchedule(data = []) {
    const scheduleData = JSON.parse(JSON.stringify(data))
    const beforeUntilStart = 10

    const now = new Date();
    const currentWeekday = now.getDay();

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const currentDate = now.toISOString().split('T')[0];

    for (const lesson of scheduleData) {
        lesson.startTime = convertMinutesFromUTC0(lesson.startTime);
        lesson.endTime = convertMinutesFromUTC0(lesson.endTime);

        if (lesson.lessonScheduleMoves) {
            lesson.lessonScheduleMoves.startTime = convertMinutesFromUTC0(lesson.lessonScheduleMoves?.startTime);
            lesson.lessonScheduleMoves.endTime = convertMinutesFromUTC0(lesson.lessonScheduleMoves?.endTime);
        }


        if (lesson.lessonScheduleMoves && lesson.lessonScheduleMoves.date === currentDate) {
            const minutesUntilStart = lesson.lessonScheduleMoves.startTime - currentMinutes;
            const afterUntilStart = lesson.lessonScheduleMoves.startTime - lesson.lessonScheduleMoves.endTime;

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
            const afterUntilStart = lesson.startTime - lesson.endTime;
            if (minutesUntilStart <= beforeUntilStart && minutesUntilStart >= afterUntilStart) {
                return true;
            }
        }
    }

    return false;
}

const GroupLessons = () => {
    const { socket } = useSocket()
    const { groupId } = useParams()
    const navigate = useNavigate()
    const mentorId = useGetUserId()
    const queryClient = useQueryClient()
    const [videoUrl, setVideoUrl] = useState('')
    const [videoStatus, setVideoStatus] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenNewLessonModal, setIsOpenNewLessonModal] = useState(false)
    const { data: groupLesson, isLoading: isGroupLessonLoading } = useGetGroupLessons(groupId)
    const { data: groupInfo } = useGetGroupInfo(groupId)

    const handleVideoPreview = (url) => {
        if (!url) return toast.error('Video topilmadi')
        setVideoUrl(url)
    }

    const isLessonAvailable = checkSchedule(groupInfo?.lessonSchedules);

    useEffect(() => {
        if (socket && !socket.hasListeners('live-lesson-end')) {
            socket.on('live-lesson-end', data => {
                const groupId = data?.groupId
                const lessonId = data?.lessonId
                queryClient.setQueryData(['lessons', groupId], (oldData) => {
                    return oldData?.map(lesson => lesson?.id === lessonId ? { ...lesson, status: LESSON_STATUS_ENUMS.FINISHED } : lesson)
                })
            })
        }
    }, [socket])
    
    return (
        <div className={cls.lessons}>
            <CreateNewLessonForm
                groupId={groupId}
                isOpen={isOpenNewLessonModal}
                onClose={() => setIsOpenNewLessonModal(false)}
            />
            {videoStatus === "merging" ?
                <MediaMergingDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
                : <MediaPreviewer
                    visible={!!videoUrl}
                    urls={[videoUrl]}
                    setVisible={() => setVideoUrl('')}
                />
            }
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
                            isLive={lesson?.status === LESSON_STATUS_ENUMS.ONGOING}
                            videoStatus={lesson?.videoStatus}
                            setVideoStatus={setVideoStatus}
                            setIsOpen={setIsOpen}
                            onClick={() => navigate(lesson?.id)}
                            onClickVideo={() => handleVideoPreview(lesson?.video)}
                            onClickLesson={() => redirectToPlatform(lesson?.mentorUrl, mentorId)}
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
