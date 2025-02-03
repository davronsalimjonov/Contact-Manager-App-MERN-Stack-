import { useState } from 'react'
import Button from '../../atoms/Buttons/Button'
import Rater from '../../atoms/Rater'
import FormTextArea from '../Form/FormTextArea'
import cls from "./ScheduleLessonExercise.module.scss"
import ScheduleLessonDialog from '../ScheduleLessonDialog'
import { getFileCategory } from '@/utils/lib'
import AudioPlayer from '../AudioPlayer'

const ScheduleLessonExercise = ({
    fileUrl = '/images/indila.mp3',
    fileName = "Indila - Tourner Dans Le Vide"
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const fileType = getFileCategory(fileUrl)

    return (
        <form className={cls.ScheduleLessonExercise}>
            <div className={cls.ScheduleLessonExercise__materials}>
                <img src="/images/bg.svg" alt="" onClick={() => setIsOpen(true)} />
                <div>
                    <div>
                        {fileType === 'image' && <img className={cls.modal__image} src={fileUrl} alt="" />}
                        {fileType === 'video' && <video className={cls.modal__video} src={fileUrl} controls />}
                        {fileType === 'docs' && <iframe className={cls.modal__iframe} src={'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(fileUrl)} frameBorder="0" />}
                        {fileType === 'pdf' && <iframe className={cls.modal__iframe} src={'https://docs.google.com/gview?&embedded=true&url=' + encodeURIComponent(fileUrl)} frameBorder="0" />}
                        {fileType === 'audio' && <AudioPlayer title={fileName} url={fileUrl} />}
                    </div>
                </div>
            </div>
            <div className={cls.ScheduleLessonExercise__header}>
                <h1>Vazifa nomi</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ex ullam ad aspernatur eos perferendis quidem dolorum recusandae iure in cumque unde quas error magnam repellendus voluptatum delectus facere, eligendi tempora ratione placeat! Animi dicta labore excepturi ea illum, unde modi, molestias exercitationem nihil voluptas saepe ullam esse corporis dignissimos fugit. Ex, earum nostrum odio dignissimos corrupti fuga ipsum nihil sit molestiae natus, ut at aspernatur voluptate, odit ullam doloremque deleniti minus? Quos at aspernatur error aperiam incidunt hic praesentium.</p>
            </div>
            <FormTextArea
                placeholder={`Izoh yozing...`}
                className={cls.ScheduleLessonExercise__textArea}
            />
            <div className={cls.ScheduleLessonExercise__rating}>
                <span>Baholang: </span>
                <div className={cls.ScheduleLessonExercise__rating__StarContainer}>
                    <Rater
                        count={4}
                        width='32px'
                        height='32px'
                    />
                </div>
            </div>
            <Button type='submit' disabled={true} className={cls.ScheduleLessonExercise__btn}>
                Yuborish
            </Button>
            <ScheduleLessonDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </form>
    )
}

export default ScheduleLessonExercise