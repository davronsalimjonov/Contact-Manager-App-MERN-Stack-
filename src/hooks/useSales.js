import { useMutation, useQuery, useQueryClient } from "react-query"
import { createSalesGroup, getSalesGroups, getSellersByGroup, getSellersForSelect, setGroupPlan, updateSalesGroup } from "@/services/sales"

export const useGetSalesGroups = () => {
    return useQuery(['sales-groups'], getSalesGroups, { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetSellersForSelect = (options = {}) => {
    return useQuery(['sellers-for-select'], getSellersForSelect, { staleTime: Infinity, cacheTime: Infinity, ...options })
}

export const useGetSellersByGroup = (groupId) => {
    return useQuery(['sellers', groupId], () => getSellersByGroup(groupId), { staleTime: Infinity, cacheTime: Infinity, enabled: !!groupId })
}

export const useCreateSalesGroupMutation = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationKey: ['sales-groups'],
        mutationFn: createSalesGroup,
        onSuccess: onCreateGroupSuccess
    })

    function onCreateGroupSuccess(res) {
        queryClient.setQueryData(['sales-groups'], (oldData) => ([res, ...oldData]))
    }

    return createMutation
}

export const useUpdateSalesGroupMutation = () => {
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationKey: ['sales-groups'],
        mutationFn: ({ id, body }) => updateSalesGroup(id, body),
        onSuccess: onUpdateGroupSuccess
    })

    function onUpdateGroupSuccess(res) {
        queryClient.setQueryData(['sales-groups'], (oldData) => (oldData?.map(group => group?.id === res?.id ? res : group)))
    }

    return updateMutation
}

export const useSetGroupPlanMutation = () => {
    const queryClient = useQueryClient()
    const setPlanMutation = useMutation({
        mutationKey: ['sales-groups'],
        mutationFn: ({ id, body }) => setGroupPlan(id, body),
        onSuccess: onSetPlanSuccess
    })

    function onSetPlanSuccess(res) {
        queryClient.setQueryData(['sales-groups'], (oldData) => (oldData?.map(group => group?.id === res?.id ? res : group)))
    }

    return setPlanMutation
}
