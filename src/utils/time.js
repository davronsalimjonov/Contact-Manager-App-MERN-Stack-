import { daysOfWeekFull, daysOfWeekShort } from "@/constants";

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

export function formatMessageDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();

    const isYesterday = (date) => {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return isSameDay(date, yesterday);
    }

    if (isSameDay(date, now)) {
        return 'Bugun';
    }

    if (isYesterday(date)) {
        return 'Kecha';
    }

    const formatOptions = date.getFullYear() === now.getFullYear()
        ? { day: 'numeric', month: 'long' }
        : { day: 'numeric', month: 'long', year: 'numeric' }

    return new Intl.DateTimeFormat('uz-Cyrl', formatOptions).format(date);
}