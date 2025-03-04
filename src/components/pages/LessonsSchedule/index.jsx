import { useNavigate } from "react-router-dom";
import Loader from "@/components/UI/atoms/Loader";
import { convertLessonScheduleToEvents } from "@/utils/calendar";
import { useGetMentorLessonsSchedule } from "@/hooks/useLessonsSchedule";
import LessonScheduleCalendar from "@/components/templates/LessonScheduleCalendar";

function LessonsSchedule() {
  const navigate = useNavigate()
  const { data: lessons, isLoading } = useGetMentorLessonsSchedule()

  return !isLoading ? (
    <LessonScheduleCalendar
      events={convertLessonScheduleToEvents(lessons)}
      onClickEvent={(event) => navigate(event.groupId)}
    />
  ) : (
    <Loader />
  )
}

export default LessonsSchedule;
