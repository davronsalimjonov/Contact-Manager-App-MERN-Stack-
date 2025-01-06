import { useQuery } from "react-query"
import { getFilterWords, } from "@/services/words"

export function useGetWords(params) {
    const query = useQuery(['dictionary', params], () => getFilterWords(params), { staleTime: Infinity, cacheTime: Infinity })

    return query
}