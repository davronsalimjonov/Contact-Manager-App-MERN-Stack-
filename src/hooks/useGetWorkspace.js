import { useQuery } from "react-query";
import { getWorkspace } from "@/services/workspace";
import { useGetUserId } from "./useGetUser";

const useGetWorkspace = () => {
    const userId = useGetUserId()
    return useQuery(['workspace', userId], () => getWorkspace(userId), { cacheTime: Infinity, staleTime: Infinity })
}

export default useGetWorkspace;