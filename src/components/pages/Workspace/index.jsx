import useGetWorkspace from "@/hooks/useGetWorkspace";
import WorkspaceTable from "@/components/templates/WorkspaceTable";
import Loader from "@/components/UI/atoms/Loader";

const Workspace = () => {
    const { data: workspace, isLoading: isLoadingWorkspace } = useGetWorkspace()
    
    return !isLoadingWorkspace ? (
        <WorkspaceTable workspace={workspace} />
    ) : (
        <Loader />
    )
}

export default Workspace;
