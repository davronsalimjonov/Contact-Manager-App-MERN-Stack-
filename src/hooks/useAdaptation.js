import { useQuery } from "react-query"
import { getAllAdaptation } from "@/services/adaptation"

export const useGetAllAdaptation = (params) => {
    return useQuery(['adaptation', ...Object.values()], () => getAllAdaptation(params))
}