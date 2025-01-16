import Button from '@/components/UI/atoms/Buttons/Button'
import Mapper from '@/components/UI/atoms/Mapper'
import UsersCourseListTableRow from '@/components/UI/moleculs/UsersCourseListTableRow'
import UsersCourseListTableHeader from '@/components/UI/organisms/UsersCourseListTableHeader'
import React from 'react'
import cls from './UserCourseListTable.module.scss'
import Loader from '@/components/UI/atoms/Loader'
import Dialog from '@/components/UI/moleculs/Dialog'
import RedButton from '@/components/UI/atoms/Buttons/RedButton'
import FormInput from '@/components/UI/moleculs/Form/FormInput'
import Select from '@/components/UI/atoms/Form/Select'
import FormSelect from '@/components/UI/moleculs/Form/FormSelect'
import FormDatepicker from '@/components/UI/moleculs/Form/FormDatepicker'

const UserCourseListTable = ({
    courses = [],
    isLoading,
    isModal=false,
    setIsModal,
    callMentors,
    mainMentors,
    courseForSelect
}) => {
  const courseForSelectOptions = []
  const mainMentorOptions = []
  const callMentorOptions = []

  callMentors?.forEach(callMentor => {
    callMentorOptions?.push({ value: callMentor?.id, label: `${callMentor?.firstName} ${callMentor?.lastName}` })
  })

  mainMentors?.forEach(mainMentor => {
    mainMentorOptions?.push({ value: mainMentor?.id, label: `${mainMentor?.firstName} ${mainMentor?.lastName}` })
  })

  courseForSelect?.forEach(course => {
    courseForSelectOptions?.push({ value: course?.id, label: `${course?.firstName} ${course?.lastName}` })
  })

  console.log(callMentorOptions, mainMentorOptions, courseForSelectOptions, 'select hahah');
  

  return (
    <div className={cls.courses__table}>
        <div className={cls.courses__table__header}>
            <h2>Kurslar</h2>
            <Button onClick={() => setIsModal(true)}>Kurs biriktirish</Button>
        </div>
        {
            courses.length > 0 ? (<>
                <table>
                    <UsersCourseListTableHeader />
                    <tbody>
                        <Mapper
                            data={courses}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(course, index) => (
                                <UsersCourseListTableRow
                                    key={course?.id}
                                    course={course?.course?.title}
                                    teacher={course?.teacher}
                                    callMentor={course?.secondTeacher}
                                    startDate={course?.startDate}
                                    endDate={course?.endDate}
                                    level={course?.level}
                                    index={index}
                                />
                            )} 
                        />
                    </tbody>
                </table>
            </>) : (<>
                <Loader />
            </>)
        }
        <Dialog isOpen={isModal} onClose={setIsModal}>
            <form className={cls.MainMentorStudentsGroupTab__dialog}>
                <h2>Kurs Biriktirish</h2>
                <div>
                    <div>
                        <FormSelect
                            label='Kurs Tanlang'
                            placeholder='Kurs Tanlang'
                            isClearable
                            isSearchable
                        />
                    </div>
                    <div>
                        <FormDatepicker
                            name='birthday'
                            label='Kurs Boshlanish Sanasi'
                            placeholder='Kurs Boshlanish Sanasi'
                        />
                    </div>
                    <div>
                        <FormDatepicker
                            name='birthday'
                            label='Kurs Tugash Sanasi'
                            placeholder='Kurs Tugash Sanasi'
                        />
                    </div>
                    <div>
                        <FormSelect
                            label='Asosiy Mentor Tanlang'
                            placeholder='Asosiy Mentorni Tanlang'
                            isClearable
                            isSearchable
                        />
                    </div>
                    <div>
                        <FormSelect
                            label='Nazoratchi Mentor Tanlang'
                            placeholder='Nazoratchi Mentorni Tanlang'
                            isClearable
                            isSearchable
                        />
                    </div>
                </div>
                <div className={cls.MainMentorStudentsGroupTab__dialog__buttons}>
                    <RedButton onClick={() => setIsModal(false)}>Bekor Qilish</RedButton>
                    <Button>Qo'shish</Button>
                </div>
            </form>
        </Dialog>
    </div>
  )
}

export default UserCourseListTable