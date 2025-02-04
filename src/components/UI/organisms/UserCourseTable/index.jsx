import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useGetUserId } from '@/hooks/useGetUser';
import { updateUserCourse } from '@/services/course';
import { addStudentToGroup } from '@/services/group';
import { useGetUserCourses } from '@/hooks/useUserCourse';
import Loader from '../../atoms/Loader';
import UserCourseRow from '../../moleculs/UserCourseRow';
import GroupPickerModal from '../GroupPickerModal';
import ConfirmationModal from '../ConfirmationModal';
import cls from './UserCourseTable.module.scss';
import { useGetUserId } from '@/hooks/useGetUser';

const UserCourseTable = ({ userId, userCourseId }) => {
    const queryClient = useQueryClient()
    const mentorId = useGetUserId()
    const [groupPicker, setGroupPicker] = useState({ isOpen: false, level: '', userCourseId: null })
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, groupId: null, groupName: null, userCourseId: null })
    const { data: courses, isLoading } = useGetUserCourses(userId)

    const handleUpdateUserLevel = (userCourseId, level) => {
        try {
            queryClient.setQueryData(['user-courses', userId], (oldData) => {
                return oldData?.map(course => course?.id === userCourseId ? { ...course, level } : course)
            })
            updateUserCourse(userCourseId, { level })
        } catch (error) {
            queryClient.setQueryData(['user-courses', userId], (oldData) => {
                return oldData?.map(course => course?.id === userCourseId ? { ...course, level: null } : course)
            })
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
                onCancel={() => setConfirmModal(state => ({ ...state, isOpen: false }))}
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
                    <table className={cls.card__table}>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Kurs nomi</th>
                                <th>Sotib olgan sana</th>
                                <th>Tugash sanasi</th>
                                <th>Darajasi</th>
                                <th>Guruh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses?.map((course, index) => (
                                <UserCourseRow
                                    key={course?.id}
                                    disabled={course?.id !== userCourseId}
                                    index={index + 1}
                                    level={course?.level}
                                    endDate={course?.endDate}
                                    hasGroup={!!course?.group}
                                    group={course?.group?.title}
                                    startDate={course?.startDate}
                                    courseName={course?.course?.title}
                                    onClickAddCourse={() => setGroupPicker({ isOpen: true, level: course?.level, userCourseId: course?.id })}
                                    onLevelChange={({ value: level }) => handleUpdateUserLevel(course?.id, level)}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <Loader size={40} />
                )}
            </div>
        </>
    );
}

export default UserCourseTable;