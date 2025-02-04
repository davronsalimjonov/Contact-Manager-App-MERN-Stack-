import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import Loader from '@/components/UI/atoms/Loader';
import { ADAPTATION_WORKSPACE_STATUS } from '@/constants/enum';
import WorkspaceTable from '@/components/templates/WorkspaceTable';
import { useGetStudentsForAdaptation } from '@/hooks/useGetStudents';
import StudentAdaptationCard from '@/components/UI/moleculs/StudentAdaptationCard';
import { updateStudentAdaptationStatus } from '@/services/students';
import cls from './AdaptationWorkspace.module.scss';
import toast from 'react-hot-toast';

const AdaptationWorkspace = () => {
    const navigate = useNavigate()
    const { data: students, isLoading, updateStudentAdaptation } = useGetStudentsForAdaptation()

    const studentsByStatus = students?.reduce((acc, student) => {
        const studentItem = { 
            id: student?.id,
            userCourseId: student?.userCourse?.id,
            userId: student?.userCourse?.user?.id,
            fullName: getUserFullName(student?.userCourse?.user), 
            phone: student?.userCourse?.user?.phone, 
            commingDate: student?.startDate
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

    const handleStatusChange = async ({ draggableId, destination: { droppableId, index } }) => {
        try {
            await updateStudentAdaptationStatus(draggableId, { status: droppableId, index })
            updateStudentAdaptation(draggableId, { status: droppableId, index })
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')    
        }
    }
    
    return !isLoading ? (
        <WorkspaceTable
            key={students?.length}
            columns={workspaceColumns}
            onChange={handleStatusChange}
            renderItem={(item, status) => (
                <StudentAdaptationCard
                    key={item.id}
                    phone={item.phone}
                    fullName={item.fullName}
                    commingDate={item.commingDate}
                    showStatus={status === ADAPTATION_WORKSPACE_STATUS.NEW}
                    showTimer={status === ADAPTATION_WORKSPACE_STATUS.NEW}
                    onClick={() => navigate(`${item.userCourseId}/${item.userId}`)}
                />
            )}
        />
    ) : (
        <Loader />
    );
}

export default AdaptationWorkspace;