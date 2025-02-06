import parse from "date-fns/parse";
import getDay from "date-fns/getDay";
import format from "date-fns/format";
import { enUS } from "date-fns/locale";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
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

function LessonScheduleCalendar({
    events = [],
    className = '',
    dnd = false
}) {
    const isEventOverlapping = (event) => {
        return events.some(
            (existingEvent) =>
                existingEvent.id !== event.id &&
                event.start < existingEvent.end &&
                event.end > existingEvent.start
        );
    };

    const eventStyleGetter = (event) => {
        const isOverlapping = isEventOverlapping(event);

        return {
            style: {
                backgroundColor: isOverlapping ? "red" : event.color,
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
                opacity: event?.isMoved ? 0.4 : 1,
                transition: "background-color 0.2s ease",
            },
        };
    };

    return (
        <div className={className} style={{ width: '100%' }}>
            {dnd ? (
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
                    onEventDrop={console.log}
                    eventPropGetter={eventStyleGetter}
                    components={{
                        timeSlotWrapper: CustomTimeSlotWrapper
                    }}
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
                        timeSlotWrapper: CustomTimeSlotWrapper
                    }}
                />
            )}
        </div>
    );
}

export default LessonScheduleCalendar;