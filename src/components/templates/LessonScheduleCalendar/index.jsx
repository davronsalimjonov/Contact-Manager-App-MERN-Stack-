import { useState } from "react";
import parse from "date-fns/parse";
import toast from "react-hot-toast";
import getDay from "date-fns/getDay";
import format from "date-fns/format";
import { enUS, uz } from "date-fns/locale";
import startOfWeek from "date-fns/startOfWeek";
import { LEVEL_COLORS } from "@/constants/colors";
import { CloseIcon } from "@/components/UI/atoms/icons";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import cls from './LessonScheduleCalendar.module.scss';
import "react-big-calendar/lib/css/react-big-calendar.css";

const DnDCalendar = withDragAndDrop(Calendar);

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
    getDay,
    locales: { enUS },
});

const formats = {
    dayFormat: (date) => {
        return format(date, "EEEE", { locale: enUS });
    },
    timeGutterFormat: (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    },
};

const CustomTimeSlotWrapper = ({ value }) => {
    const minutes = value.getMinutes();
    const hours = value.getHours();

    let displayText = '';
    if (minutes === 0) {
        displayText = `${hours}:00`;
    } else if (minutes === 15 || minutes === 30 || minutes === 45) {
        displayText = `:${minutes}`;
    }

    return (
        <div className="rbc-time-slot">
            {displayText && <span className="rbc-label">{displayText}</span>}
        </div>
    );
};

const CustomWeekEventComponent = ({ event, onClickDelete, withDeleteButton = false }) => {
    const title = (event?.isBusy && !event?.isTransfered) ? '' : event?.title;

    return (
        <div className={cls.event}>
            {withDeleteButton && <button onClick={() => onClickDelete?.(event)}><CloseIcon /></button>}
            <span className={cls.event__title}>{title}</span>
            {event?.isTransfered && (
                <span className={cls.event__transfered}>
                    <span>Ko'chirilgan:</span>
                    <span>
                        {format(event?.fromDate, 'd MMM', { locale: uz })} dan - {format(event?.start, 'd MMM', { locale: uz })} ga
                    </span>
                </span>
            )}
        </div>
    );
};

const isDatePassed = (date) => date < new Date();

function LessonScheduleCalendar({
    events = [],
    className = '',
    dragAndDrop = false,
    onEventDrop,
    onDeleteEvent
}) {
    const [draggingEventId, setDraggingEventId] = useState(null);

    const isEventOverlapping = (event) => {
        if (event?.isRescheduled) return false
        return events.some(
            (existingEvent) =>
                existingEvent?.id !== event?.lessonScheduleId &&
                existingEvent?.id !== event?.id &&
                event.start < existingEvent.end &&
                event.end > existingEvent.start
        );
    };

    const eventStyleGetter = (event) => {
        const isOverlapping = (event.id !== draggingEventId || event?.lessonScheduleId == draggingEventId) ? false : isEventOverlapping(event);
        let backgroundColor = event?.isBusy ? LEVEL_COLORS.BUSY_COLOR : event?.color;
        backgroundColor = isOverlapping ? "red" : backgroundColor;

        return {
            style: {
                backgroundColor: backgroundColor,
                color: "#1b1b1b",
                borderRadius: "6px",
                padding: "10px",
                fontSize: "20px",
                fontWeight: "500",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                opacity: (event?.isRescheduled && !event?.isBusy) ? 0.4 : 1,
                transition: "background-color 0.2s ease",
            },
        };
    };

    const handleDragStart = (props) => {
        setDraggingEventId(props?.event.id);
    };

    const handleDragEnd = () => {
        setDraggingEventId(null);
    };

    const handleDraggableAccessor = (event) => {
        return !event?.isBusy && !event?.isRescheduled && !isDatePassed(event?.start);
    }

    const handleDrop = (event) => {
        const isTransfered = event?.event?.isTransfered;
        const newStartDate = event?.start;

        if (isDatePassed(newStartDate)) {
            toast.error('Bu kunga kochirish mumkin emas!');
            return;
        }

        const newEvent = {
            ...event.event,
            id: '',
            end: event?.end,
            start: event?.start,
            fromDate: isTransfered ? event?.event?.fromDate : event?.event?.start,
            lessonScheduleId: isTransfered ? event?.event?.lessonScheduleId : event?.event?.id,
            isTransfered: true,
        };
        const scheduleStartTime = event?.event?.start?.getTime();
        const transferedEventStartTime = event?.start?.getTime();

        if (!isEventOverlapping({ ...newEvent, id: event?.event?.id }) && scheduleStartTime !== transferedEventStartTime) {
            onEventDrop?.(newEvent);
        }
    };

    return (
        <div className={className} style={{ width: '100%' }}>
            {dragAndDrop ? (
                <DnDCalendar
                    culture="ru"
                    step={15}
                    timeslots={4}
                    events={events}
                    toolbar={false}
                    formats={formats}
                    views={["week"]}
                    endAccessor="end"
                    defaultView="week"
                    startAccessor="start"
                    localizer={localizer}
                    min={new Date(2024, 0, 1, 10, 0)}
                    max={new Date(2024, 0, 1, 23, 0)}
                    onEventDrop={handleDrop}
                    draggableAccessor={handleDraggableAccessor}
                    eventPropGetter={eventStyleGetter}
                    components={{
                        timeSlotWrapper: CustomTimeSlotWrapper,
                        week: {
                            event: ({ event }) => (
                                <CustomWeekEventComponent
                                    event={event}
                                    onClickDelete={onDeleteEvent}
                                    withDeleteButton={event?.isTransfered}
                                />
                            ),
                        },
                    }}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                />
            ) : (
                <Calendar
                    culture="ru"
                    step={15}
                    timeslots={4}
                    events={events}
                    toolbar={false}
                    formats={formats}
                    views={["week"]}
                    endAccessor="end"
                    defaultView="week"
                    startAccessor="start"
                    localizer={localizer}
                    min={new Date(2024, 0, 1, 10, 0)}
                    max={new Date(2024, 0, 1, 23, 0)}
                    eventPropGetter={eventStyleGetter}
                    components={{
                        timeSlotWrapper: CustomTimeSlotWrapper,
                        week: {
                            event: ({ event }) => <CustomWeekEventComponent event={event} />
                        }
                    }}
                />
            )}
        </div>
    );
}

export default LessonScheduleCalendar;