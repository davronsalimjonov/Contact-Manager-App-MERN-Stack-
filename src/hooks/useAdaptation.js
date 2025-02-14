import { useQuery, useQueryClient } from "react-query"
import { removeEmptyKeys } from "@/utils/lib"
import { getAllAdaptation } from "@/services/adaptation"

export const useGetAllAdaptation = (params = {}) => {
    const queryClient = useQueryClient()
    const query = useQuery(['adaptation', ...Object.values(removeEmptyKeys(params))], () => getAllAdaptation(params))

    const updateStudentAdaptation = async (adaptationId, data) => {
        queryClient.setQueryData(['adaptation'], (students) => {
            return students?.map(adaptation => adaptation.id === adaptationId ? { ...adaptation, ...data } : adaptation)
        })
    }

    return { ...query, updateStudentAdaptation }
}