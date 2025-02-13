import ScheduleLessonFiles from '@/components/UI/organisms/ScheduleLessonFiles'
import { useGetMentorLessonsSchedule } from '@/hooks/useLessonsSchedule'
import React from 'react'

const ScheduleHomeWorkDetails = () => {
  const { studentSubmit: {data: studentSubmit, isLoading: isStudentSubmitLoading, refetch}} = useGetMentorLessonsSchedule()
  const submitId = studentSubmit?.id

  return (
    <div>
      <ScheduleLessonFiles
        title={studentSubmit?.title}
        description={studentSubmit?.description}
        mark={studentSubmit?.mark}
        files={studentSubmit?.lessonFiles}
        isLoading={isStudentSubmitLoading}
        video={studentSubmit?.video}
        homeWorkId={submitId}
        details={studentSubmit?.lessonHomeTask}
        studentSubmit={studentSubmit}
        refetch={refetch}
      />
    </div>
  )
}

export default ScheduleHomeWorkDetails