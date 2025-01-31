import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFullName } from "@/utils/lib";
import Loader from "@/components/UI/atoms/Loader";
import { getStatusColor } from "@/utils/workspace";
import { WORKSPACE_STATUS } from "@/constants/enum";
import useGetWorkspace from "@/hooks/useGetWorkspace";
import { updateWorkspaceStatus } from "@/services/workspace";
import WorkspaceTable from "@/components/templates/WorkspaceTable";
import WorkspaceCallCard from "@/components/UI/moleculs/WorkspaceCallCard";

const Workspace = () => {
    const navigate = useNavigate()
    const { data: workspace, isLoading: isLoadingWorkspace } = useGetWorkspace()

    const workspaceColumns = [
        {
            id: WORKSPACE_STATUS.NOT_CONNECTED,
            title: 'Umumiy',
            color: getStatusColor(WORKSPACE_STATUS.NOT_CONNECTED),
            items: workspace?.filter(item => item.status === WORKSPACE_STATUS.NOT_CONNECTED)
        },
        {
            id: WORKSPACE_STATUS.CALL_BACK,
            title: 'Qayta qo’ng’iroqlar',
            color: getStatusColor(WORKSPACE_STATUS.CALL_BACK),
            items: workspace?.filter(item => item.status === WORKSPACE_STATUS.CALL_BACK)
        },
        {
            id: WORKSPACE_STATUS.NOT_ANSWERED,
            title: 'Telefonga javob bermaganlar',
            color: getStatusColor(WORKSPACE_STATUS.NOT_ANSWERED),
            items: workspace?.filter(item => item.status === WORKSPACE_STATUS.NOT_ANSWERED)
        },
        {
            id: WORKSPACE_STATUS.CONNECTED,
            title: 'Bog’langan qo’ng’iroqlar',
            color: getStatusColor(WORKSPACE_STATUS.CONNECTED),
            items: workspace?.filter(item => item.status === WORKSPACE_STATUS.CONNECTED)
        }
    ]

    const handleChangeCard = ({ destination, draggableId }) => {
        updateWorkspaceStatus(draggableId, { status: destination.droppableId, index: destination.index })
    }

    const handleClickCard = (courseId) => {
        navigate('/students/chat/' + courseId)
    }

    const renderItem = useCallback((item, status) => (
        <WorkspaceCallCard
            key={item?.id}
            fullName={getUserFullName(item?.student)}
            time={item?.time}
            status={status}
            group={item?.group}
            onClickCall={() => handleClickCard(item?.courseId)}
        />
    ), [])

    return !isLoadingWorkspace ? (
        <WorkspaceTable
            onChange={handleChangeCard}
            columns={workspaceColumns}
            renderItem={renderItem}
        />
    ) : (
        <Loader />
    )
}

export default Workspace;
