import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import Button from '@/components/UI/atoms/Buttons/Button';
import { convertLessonScheduleToEvents } from '@/utils/calendar';
import { useGetGroupLessonsSchedule } from '@/hooks/useLessonsSchedule';
import LessonScheduleCalendar from '@/components/templates/LessonScheduleCalendar';
import CreateScheduleFormModal from '@/components/UI/organisms/CreateScheduleFormModal';
import cls from './LessonPlan.module.scss';

const LessonPlan = () => {
    const { groupId } = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const { data: lessons, isLoading: isLoadingLessons } = useGetGroupLessonsSchedule(groupId)

    return (
        !isLoadingLessons ? (
            <div className={cls.page}>
                <CreateScheduleFormModal
                    isOpen={isOpen}
                    groupId={groupId}
                    onClose={() => setIsOpen(false)}
                />
                <Button onClick={() => setIsOpen(true)}>Qo’shish</Button>
                <LessonScheduleCalendar
                    dnd
                    events={convertLessonScheduleToEvents(lessons)}
                />
                <Button>Saqlash</Button>
            </div>
        ) : (
            <Loader />
        )
    );
}

export default LessonPlan;