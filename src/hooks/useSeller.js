import { useQuery } from "react-query"
import { removeEmptyKeys } from "@/utils/lib"
import { getSaleStatistic, getSellerMetrics, getSellerStudents } from "@/services/seller"
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

export const useGetSellerMetrics = () => {
    const userId = useGetUserId()
    return useQuery(['seller-metrics', userId], () => getSellerMetrics(userId), { cacheTime: Infinity, staleTime: Infinity })
}

export default useGetSellerStudents