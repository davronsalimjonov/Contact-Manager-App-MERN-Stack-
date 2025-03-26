import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import { ADAPTATION_WORKSPACE_STATUS } from '@/constants/enum';
import WorkspaceTable from '@/components/templates/WorkspaceTable';
import { updateStudentAdaptationStatus } from '@/services/students';
import StudentAdaptationCard from '@/components/UI/moleculs/StudentAdaptationCard';
import ReminderFormModal from '@/components/UI/organisms/ReminderFormModal';
import ChangeAdaptationMentorForm from '@/components/UI/organisms/ChangeAdaptationMentorForm';

const AdaptationWorkspaceTable = ({
    students = [],
    withReminder = true,
    allowReplaceMentor = false,
    onDrop
}) => {
    const navigate = useNavigate()
    const errorCount = useRef(0)
    const [reminder, setReminder] = useState({ isOpen: false, userId: null, userCourseId: null })
    const [changeAdaptationMentor, setChangeAdaptationMentor] = useState({ isOpen: false, adaptationId: null })

    const studentsByStatus = students?.reduce((acc, student) => {
        const studentItem = {
            id: student?.id,
            userCourseId: student?.userCourse?.id,
            userId: student?.userCourse?.user?.id,
            fullName: getUserFullName(student?.userCourse?.user),
            phone: student?.userCourse?.user?.phone,
            commingDate: student?.startDate,
            firstContactDate: student?.firstContactDate,
            operator: getUserFullName(student?.userCourse?.salesManager),
            mentor: student?.mentor
        }

        if (!acc[student?.status]) {
            acc[student?.status] = []
        }
        acc[student?.status].push(studentItem)
        return acc
    }, {}) || {}

    const workspaceColumns = [
        {
            id: ADAPTATION_WORKSPACE_STATUS.NEW,
            title: 'Yangi',
            color: 'rgba(18, 86, 219, 1)',
            items: studentsByStatus[ADAPTATION_WORKSPACE_STATUS.NEW] || []
        },
        {
            id: ADAPTATION_WORKSPACE_STATUS.LEVEL_DETECTED,
            title: 'Darajasi aniqlangan',
            color: 'rgba(3, 221, 50, 1)',
            items: studentsByStatus[ADAPTATION_WORKSPACE_STATUS.LEVEL_DETECTED] || []
        },
        {
            id: ADAPTATION_WORKSPACE_STATUS.ADAPTATION_COMPLETED,
            title: 'Adaptatsiya tugatildi',
            color: 'rgba(255, 196, 3, 1)',
            items: studentsByStatus[ADAPTATION_WORKSPACE_STATUS.ADAPTATION_COMPLETED] || []
        },
        {
            id: ADAPTATION_WORKSPACE_STATUS.NOT_RESPONDED,
            title: 'Javob bermadi',
            color: 'rgba(255, 0, 0, 1)',
            items: studentsByStatus[ADAPTATION_WORKSPACE_STATUS.NOT_RESPONDED] || []
        },
        {
            id: ADAPTATION_WORKSPACE_STATUS.ISSUE,
            title: 'Muammoli',
            color: 'rgba(130, 128, 255, 1)',
            items: studentsByStatus[ADAPTATION_WORKSPACE_STATUS.ISSUE] || []
        },
        {
            id: ADAPTATION_WORKSPACE_STATUS.PAUSED,
            title: 'Pauza',
            color: 'rgba(255, 52, 219, 1)',
            items: studentsByStatus[ADAPTATION_WORKSPACE_STATUS.PAUSED] || []
        }
    ]

    const handleStatusChange = async ({ draggableId, destination: { droppableId, index }, source: { droppableId: sourceDroppableId } }) => {
        try {
            await updateStudentAdaptationStatus(draggableId, { status: droppableId, index })
            const student = studentsByStatus[draggableId]?.find(item => item.id === draggableId)
            const firstContactDate = student?.firstContactDate || new Date().toISOString()
            onDrop?.(draggableId, { status: droppableId, index, firstContactDate })
        } catch (error) {
            errorCount.current= errorCount?.current + 1
            onDrop?.(draggableId, { status: sourceDroppableId, index })
            toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        }
    }

    return (
        <>
            <ReminderFormModal
                isOpen={reminder.isOpen}
                type='adaptation-notification'
                typeId={`${reminder?.userCourseId}/${reminder?.userId}`}
                onClose={() => setReminder({ isOpen: false, userId: null, userCourseId: null })}
            />
            <WorkspaceTable
                key={students?.length + (errorCount?.current + '')}
                columns={workspaceColumns}
                onChange={handleStatusChange}
                renderItem={(item, status) => (
                    <StudentAdaptationCard
                        key={item.id}
                        adaptationId={item?.id}
                        phone={item.phone}
                        fullName={item.fullName}
                        operator={item?.operator}
                        commingDate={item.commingDate}
                        showStatus={status === ADAPTATION_WORKSPACE_STATUS.NEW && !item?.firstContactDate}
                        showTimer
                        withReminder={withReminder}
                        allowReplaceMentor={allowReplaceMentor}
                        callMentorFullName={getUserFullName(item?.mentor)}
                        callMentorAvatar={item?.mentor?.url}
                        onClick={() => navigate(`/students/${item.userCourseId}/${item.userId}`)}
                        onClickChat={() => navigate(`/students/chat/${item.userCourseId}`)}
                        onClickTask={() => setReminder({ isOpen: true, userId: item.userId, userCourseId: item.userCourseId })}
                        onClickChange={() => setChangeAdaptationMentor({ isOpen: true, adaptationId: item.id })}
                    />
                )}
            />
            <ChangeAdaptationMentorForm
                isOpen={changeAdaptationMentor?.isOpen}
                adaptationId={changeAdaptationMentor?.adaptationId}
                onClose={() => setChangeAdaptationMentor({ isOpen: false, adaptationId: null })}
            />
        </>
    )
}

export default AdaptationWorkspaceTable;