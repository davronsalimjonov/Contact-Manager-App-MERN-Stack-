import { convertLessonScheduleToEvents } from "@/utils/calendar";
import { useGetMentorLessonsSchedule } from "@/hooks/useLessonsSchedule";
import LessonScheduleCalendar from "@/components/templates/LessonScheduleCalendar";

function LessonsSchedule() {
  const { data: lessons } = useGetMentorLessonsSchedule()

  return (
    <LessonScheduleCalendar events={convertLessonScheduleToEvents(lessons)} />
  );
}

export default LessonsSchedule;
