import React, { useState } from 'react'
import Dialog from '../Dialog'
import cls from "./ScheduleLessonDialog.module.scss"
import { CloseIcon } from '../../atoms/icons'
import VideoPlayer from '../../atoms/VideoPlayer'
import Loader from '../../atoms/Loader'

const ScheduleLessonDialog = ({
    isOpen = false,
    setIsOpen,
    video = null,
    setVideo
}) => {
    const [isLarge, setIsLarge] = useState(false)

    return (
        <Dialog isOpen={isOpen}>
            <div className={cls.ScheduleHeader__dialog}>
                {!isLarge &&
                    <div className={cls.ScheduleHeader__dialog__close}>
                        <button onClick={() => {
                            setIsOpen(false)
                            setVideo(false)
                        }}>
                            <CloseIcon />
                        </button>
                    </div>
                }
                <div className={isLarge ? cls.ScheduleHeader__dialog__src__fullScreen : cls.ScheduleHeader__dialog__src}>
                    {video === null ? <Loader /> :
                        <VideoPlayer
                            videoUrl={video}
                            setIsLarge={setIsLarge}
                            isLarge={isLarge}
                        />
                    }
                </div>
            </div>
        </Dialog>
    )
}

export default ScheduleLessonDialog