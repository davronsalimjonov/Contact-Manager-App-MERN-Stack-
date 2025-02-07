import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import Button from '@/components/UI/atoms/Buttons/Button';
import { convertLessonScheduleToEvents } from '@/utils/calendar';
import ConfirmationModal from '@/components/UI/organisms/ConfirmationModal';
import LessonScheduleCalendar from '@/components/templates/LessonScheduleCalendar';
import CreateScheduleFormModal from '@/components/UI/organisms/CreateScheduleFormModal';
import { useGetGroupLessonsSchedule, useScheduleMoveDeleteMutation, useScheduleMoveMutation } from '@/hooks/useLessonsSchedule';
import cls from './LessonPlan.module.scss';

const LessonPlan = () => {
    const { groupId } = useParams()
    const [events, setEvents] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [movedEvent, setMovedEvent] = useState(null)
    const [deletedEvent, setDeletedEvent] = useState(null)
    const moveMutation = useScheduleMoveMutation()
    const deleteMutation = useScheduleMoveDeleteMutation()
    const { data: lessons, isLoading: isLoadingLessons } = useGetGroupLessonsSchedule(groupId)

    const handleEventDrop = (event) => {
        setMovedEvent(event)
        setEvents(prev => prev.map(e => e.id === event.lessonScheduleId ? { ...e, isRescheduled: true } : e))
    }

    const handleCreateScheduleMove = async () => {
        const getMinutesFromStartOfDay = (date) => {
            return date.getHours() * 60 + date.getMinutes();
        };

        const movedObject = {
            weekday: movedEvent?.start?.getDay(),
            startTime: getMinutesFromStartOfDay(movedEvent?.start),
            endTime: getMinutesFromStartOfDay(movedEvent?.end),
            date: format(movedEvent?.start, 'yyyy-MM-dd'),
            fromDate: format(movedEvent?.fromDate, 'yyyy-MM-dd'),
            lessonSchedule: movedEvent?.lessonScheduleId
        };

        await moveMutation.mutateAsync(movedObject, {
            onSuccess: () => {
                toast.success('Dars ko\'chirildi')
                setMovedEvent(null)
            },
            onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    const handleCancel = () => {
        setEvents(prev => prev.map(e => e.id === movedEvent?.lessonScheduleId ? { ...e, isRescheduled: false } : e))
        setMovedEvent(null)
    }

    const handleDeleteEvent = async (event) => {
        await deleteMutation.mutateAsync(event?.id, {
            onSuccess: () => {
                toast.success('Dars o’chirildi')
                setDeletedEvent(null)
            },
            onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    useEffect(() => {
        if (lessons) {
            setEvents(convertLessonScheduleToEvents(lessons, { groupId }))
        }
    }, [lessons])

    return (
        !isLoadingLessons ? (
            <div className={cls.page}>
                <ConfirmationModal 
                    title='Rostdan ham ushbu darsni o’chirishni xohlaysizmi?'
                    isOpen={!!deletedEvent}
                    onCancel={() => setDeletedEvent(null)}
                    onConfirm={() => handleDeleteEvent(deletedEvent)}
                />
                <ConfirmationModal
                    title='Rostdan ham ushbu darsni o’chirishni xohlaysizmi?'
                    isOpen={!!movedEvent}
                    onCancel={handleCancel}
                    onConfirm={handleCreateScheduleMove}
                />
                <CreateScheduleFormModal
                    isOpen={isOpen}
                    groupId={groupId}
                    onClose={() => setIsOpen(false)}
                />
                <Button onClick={() => setIsOpen(true)}>Qo’shish</Button>
                <LessonScheduleCalendar
                    dragAndDrop
                    events={[...events, movedEvent ? movedEvent : {}]}
                    onEventDrop={handleEventDrop}
                    onDeleteEvent={event => setDeletedEvent(event)}
                />
            </div>
        ) : (
            <Loader />
        )
    );
}

export default LessonPlan;