import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { ru } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  ru: ru,
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
    start: new Date(currentYear, currentMonth, currentDate, 10, 0),
    end: new Date(currentYear, currentMonth, currentDate, 11, 45),
    backgroundColor: "#e2ffe2",
  },
];

function MyCalendar() {
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: "#d1fad1",
        color: "#1b1b1b",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "16px",
        fontWeight: "500",
        border: "1px solid #b3e6b3",
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
      return format(date, "EEEE", { locale: ru });
    },
    timeGutterFormat: (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
  };

  const customSlotStyle = {
    width: '80px',
    height: '112px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Кастомизация слота
  const customSlot = ({ date, children }) => {
    return (
      <div style={customSlotStyle}>
        {children}
      </div>
    );
  };

  return (
    <div style={{}}>
      <style>
        {`
          /* Убираем границы между слотами */
        //   .rbc-timeslot-group {
        //     min-height: 80px;
        //   }
        `}
      </style>
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
          timeSlot: ({ children }) => (
            <div className="custom-time-slot">
              {children}
            </div>
          ),
        }}
        dayPropGetter={(date) => {
          if (date.getDay() === 0) {
            return { style: { display: "none" } }; // Скрываем воскресенье
          }
          return {};
        }}
      />
    </div>
  );
}

export default MyCalendar;
