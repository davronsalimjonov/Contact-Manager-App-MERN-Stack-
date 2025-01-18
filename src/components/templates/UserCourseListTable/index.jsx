import Button from '@/components/UI/atoms/Buttons/Button'
import Mapper from '@/components/UI/atoms/Mapper'
import UsersCourseListTableRow from '@/components/UI/moleculs/UsersCourseListTableRow'
import UsersCourseListTableHeader from '@/components/UI/organisms/UsersCourseListTableHeader'
import React from 'react'
import cls from './UserCourseListTable.module.scss'
import Dialog from '@/components/UI/moleculs/Dialog'
import RedButton from '@/components/UI/atoms/Buttons/RedButton'
import FormSelect from '@/components/UI/moleculs/Form/FormSelect'
import FormDatepicker from '@/components/UI/moleculs/Form/FormDatepicker'
import dayjs from 'dayjs'

const UserCourseListTable = ({
    courses = [] || '',
    isLoading,
    isModal=false,
    setIsModal,
    callMentors,
    mainMentors,
    courseForSelect,
    setCourseData,
    handleSelectChange,
    handleDateChange,
    handleAddCourseToUser,
    handleUpdateUserCourse,
    isUpdate=false,
    setIsUpdate
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
    courseForSelectOptions?.push({ value: course?.id, label: `${course?.title}` })
  })

  const handleClose = () => {
    setIsModal(false);
    setIsUpdate(false);
};

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
                                    setIsUpdate={setIsUpdate}
                                    setIsModal={setIsModal}
                                />
                            )} 
                        />
                    </tbody>
                </table>
            </>) : (<>
                <h1>Kurs Biriktirilmagan</h1>
            </>)
        }
        <Dialog isOpen={isModal} onClose={handleClose}>
            <form className={cls.MainMentorStudentsGroupTab__dialog}>
                <h2>Kurs Biriktirish</h2>
                <div>
                    <div>
                        <FormSelect
                            label='Kurs Tanlang'
                            placeholder='Kurs Tanlang'
                            options={courseForSelectOptions}
                            isClearable
                            isSearchable
                            onChange={(option) => handleSelectChange('course', option?.value)}
                            defaultValue={{}}
                        />
                    </div>
                    <div>
                        <FormDatepicker
                            name='birthday'
                            label='Kurs Boshlanish Sanasi'
                            placeholder='Kurs Boshlanish Sanasi'
                            onChange={(date) => handleDateChange('startDate',  dayjs(date).format('YYYY-MM-DD'))}
                        />
                    </div>
                    <div>
                        <FormDatepicker
                            name='birthday'
                            label='Kurs Tugash Sanasi'
                            placeholder='Kurs Tugash Sanasi'
                            onChange={(date) => handleDateChange('endDate', dayjs(date).format('YYYY-MM-DD'))}
                        />
                    </div>
                    <div>
                        <FormSelect
                            label='Asosiy Mentor Tanlang'
                            placeholder='Asosiy Mentorni Tanlang'
                            options={mainMentorOptions}
                            isClearable
                            isSearchable
                            onChange={(option) => handleSelectChange('teacher', option?.value)}
                        />
                    </div>
                    <div>
                        <FormSelect
                            label='Nazoratchi Mentor Tanlang'
                            placeholder='Nazoratchi Mentorni Tanlang'
                            options={callMentorOptions}
                            isClearable
                            isSearchable
                            onChange={(option) => handleSelectChange('secondTeacher', option?.value)}
                        />
                    </div>
                </div>
                <div className={cls.MainMentorStudentsGroupTab__dialog__buttons}>
                    <RedButton onClick={() => {
                        setIsModal(false) 
                        setIsUpdate(false)
                        setCourseData(null)
                        }
                    }>Bekor Qilish</RedButton>
                    {isUpdate ? 
                        <Button onClick={() => handleUpdateUserCourse()}>O'zgartirish</Button>
                    : 
                        <Button onClick={() => handleAddCourseToUser()}>Qo'shish</Button>
                    }
                </div>
            </form>
        </Dialog>
    </div>
  )
}

export default UserCourseListTable