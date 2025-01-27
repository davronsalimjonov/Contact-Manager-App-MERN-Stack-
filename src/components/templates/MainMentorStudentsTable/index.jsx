

import { getDayName } from '@/utils/time';
import { getUserFullName } from '@/utils/lib';
import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import cls from './MainMentorStudentsTable.module.scss';
import MainMentorStudentsTableRow from '@/components/UI/moleculs/MainMentorStudentsTableRow';
import MainMentorStudentsTableHeader from '@/components/UI/organisms/MainMentorsStudentsTableHeader';
import Button from '@/components/UI/atoms/Buttons/Button';
import { customToast } from '@/utils/toast';
import { useState } from 'react';
import MainMentorAddStudentsForm from '@/components/UI/organisms/MainMentorAddStudentsForm';
import { useTransferMutations } from '@/hooks/useGetGroupStudents';
import toast from 'react-hot-toast';
import { addStudentsToGroup } from '@/services/groups';
import { updateUserPassword } from '@/services/user';
import ChangePasswordForm from '@/components/UI/organisms/ChangePasswordForm';

const MainMentorStudentsTable = ({
    students = [],
    isLoading,
    groupSelectStudents,
    activeGroup = '',
    groupId = '',
    isTransfer,
    setIsTransfer,
    refetch,
    isOpen = false,
    setIsOpen
}) => {
    const [courseId, setCourseId] = useState('')
    const [passwordModal, setPasswordModal] = useState(false)
    const { createTransferMutation } = useTransferMutations()
    const [selectedStudents, setSelectedStudents] = useState([])
    
    const handleStudentTransfer = async (data) => {
        data.id = courseId
        await createTransferMutation.mutateAsync(data, {
            onSuccess: () => {
                toast.success("Transfer Amalga Oshirildi")
                setIsOpen(false)
                setCourseId('')
            },
            onError: (err) => toast.error(err?.response?.data?.message || "Xatolik Yuz Berdi")
        })
    }

    const handleAddStudentToGroup = async () => {
        try {
            if (!selectedStudents || selectedStudents.length === 0) {
                customToast?.error("O'quvchilar Qo'shing")
                return
            }

            const response = await addStudentsToGroup({
                group: groupId,
                studentIds: selectedStudents,
            })

            if (response?.status === 201) {
                await refetch()
                setSelectedStudents([])
                setIsOpen(false)
                customToast?.success("O'quvchilar Guruxga Qo'shildi")
            } else {
                customToast?.error(`Xatolik: ${response?.statusText || "Unknown Error"}`)
            }
        } catch (error) {
            customToast?.error("Xatolik Yuz Berdi")
        }
    }

    const handleChangePsw = async (data) => {
        await updateUserPassword(courseId, { ...data })
        customToast?.success("Password O'zgartirildi")
        setPasswordModal(false)
    }

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <MainMentorAddStudentsForm
                isTransfer={isTransfer}
                isOpen={isOpen}
                onSubmit={isTransfer && handleStudentTransfer}
                groupSelectStudents={groupSelectStudents}
                selectedStudents={selectedStudents}
                setSelectedStudents={setSelectedStudents}
                setIsOpen={setIsOpen}
                onClose={() => {
                    setIsOpen(false)
                    setIsTransfer(false)
                    setSelectedStudents([])
                }}
                AddStudentToGroup={handleAddStudentToGroup}
            />
            <ChangePasswordForm
                isOpen={passwordModal}
                onClose={() => setPasswordModal(false)}
                onSubmit={handleChangePsw}
            />
            {students?.length === 0 ? (
                <div className={cls.mainMentorNoData}>
                    <p><span>"{activeGroup}"</span> guruh shakllantirildi. <br />
                        Guruhingizga o’quvchi biriktirsangiz bo’ladi.</p>
                    <div>
                        <Button className={cls.bar__form__button} onClick={
                            () => {
                                setIsOpen(true)
                            }
                        }>
                            O'quvchi Qo'shish
                            <span>+</span>
                        </Button>
                    </div>
                </div>
            ) : (
                <table className={cls.table}>
                    <MainMentorStudentsTableHeader />
                    <tbody>
                        <Mapper
                            data={students}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(student, index) => (
                                <MainMentorStudentsTableRow
                                    index={index + 1}
                                    avatar={student?.url}
                                    setIsModal={setIsOpen}
                                    group={student?.group}
                                    status={student?.status}
                                    userCourseId={student.id}
                                    setCourseId={setCourseId}
                                    phoneNumber={student?.phone}
                                    setIsTransfer={setIsTransfer}
                                    fullName={getUserFullName(student)}
                                    setPasswordModal={setPasswordModal}
                                />
                            )}
                        />
                    </tbody>
                </table>
            )
            }
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default MainMentorStudentsTable;