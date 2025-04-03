import { format, formatDuration, intervalToDuration } from 'date-fns';
import { uz } from 'date-fns/locale';
import { daysOfWeekFull, daysOfWeekShort } from "@/constants";

export const getTimeFromDate = (date) => {
    if (!date) return
    return format(date, 'HH:mm');
}

export function getDayName(dayNumber, format = 'full') {
    if (dayNumber < 0 || dayNumber > 6) {
        return 'Noto‘g‘ri kun raqami';
    }

    return format === 'short' ? daysOfWeekShort[dayNumber] : daysOfWeekFull[dayNumber];
}

export function convertSecondsToTimeFormat(seconds = 0) {
    if (isNaN(seconds)) {
        seconds = 0
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

export const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;

    if (!(date1 instanceof Date)) date1 = new Date(date1);
    if (!(date2 instanceof Date)) date2 = new Date(date2);

    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

export function formatMessageDate(timestamp, { month = 'long' } = {}) {
    if (!timestamp) return

    const monthFormat = month === 'long' ? 'd MMMM' : 'd.MM'
    const date = new Date(timestamp);
    const now = new Date();

    const isYesterday = (date) => {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return date.toDateString() === yesterday.toDateString();
    };

    if (date.toDateString() === now.toDateString()) {
        return 'Bugun';
    }

    if (isYesterday(date)) {
        return 'Kecha';
    }

    const formatPattern = date.getFullYear() === now.getFullYear() ? monthFormat : `${monthFormat} yyyy`;
    return format(date, formatPattern, { locale: uz });
}

export const getTimeFromMinutes = (minutes = 0) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
};

export const isDatePassed = (date) => date < new Date();

export function convertMinutesToUTC0(minutes = 0) {
    const localOffset = new Date().getTimezoneOffset() * -1;
    return minutes - localOffset;
}

export function convertMinutesFromUTC0(minutes) {
    const localOffset = new Date().getTimezoneOffset() * -1;
    return minutes + localOffset;
}

export function getDateDifference(startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        console.log('Обе даты должны быть экземплярами объекта Date');
    }

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.log('Одна из дат некорректна');
    }

    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
}

export function generateTimeOptions() {
    const options = [];
    for (let minutes = 0; minutes < 24 * 60; minutes += 5) {
      const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
      const mins = (minutes % 60).toString().padStart(2, '0');
      options.push({ value: minutes, label: `${hours}:${mins}` });
    }
    return options;
}  

export const convertSecondsToHoursAndMinutes = (seconds) => {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });  
    return formatDuration(duration, { format: ["hours", "minutes"], locale: uz }) || "0 minut";
};