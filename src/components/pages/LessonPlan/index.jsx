import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertMinutesToUTC0, isDatePassed } from '@/utils/time';
import { GROUP_STATUS } from '@/constants/enum';
import Loader from '@/components/UI/atoms/Loader';
import Button from '@/components/UI/atoms/Buttons/Button';
import { convertLessonScheduleToEvents } from '@/utils/calendar';
import ConfirmationModal from '@/components/UI/organisms/ConfirmationModal';
import LessonScheduleCalendar from '@/components/templates/LessonScheduleCalendar';
import CreateScheduleFormModal from '@/components/UI/organisms/CreateScheduleFormModal';
import ConfirmScheduleMoveModal from '@/components/UI/organisms/ConfirmScheduleMoveModal';
import { useGetGroupLessonsSchedule, useScheduleMoveDeleteMutation, useScheduleMoveMutation, useScheduleUpdateMutation } from '@/hooks/useLessonsSchedule';
import cls from './LessonPlan.module.scss';

const LessonPlan = () => {
    const { groupId } = useParams()
    const [events, setEvents] = useState([])
    const [isOpenCreateSchedule, setIsOpenCreateSchedule] = useState(false)
    const [movedEvent, setMovedEvent] = useState({ isOpen: false, event: null })
    const [deletedEvent, setDeletedEvent] = useState(null)
    const moveMutation = useScheduleMoveMutation()
    const updateMutation = useScheduleUpdateMutation()
    const deleteMutation = useScheduleMoveDeleteMutation()
    const { data: lessons, isLoading: isLoadingLessons } = useGetGroupLessonsSchedule(groupId)

    const handleEventDrop = (event) => {
        setMovedEvent({ isOpen: true, event })
        setEvents(prev => prev.map(e => e.id === event.lessonScheduleId ? { ...e, isRescheduled: true, isNewReschedule: e.isRescheduled } : e))
    }

    const handleScheduleMove = async (type) => {
        const event = movedEvent?.event
        const getMinutesFromStartOfDay = (date) => {
            return date.getHours() * 60 + date.getMinutes();
        };

        if (type === 'temp') {
            if (isDatePassed(event?.start)) {
                toast.error('Bu kunga kochirish mumkin emas!')
                return
            }
            const movedObject = {
                weekday: event?.start?.getDay(),
                startTime: convertMinutesToUTC0(getMinutesFromStartOfDay(event?.start)),
                endTime: convertMinutesToUTC0(getMinutesFromStartOfDay(event?.end)),
                date: format(event?.start, 'yyyy-MM-dd'),
                fromDate: format(event?.fromDate, 'yyyy-MM-dd'),
                lessonSchedule: event?.lessonScheduleId
            };

            await moveMutation.mutateAsync(movedObject, {
                onSuccess: () => {
                    toast.success('Dars ko\'chirildi')
                    setMovedEvent({ isOpen: false, event: null })
                },
                onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
            })
        } else {
            const movedObject = {
                id: event?.lessonScheduleId,
                weekday: event?.start?.getDay(),
                startTime: convertMinutesToUTC0(getMinutesFromStartOfDay(event?.start)),
                endTime: convertMinutesToUTC0(getMinutesFromStartOfDay(event?.end)),
            }

            await updateMutation.mutateAsync(movedObject, {
                onSuccess: () => {
                    toast.success('Dars ko\'chirildi')
                    setMovedEvent({ isOpen: false, event: null })
                },
                onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
            })
        }
    }

    const handleCancel = () => {
        setEvents(prev => prev.map(e => {
            const event = movedEvent?.event
            if (e.id === event?.lessonScheduleId && !e?.isNewReschedule) {
                return { ...e, isRescheduled: false }
            } else return e
        }))
        setMovedEvent({ isOpen: false, event: null })
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
            setEvents(convertLessonScheduleToEvents(lessons?.items, { groupId }))
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
                <ConfirmScheduleMoveModal
                    isOpen={movedEvent?.isOpen}
                    onConfirm={handleScheduleMove}
                    onClose={handleCancel}
                />
                <CreateScheduleFormModal
                    groupId={groupId}
                    isOpen={isOpenCreateSchedule}
                    onClose={() => setIsOpenCreateSchedule(false)}
                />
                <Button
                    disabled={lessons?.status === GROUP_STATUS.CLOSED} 
                    onClick={() => setIsOpenCreateSchedule(true)}
                >
                    Qo’shish
                </Button>
                <LessonScheduleCalendar
                    dragAndDrop
                    events={[...events, movedEvent?.event ? movedEvent?.event : {}]}
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