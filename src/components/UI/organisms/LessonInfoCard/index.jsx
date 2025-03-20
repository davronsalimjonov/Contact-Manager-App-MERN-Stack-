import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGetLessonInfo } from "@/hooks/useLessons"
import MediaMergingDialog from "@/components/templates/MediaMergingDialog"
import Button from "../../atoms/Buttons/Button"
import MediaPreviewer from "../../moleculs/MediaPreviewer"
import { ArrowRightIcon, BookPlayIcon, PlusIcon } from "../../atoms/icons"
import cls from "./LessonInfoCard.module.scss"

const LessonInfoCard = ({ lessonId = '' }) => {
    const navigate = useNavigate()
    const { data: lessonInfo } = useGetLessonInfo(lessonId)
    const [videoPreview, setVideoPreview] = useState({ isOpen: false, status: null, url: '' })

    return (
        <div className={cls.card}>
            <h2 className={cls.card__title}>
                <BookPlayIcon /> {lessonInfo?.title}
            </h2>
            <div className={cls.card__details}>
                <button 
                    className={cls.card__details__btn} 
                    onClick={() => setVideoPreview({ isOpen: true, status: lessonInfo?.videoStatus, url: lessonInfo?.video })}
                >
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
            {videoPreview?.status === 'merging' ? (
                <MediaMergingDialog
                    isOpen={videoPreview?.isOpen}
                    onClose={() => setVideoPreview({ isOpen: false, status: null, url: '' })}
                />
            ): (
                <MediaPreviewer
                    visible={videoPreview?.isOpen}
                    urls={[videoPreview?.url]}
                    setVisible={() => setVideoPreview({ isOpen: false, status: null, url: '' })}
                />
            )}
        </div>
    )
}

export default LessonInfoCard