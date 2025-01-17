import { useMutation, useQuery, useQueryClient } from "react-query"
import { removeEmptyKeys } from "@/utils/lib"
import { createSellerStudent, getSaleStatistic, getSellerMetrics, getSellerStudents } from "@/services/seller"
import { useGetUserId } from "./useGetUser"

const useGetSellerStudents = (params = {}) => {
    const userId = useGetUserId()
    return useQuery(
        ['seller-students', userId, ...Object.values(removeEmptyKeys(params))], 
        () => getSellerStudents(userId, params), 
        { cacheTime: Infinity, staleTime: Infinity }
    ) 
}

export const useGetSaleStatistic = (params = {}) => {
    const userId = useGetUserId()
    return useQuery(
        ['sale-statistic', userId, ...Object.values(removeEmptyKeys(params))], 
        () => getSaleStatistic(userId, params), 
        { cacheTime: Infinity, staleTime: Infinity }
    ) 
}

export const useGetSellerMetrics = (params = {}) => {
    const userId = useGetUserId()
    return useQuery(['seller-metrics', userId, ...Object.values(removeEmptyKeys(params))], () => getSellerMetrics(userId, params), { cacheTime: Infinity, staleTime: Infinity })
}

export const useSellerMutations = () => {
    const queryClient = useQueryClient()
    const createSellerStudentMutation = useMutation({ 
        mutationFn: createSellerStudent,
        onSuccess: onCreateStudentSuccess
    })

    function onCreateStudentSuccess() {
        queryClient.invalidateQueries(['seller-students'])
    }

    return {
        createSellerStudentMutation
    }
}

export default useGetSellerStudents