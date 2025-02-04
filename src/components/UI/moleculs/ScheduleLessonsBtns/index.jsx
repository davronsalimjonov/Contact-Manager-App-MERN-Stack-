import React, { useState } from 'react'
import { PeopleGroupIcon, PlusIcon } from '../../atoms/icons'
import Button from '../../atoms/Buttons/Button'
import WhiteButton from '../../atoms/Buttons/WhiteButton'
import cls from "./ScheduleLessonsBtns.module.scss"
import CreateNewLessonForm from '../CreateNewLessonForm'
import { useLessonMutations } from '@/hooks/useLessonsSchedule'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const ScheduleLessonsBtns = ({
    lvl = "A2",
    refetch
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const { createLessonMutation } = useLessonMutations()
    const { groupId } = useParams()


    const handleCreateLesson = async (data) => {
        data = { ...data, group: groupId }
        await createLessonMutation.mutateAsync(data, {
            onSuccess: () => {
                toast.success("Dars Yaratildi")
                setIsOpen(false)
                refetch()
            }
        })
    }

    return (
        <div className={cls.ScheduleLessonsBtns}>
            <div>
                <WhiteButton className={cls.ScheduleLessonsBtns__lvl}><span><PeopleGroupIcon /></span> {lvl} level</WhiteButton>
            </div>
            <div>
                <Button
                    className={cls.ScheduleLessonsBtns__start}
                    onClick={() => setIsOpen(true)}
                ><PlusIcon height={20} />Boshlash</Button>
            </div>
            <div>
                <CreateNewLessonForm
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onSubmit={handleCreateLesson}
                />
            </div>
        </div>
    )
}

export default ScheduleLessonsBtns