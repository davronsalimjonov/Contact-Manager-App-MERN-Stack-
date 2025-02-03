import React from 'react'
import Dialog from '../Dialog'
import cls from  "./ScheduleLessonDialog.module.scss"
import { CloseIcon } from '../../atoms/icons'

const ScheduleLessonDialog = ({
    isOpen=false,
    setIsOpen
}) => {
    return (
        <Dialog isOpen={isOpen}>
            <div className={cls.ScheduleHeader__dialog}>
                <div className={cls.ScheduleHeader__dialog__close}>
                    <button onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </button>
                </div>
                <div className={cls.ScheduleHeader__dialog__src}>
                    <img src="/images/bg.svg" alt="" />
                </div>
            </div>
        </Dialog>
    )
}

export default ScheduleLessonDialog