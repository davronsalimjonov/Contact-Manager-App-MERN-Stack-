import { useMutation, useQuery, useQueryClient } from "react-query"
import { removeEmptyKeys } from "@/utils/lib"
import { createSellerStudent, getSaleStatistic, getSellerInvoice, getSellerMetrics, getSellerStudents, updateSeller, updateSellerPlan } from "@/services/seller"
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

export const useUpdateSellerMutation = () => {
    const queryClient = useQueryClient()
    const updateSellerMutation = useMutation({
        mutationFn: async ({ sellerId, data }) => {
            return await updateSeller(sellerId, data)
        },
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(newSeller) {
        const sellerId = newSeller?.id

        queryClient.setQueriesData(['seller', sellerId], oldData => ([...(oldData || []), newSeller]))
    }

    return updateSellerMutation
}