import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useGetUserId } from '@/hooks/useGetUser';
import { updateUserCourse } from '@/services/course';
import { addStudentToGroup } from '@/services/group';
import { useGetUserCourses } from '@/hooks/useUserCourse';
import Loader from '../../UI/atoms/Loader';
import GroupPickerModal from '../../UI/organisms/GroupPickerModal';
import ConfirmationModal from '../../UI/organisms/ConfirmationModal';
import UserCourseRow from '../../UI/moleculs/UserCourseRow';
import cls from './UserCourseTable.module.scss';

const UserCourseTable = ({ userId, userCourseId, disabled = true }) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mentorId = useGetUserId()
    const [groupPicker, setGroupPicker] = useState({ isOpen: false, level: '', userCourseId: null })
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, groupId: null, groupName: null, userCourseId: null })
    const { data: courses, isLoading } = useGetUserCourses(userId)

    const handleUpdateUserCourse = async (userCourseId, data) => {
        try {
            const res = await updateUserCourse(userCourseId, data)
            queryClient.setQueryData(['user-courses', userId], (oldData) => {
                return oldData?.map(course => course?.id === userCourseId ? res : course)
            })
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        }
    }

    const handleAddToGroup = async (groupId, userCourseId) => {
        try {
            setConfirmModal(state => ({ ...state, isOpen: false }))
            queryClient.setQueryData(['user-courses', userId], (oldData) => {
                const group = { id: groupId, title: confirmModal?.groupName }
                return oldData?.map(course => course?.id === userCourseId ? { ...course, group } : course)
            })
            await addStudentToGroup({ group: groupId, student: userCourseId })
            queryClient.invalidateQueries(['students', mentorId])
            queryClient.setQueriesData(['active-groups'], (oldData) => oldData?.map(group => group?.id === groupId ? { ...group, studentsCount: group?.studentsCount + 1 } : group))
        } catch (error) {
            queryClient.setQueryData(['user-courses', userId], (oldData) => {
                return oldData?.map(course => course?.id === userCourseId ? { ...course, group: null } : course)
            })
            toast.error(error?.response?.data?.message || 'Oquvchi guruhga qoshilmadi')
        }
    }

    return (
        <>
            <ConfirmationModal
                title={`Rostan ${confirmModal?.groupName} guruhga biriktirmoqchimisiz?`}
                isOpen={confirmModal?.isOpen}
                onClose={() => setConfirmModal(state => ({ ...state, isOpen: false }))}
                onConfirm={() => handleAddToGroup(confirmModal?.groupId, confirmModal?.userCourseId)}
            />
            <GroupPickerModal
                level={groupPicker.level}
                isOpen={groupPicker.isOpen}
                onClose={() => setGroupPicker(state => ({ ...state, isOpen: false }))}
                onChooseGroup={(group) => (
                    setConfirmModal({ isOpen: true, groupId: group.id, groupName: group.title, userCourseId: groupPicker.userCourseId }),
                    setGroupPicker(state => ({ ...state, isOpen: false }))
                )}
            />
            <div className={cls.card}>
                <h3 className={cls.card__title}>Kurs</h3>
                {!isLoading ? (
                    <div className={cls.card__table}>
                        <div className={cls.card__table__header}>
                            <div className={cls.card__table__header__row}>
                                <span>№</span>
                                <span>Kurs nomi</span>
                                <span>Sotib olgan sana</span>
                                <span>Tugash sanasi</span>
                                <span>Darajasi</span>
                                <span>Nazoratchi mentor</span>
                                <span>Guruh</span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className={cls.card__table__body}>
                            {courses?.map((course, index) => (
                                <UserCourseRow
                                    key={course?.id}
                                    disabled={disabled ? course?.id !== userCourseId : false}
                                    index={index + 1}
                                    level={course?.level}
                                    endDate={course?.endDate}
                                    hasGroup={!!course?.group}
                                    group={course?.group?.title}
                                    startDate={course?.startDate}
                                    courseName={course?.course?.title}
                                    callMentor={course?.secondTeacher?.id}
                                    reSales={course?.reSales}
                                    onLevelChange={({ value: level }) => handleUpdateUserCourse(course?.id, { level })}
                                    onChangeCallMentor={({ value: secondTeacher }) => handleUpdateUserCourse(course?.id, { secondTeacher })}
                                    onClickAddCourse={() => setGroupPicker({ isOpen: true, level: course?.level, userCourseId: course?.id })}
                                    onClickEdit={() => navigate(`/user-course/${course?.id}`)}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <Loader size={40} />
                )}
            </div>
        </>
    );
}

export default UserCourseTable;