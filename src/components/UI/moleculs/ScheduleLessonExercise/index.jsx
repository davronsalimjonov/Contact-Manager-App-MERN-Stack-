import { useEffect, useState } from 'react'
import Button from '../../atoms/Buttons/Button'
import Rater from '../../atoms/Rater'
import FormTextArea from '../Form/FormTextArea'
import cls from "./ScheduleLessonExercise.module.scss"
// import ScheduleLessonDialog from '../ScheduleLessonDialog'
import MaterialPreviewModal from '../../organisms/MaterialPreviewModal'
import Loader from '../../atoms/Loader'
import FilePreviewItem from '../FilePreviewItem'
// import VideoPlayer from '../../atoms/VideoPlayer'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getFileCategory } from '@/utils/lib'

const ScheduleLessonExercise = ({
    isLoading,
    onSubmit,
    studentSubmit
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [previewMaterial, setPreviewMaterial] = useState({ isFileOpen: false, material: null })
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting, isSubmitSuccessful, isDirty } } = useForm()
    const ratingValue = watch("mark", 0);
    const navigate = useNavigate()
    const videoTypes = ["mp4", "mkv", "mov", "avi", "wmv", "flv", "webm"]
    const [video, setVideo] = useState("")

    useEffect(() => {
        if (isSubmitSuccessful) navigate(-1)
    }, [isSubmitSuccessful])

    return (
        isLoading ? <Loader /> :
            <form className={cls.ScheduleLessonExercise} onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.ScheduleLessonExercise__materials}>
                    {studentSubmit?.lessonFiles?.map((file, idx) => (
                        <div key={idx}>
                            {videoTypes.some(videoType =>
                                file?.url?.toLowerCase().endsWith(videoType.toLowerCase())
                            ) ? (
                                <div onClick={() => {
                                    setIsOpen(true);
                                    setVideo(file?.url);
                                }}>
                                    {/* <VideoPlayer
                                        videoUrl={file?.url}
                                        controls={false}
                                        disabled={true}
                                    /> */}
                                </div>
                            ) : (
                                <FilePreviewItem
                                    name={file.fileName}
                                    size={(file.size || 0) / 1024}
                                    type={getFileCategory(file?.url) || getFileCategory(file)}
                                    onClick={() => setPreviewMaterial({ isFileOpen: true, material: file })}
                                    className={cls.preview}
                                />
                            )}
                        </div>
                    ))}
                    <MaterialPreviewModal
                        isOpen={previewMaterial.isFileOpen}
                        onClose={() => setPreviewMaterial(state => ({ ...state, isFileOpen: false }))}
                        title={previewMaterial?.material?.fileName}
                        fileName={previewMaterial?.material?.fileName}
                        description={previewMaterial?.material?.fileName}
                        fileUrl={previewMaterial?.material?.url}
                    />
                </div>
                <div className={cls.ScheduleLessonExercise__header} >
                    <h1>{studentSubmit?.lessonHomeTask?.title}</h1>
                    <p>{studentSubmit?.lessonHomeTask?.description}</p>
                </div>
                <FormTextArea
                    placeholder={`Izoh yozing...`}
                    className={cls.ScheduleLessonExercise__textArea}
                    register={register('description', { required: "Darsga ta'rif kiriting!" })}
                    error={errors?.description?.message}
                    defaultValue={studentSubmit?.description}
                />
                <div className={cls.ScheduleLessonExercise__rating}>
                    <span>Baholang: </span>
                    <div className={cls.ScheduleLessonExercise__rating__StarContainer}>
                        <Rater
                            count={4}
                            width='32px'
                            height='32px'
                            onRate={(val) => setValue("mark", val)}
                            defaultValue={studentSubmit?.mark}
                        />
                    </div>
                </div>
                {studentSubmit?.description && studentSubmit?.mark && <Button
                    type='submit'
                    disabled={!isDirty}
                    isLoading={isSubmitting}
                    className={cls.ScheduleLessonExercise__btn}>
                    Yuborish
                </Button>
                }
                {/* <ScheduleLessonDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    video={video}
                    setVideo={setVideo}
                /> */}
            </form>
    )
}

export default ScheduleLessonExercise