import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useGetLessonInfo } from "@/hooks/useLessons"
import Button from "../../atoms/Buttons/Button"
import MediaPreviewer from "../../moleculs/MediaPreviewer"
import { ArrowRightIcon, BookPlayIcon, PlusIcon } from "../../atoms/icons"
import cls from "./LessonInfoCard.module.scss"
import MediaMergingDialog from "@/components/templates/MediaMergingDialog"

const LessonInfoCard = ({ lessonId = '' }) => {
    const navigate = useNavigate()
    const { data: lessonInfo } = useGetLessonInfo(lessonId)
    const [isOpenVideoModal, setIsOpenVideoModal] = useState(false)
    const [videoPreview, setVideoPreview] = useState({ isOpen: false, status: null, url: '' })
    const lessonVideoUrl = lessonInfo?.video || ''

    return (
        <div className={cls.card}>
            <h2 className={cls.card__title}>
                <BookPlayIcon /> {lessonInfo?.title}
            </h2>
            <div className={cls.card__details}>
                <button className={cls.card__details__btn} onClick={() => {
                    lessonInfo.videoStatus === "merging" ? setVideoPreview({ isOpen: true, status: null, url: '' }) :  (lessonVideoUrl ? setIsOpenVideoModal(true) : toast.error('Video topilmadi')) && setVideoPreview({ isOpen: false, status: null, url: '' })
                }}>
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
            <MediaMergingDialog
                isOpen={videoPreview?.isOpen}
                onClose={() => setVideoPreview({ isOpen: false, status: null, url: '' })}
            />
        </div>
    )
}

export default LessonInfoCard