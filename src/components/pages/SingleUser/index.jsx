    import dayjs from 'dayjs';
    import toast from 'react-hot-toast';
    import { useNavigate, useParams } from 'react-router-dom';
    import { useQueryClient } from 'react-query';
    import { customToast } from '@/utils/toast';
    import { updateUser } from '@/services/user';
    import Loader from '@/components/UI/atoms/Loader';
    import { objectToFormData } from '@/utils/lib';
    import cls from './SingleUser.module.scss';
    import useGetUserById from '@/hooks/useGetUserById';
    import UserInformationForm from '@/components/UI/organisms/UserInformationForm';
    import UserCourseListTable from '@/components/templates/UserCourseListTable';
    import { useState } from 'react';
    import { useGetCourse } from '@/hooks/useGetCourse';
    import useGetMentors from '@/hooks/useGetMentors';
    import { addUserCourse, updateUserCourse } from '@/services/course';

    const SingleUser = () => {
        const { userId } = useParams()
        const queryClient = useQueryClient()
        const [isModal, setIsModal] = useState(false)
        const [isUpdate, setIsUpdate] = useState(false)
        const [courseId, setCourseId] = useState('')
        const [courseData, setCourseData] = useState( isModal ? {
            course: '', 
            startDate: '', 
            endDate: '', 
            teacher: '', 
            secondTeacher: '', 
        } : null)

        const { 
            singleUser: {data: user, isLoading: isLoadingSingleUser},
            userCourseList: {data: userCourseList, isLoading: isUserCourseListLoading, refetch}
        } = useGetUserById(userId) 

        const { 
            callMentors: { data: callMentors, isLoading: isLoadingCallMentors},
            mainMentors: { data: mainMentors, isLoading: isLoadingMainMentors}
        } = useGetMentors()

        const {
            courseForSelect: { data: courseForSelect, isLoading: isCourseForSelectLoading},
        } = useGetCourse()

        const navigate = useNavigate()
        
        const userFormData = {
            id: user?.id || '',
            avatar: user?.url || '',
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            phone: user?.phone || '',
            secondPhone: user?.secondPhone || '',
            thirdPhone: user?.thirdPhone || '',
            birthday: user?.birthday || '',
            gender: String(user?.gender) || '',
            createdAt: user?.createdAt ? dayjs(user?.createdAt).format('DD.MM.YYYY') : ''
        }

        const handleUpdateUser = async (data) => {
            try {
                delete data.id
                delete data.createdAt
                data.phone = data.phone
                data.secondPhone = data.secondPhone
                data.thirdPhone = data.thirdPhone
                data.gender = String(data.gender)

                if (!data?.birthday) delete data.birthday
                if (!(data?.avatar instanceof File) && data?.avatar !== null) delete data.avatar

                const fd = objectToFormData(data)

                const updatedUser = await updateUser(userId, fd)
                queryClient.setQueryData(['user-course', userId], (oldData) => ({ ...oldData, user: updatedUser }))
                queryClient.setQueriesData(['students'], oldData => ({
                    ...oldData,
                    pages: oldData?.pages?.map(page => ({
                        ...page,
                        items: page?.items?.map(item => {
                            if (item?.user?.id === userId) {
                                item.user = updatedUser
                            }
                            return item
                        })
                    }))
                }))
                toast.success("Malumotlar o'zgartirildi")
                navigate(-1)
                
            } catch (error) {
                const res = error?.response?.data
                customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')
            }
        }

        const handleSelectChange = (key, value) => {
            setCourseData((prev) => ({
                ...prev,
                [key]: value,
            }));
        };
        
        const handleDateChange = (key, date) => {
            setCourseData((prev) => ({
                ...prev,
                [key]: date,
            }));
        };

        const handleAddCourseToUser = async () => {
            try {
                if (!courseData?.secondTeacher || !courseData?.course || !courseData?.startDate || !courseData?.endDate || !courseData?.teacher) {
                    customToast?.error('Ma`lumotlarni To`liq Kiriting')
                    return
                }

                const res = await addUserCourse({ user: userId, ...courseData })

                if (res?.status === 201) {
                    await refetch()
                    setIsModal(false)
                    customToast?.success("Kurs Qo'shildi")
                } 
            } catch (error) {
                const res = error?.response?.data
                    customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')
            }    
        }

        const handleUpdateUserCourse = async () => {
            try {
                if (!courseData?.secondTeacher && (!courseData?.teacher) && (!courseData?.startDate) && (!courseData?.endDate) && (!courseData?.course)) {
                    customToast?.error('Kamida 1 ta ma`lumot o`zgartiring')
                }

                const res = await updateUserCourse(courseId, {...courseData})

                if (res?.status === 200) {
                    await refetch()
                    setIsModal(false)
                    setIsUpdate(false)
                    setCourseId('')
                    customToast?.success("Ma'lumotlar O'zgartirildi")
                } 
            } catch (error) {
                const res = error?.response?.data
                    customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')
            } 
        }

        return (
            <div className={cls.page}>
                {!isLoadingSingleUser && !isUserCourseListLoading ? (
                    <>
                        <UserInformationForm 
                            onSubmit={handleUpdateUser} 
                            defaultValues={userFormData} 
                            courseId={userId}
                        />
                        <UserCourseListTable
                            courses={userCourseList}
                            isModal={isModal}
                            setIsModal={setIsModal}
                            callMentors={callMentors}
                            mainMentors={mainMentors}
                            courseForSelect={courseForSelect}
                            setCourseData={setCourseData}
                            handleSelectChange={handleSelectChange}
                            handleDateChange={handleDateChange}
                            handleUpdateUserCourse={handleUpdateUserCourse}
                            handleAddCourseToUser={handleAddCourseToUser}
                            setIsUpdate={setIsUpdate}
                            isUpdate={isUpdate}
                            setCourseId={setCourseId}
                        />
                    </>
                ) : (
                    <Loader />
                )}
            </div>
        );
    }

    export default SingleUser;