import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useGetLessonInfo } from "@/hooks/useLessons"
import Button from "../../atoms/Buttons/Button"
import MediaPreviewer from "../../moleculs/MediaPreviewer"
import { ArrowRightIcon, BookPlayIcon, PlusIcon } from "../../atoms/icons"
import cls from "./LessonInfoCard.module.scss"

const LessonInfoCard = ({ lessonId = '' }) => {
    const navigate = useNavigate()
    const { data: lessonInfo } = useGetLessonInfo(lessonId)
    const [isOpenVideoModal, setIsOpenVideoModal] = useState(false)

    const lessonVideoUrl = lessonInfo?.video || ''

    return (
        <div className={cls.card}>
            <h2 className={cls.card__title}>
                <BookPlayIcon /> {lessonInfo?.title}
            </h2>
            <div className={cls.card__details}>
                <button className={cls.card__details__btn} onClick={() => lessonVideoUrl ? setIsOpenVideoModal(true) : toast.error('Video topilmadi')}>
                    Videoni Ko'rish <ArrowRightIcon />
                </button>
                {lessonInfo?.lessonHomeTask ? (
                    <button 
                        onClick={() => navigate(`hometask/${lessonInfo?.lessonHomeTask?.id}`)} 
                        className={cls.card__details__btn}
                    >
                        Vazifa <ArrowRightIcon />
                    </button>
                ) : (
                    <Button onClick={() => navigate(`create-homework`)}>Vazifa Yaratish <PlusIcon height={18} width={18} /></Button>
                )}
            </div>
            <MediaPreviewer
                visible={isOpenVideoModal}
                urls={[lessonVideoUrl]}
                setVisible={() => setIsOpenVideoModal(false)}
            />
        </div>
    )
}

export default LessonInfoCard