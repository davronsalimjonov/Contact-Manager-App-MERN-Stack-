import { useMutation, useQuery, useQueryClient } from "react-query"
import { removeEmptyKeys } from "@/utils/lib"
import { createSellerStudent, getSaleStatistic, getSellerInvoice, getSellerMetrics, getSellerStudents, updateSellerPlan } from "@/services/seller"
import { useGetUserId } from "./useGetUser"

const useGetSellerStudents = (sellerId, params = {}) => {
    let userId = useGetUserId()
    if(sellerId) userId = sellerId
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

export const useGetSellerInvoices = (params = {}) => {
    const userId = useGetUserId()
    return useQuery(['seller-invoices', userId, ...Object.values(removeEmptyKeys(params))], () => getSellerInvoice(userId, params))
}

export const useSellerMutations = (dateKey) => {
    const userId = useGetUserId()
    const queryClient = useQueryClient()
    const createSellerStudentMutation = useMutation({ mutationFn: createSellerStudent, onSuccess: onCreateStudentSuccess })
    const sellerPlanMutation = useMutation({ mutationFn: (data) => updateSellerPlan(userId, data), onSuccess: onPlanUpdateSuccess })

    function onCreateStudentSuccess() {
        queryClient.invalidateQueries(['seller-students'])
    }

    function onPlanUpdateSuccess(_, data) {
        queryClient.invalidateQueries(['seller-metrics', userId, ...Object.values(removeEmptyKeys(dateKey))], oldData => ({...oldData, plan: data?.plan}))
    }

    return {
        createSellerStudentMutation,
        sellerPlanMutation
    }
}

export default useGetSellerStudents