import { useNavigate } from "react-router-dom";
import { convertLessonScheduleToEvents } from "@/utils/calendar";
import { useGetMentorLessonsSchedule } from "@/hooks/useLessonsSchedule";
import LessonScheduleCalendar from "@/components/templates/LessonScheduleCalendar";

function LessonsSchedule() {
  const navigate = useNavigate()
  const { data: lessons } = useGetMentorLessonsSchedule()

  return (
    <LessonScheduleCalendar
      events={convertLessonScheduleToEvents(lessons)}
      onClickEvent={(event) => navigate(event.groupId)}
    />
  );
}

export default LessonsSchedule;
