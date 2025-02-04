import { useQuery, useQueryClient } from "react-query";
import { getWorkspace } from "@/services/workspace";
import { useGetUserId } from "./useGetUser";

const useGetWorkspace = () => {
    const userId = useGetUserId()
    const queryClient = useQueryClient()
    const data = useQuery(['workspace', userId], () => getWorkspace(userId), { cacheTime: Infinity, staleTime: Infinity })
    
    function updateWorkspaceState(id, data) {
        queryClient.setQueriesData(['workspace', userId], (oldData) => {
            return oldData.map(workspace => workspace.id === id ? { ...workspace, ...data } : workspace)
        })
    }

    return { ...data, updateWorkspaceState }
}

export default useGetWorkspace;