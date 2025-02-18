import ScheduleLessonFiles from '@/components/UI/organisms/ScheduleLessonFiles'
import { useGetMentorLessonsSchedule } from '@/hooks/useLessonsSchedule'

const ScheduleHomeWorkDetails = () => {
  // const { studentSubmit: {data: studentSubmit, isLoading: isStudentSubmitLoading, refetch}} = useGetMentorLessonsSchedule()

  return (
    <div>
      <ScheduleLessonFiles
        // isLoading={isStudentSubmitLoading}
        // studentSubmit={studentSubmit}
        // refetch={refetch}
      />
    </div>
  )
}

export default ScheduleHomeWorkDetails