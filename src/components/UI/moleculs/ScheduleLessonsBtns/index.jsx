import React from 'react'
import { PeopleGroupIcon, PlusIcon } from '../../atoms/icons'
import Button from '../../atoms/Buttons/Button'
import WhiteButton from '../../atoms/Buttons/WhiteButton'
import cls from "./ScheduleLessonsBtns.module.scss"

const ScheduleLessonsBtns = ({
    lvl = "A2"
}) => {
    return (
        <div className={cls.ScheduleLessonsBtns}>
            <div>
                <WhiteButton className={cls.ScheduleLessonsBtns__lvl}><span><PeopleGroupIcon /></span> {lvl} level</WhiteButton>
            </div>
            <div>
                <Button className={cls.ScheduleLessonsBtns__start}><PlusIcon height={20} />Boshlash</Button>
            </div>
        </div>
    )
}

export default ScheduleLessonsBtns