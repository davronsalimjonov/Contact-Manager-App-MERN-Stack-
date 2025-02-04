import { LEVEL_COLORS } from "@/constants/colors";

export function convertLessonScheduleToEvents(data = []) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentWeekday = currentDate.getDay();

    return data.map(({ id, weekday, startTime, endTime, group }) => {
        const targetDate = new Date(currentYear, currentMonth, currentDay - currentWeekday + weekday);

        const createDateTime = (time) => {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            return new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), hours, minutes);
        };

        return {
            id,
            title: group?.title,
            start: createDateTime(startTime),
            end: createDateTime(endTime),
            color: LEVEL_COLORS[group?.level] || LEVEL_COLORS.DEFAULT_COLOR,
        };
    });
}