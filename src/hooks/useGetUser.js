import { useQuery } from "react-query"
import { getUserInfo } from "@/services/auth"

function useGetUser() {
    const query = useQuery(['user-info'], getUserInfo, { staleTime: Infinity, cacheTime: Infinity })

    return query
}

export default useGetUser