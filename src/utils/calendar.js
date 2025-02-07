import { LEVEL_COLORS } from "@/constants/colors";
import { isSameDay } from "./time";

export function convertLessonScheduleToEvents(data = [], { groupId } = {}) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentWeekday = currentDate.getDay();

    return data.flatMap(({ id, weekday, startTime, endTime, group, lessonScheduleMoves }) => {
        const targetDate = new Date(currentYear, currentMonth, currentDay - currentWeekday + weekday);

        const createDateTime = (time, customDate) => {
            const baseDate = customDate || targetDate;
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), hours, minutes);
        };

        const isRescheduled = lessonScheduleMoves ? isSameDay(new Date(lessonScheduleMoves?.fromDate), createDateTime(startTime)) : false;
        const isBusy = groupId && groupId !== group?.id;
        const color = groupId ? LEVEL_COLORS?.ACTIVE_COLOR : LEVEL_COLORS[group?.level] || LEVEL_COLORS.DEFAULT_COLOR;

        const baseEvent = {
            id,
            title: group?.title,
            start: createDateTime(startTime),
            end: createDateTime(endTime),
            isTransfered: false,
            color,
            isRescheduled,
            isBusy
        };

        if (isRescheduled) {
            const movedDate = new Date(lessonScheduleMoves.date);

            const movedEvent = {
                ...baseEvent,
                lessonScheduleId: id,
                fromDate: createDateTime(startTime),
                start: createDateTime(lessonScheduleMoves.startTime, movedDate),
                end: createDateTime(lessonScheduleMoves.endTime, movedDate),
                isRescheduled: false,
                isTransfered: true,
            };
            return [baseEvent, movedEvent];
        }

        return [baseEvent];
    });
}
