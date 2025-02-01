import parse from "date-fns/parse";
import getDay from "date-fns/getDay";
import format from "date-fns/format";
import { enUS } from "date-fns/locale";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
    getDay,
    locales: { enUS },
});

const eventStyleGetter = (event) => {
    return {
        style: {
            backgroundColor: event.color,
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
        },
    };
};

function LessonScheduleCalendar({ 
    events = [],
    className = '' 
}) {
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

    return (
        <div className={className} style={{ width: '100%' }}>
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
        </div>
    );
}

export default LessonScheduleCalendar;