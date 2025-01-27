import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  // ru: ru,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();

const events = [
  {
    title: "A2 level",
    start: new Date(currentYear, currentMonth, 27, 10, 0),
    end: new Date(currentYear, currentMonth, 27, 11, 45),
    color: "rgba(206, 242, 203, 1)",
  },
  {
    title: "A2 level",
    start: new Date(currentYear, currentMonth, 29, 10, 0),
    end: new Date(currentYear, currentMonth, 29, 11, 45),
    color: "rgba(206, 242, 203, 1)",
  },
  {
    title: "A2 level",
    start: new Date(currentYear, currentMonth + 1, 1, 10, 0),
    end: new Date(currentYear, currentMonth + 1, 1, 11, 45),
    color: "rgba(206, 242, 203, 1)",
  },
  {
    title: "B1 level",
    start: new Date(currentYear, currentMonth, 28, 14, 30),
    end: new Date(currentYear, currentMonth, 28, 16, 15),
    color: "rgba(255, 189, 167, 1)",
  },
  {
    title: "B1 level",
    start: new Date(currentYear, currentMonth, 30, 14, 30),
    end: new Date(currentYear, currentMonth, 30, 16, 15),
    color: "rgba(255, 189, 167, 1)",
  },
  {
    title: "B1 level",
    start: new Date(currentYear, currentMonth, 31, 14, 30),
    end: new Date(currentYear, currentMonth, 31, 16, 15),
    color: "rgba(255, 189, 167, 1)",
  },
];

function MyCalendar() {
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
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      },
    };
  };

  const formats = {
    dayFormat: (date, culture, localizer) => {
      // Показываем только день недели
      return format(date, "EEEE", { locale: enUS });
    },
    timeGutterFormat: (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
  };

  const CustomTimeSlotWrapper = ({ value, ...props }) => {
    const minutes = value.getMinutes();
    const hours = value.getHours();

    let displayText = '';
    if (minutes === 0) {
      displayText = `${hours}:00`; // Часы
    } else if (minutes === 15 || minutes === 30 || minutes === 45) {
      displayText = `:${minutes}`; // Только минуты
    }

    return (
      <div className="rbc-time-slot">
        {displayText && <span className="rbc-label">{displayText}</span>}
      </div>
    );
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week"]}
        timeslots={4}
        step={15}
        min={new Date(2024, 0, 1, 10, 0)} // Минимальное время
        max={new Date(2024, 0, 1, 23, 0)} // Максимальное время
        culture="ru"
        eventPropGetter={eventStyleGetter}
        toolbar={false}
        formats={formats}
        components={{
          timeSlotWrapper: CustomTimeSlotWrapper
        }}
        dayPropGetter={(date) => {
          if (date.getDay() === 0) {
            return { style: { display: "none" } };
          }
          return {};
        }}
      />
    </div>
  );
}

export default MyCalendar;
