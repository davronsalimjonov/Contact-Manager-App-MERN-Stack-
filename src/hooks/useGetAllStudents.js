import { getAllStudents } from "@/services/user"
import { useQuery } from "react-query"

export function useGetAllStudents(params) {
    const query = useQuery(['students', params], () => getAllStudents(params), { staleTime: Infinity, cacheTime: Infinity })

    return query
}