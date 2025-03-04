import { useState } from 'react'
import toast from 'react-hot-toast'
import { useLessonMutations } from '@/hooks/useLessonsSchedule'
import Button from '../../atoms/Buttons/Button'
import CreateNewLessonForm from '../../organisms/CreateNewLessonForm'
import WhiteButton from '../../atoms/Buttons/WhiteButton'
import { PeopleGroupIcon, PlusIcon } from '../../atoms/icons'
import cls from "./ScheduleLessonsBtns.module.scss"

const ScheduleLessonsBtns = ({
    lvl = "A2",
    groupId = "",
    refetch
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const { createLessonMutation } = useLessonMutations(groupId)

    const handleCreateLesson = async (data) => {
        data = { ...data, group: groupId }
        await createLessonMutation.mutateAsync(data, {
            onSuccess: () => {
                toast.success("Dars Yaratildi")
                setIsOpen(false)
                refetch()
            },
            onError: (err) => toast.error(err?.response?.data?.message || "Xatolik Yuz Berdi!")
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