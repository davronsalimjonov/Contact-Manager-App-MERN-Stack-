import Loader from "@/components/UI/atoms/Loader";
import { getStatusColor } from "@/utils/workspace";
import { WORKSPACE_STATUS } from "@/constants/enum";
import useGetWorkspace from "@/hooks/useGetWorkspace";
import { updateWorkspaceStatus } from "@/services/workspace";
import WorkspaceTable from "@/components/templates/WorkspaceTable";

const Workspace = () => {
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

    return !isLoadingWorkspace ? (
        <WorkspaceTable 
            onChange={handleChangeCard} 
            columns={workspaceColumns} 
        />
    ) : (
        <Loader />
    )
}

export default Workspace;
