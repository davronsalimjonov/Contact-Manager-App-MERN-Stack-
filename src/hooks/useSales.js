import { useMutation, useQuery, useQueryClient } from "react-query"
import { createSalesGroup, getSalesGroups, getSellersByGroup, getSellersForSelect, setSellerPlan, setGroupPlan, updateSalesGroup } from "@/services/sales"

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

export const useSetSellerPlanMutation = () => {
    const queryClient = useQueryClient()
    const updatePlanMutation = useMutation({
        mutationKey: ['sellers'],
        mutationFn: ({ id, body }) => setSellerPlan(id, body),
        onSuccess: onUpdatePlanSuccess
    })

    function onUpdatePlanSuccess(_, body) {
        const sellerId = body.id
        queryClient.setQueriesData(['sellers'], (oldData) => {
            return {
                ...oldData,
                items: oldData?.items?.map(seller => {
                    if(seller?.id === sellerId) seller.plan = body.body.plan
                    return seller
                })
            }
        })
    }

    return updatePlanMutation
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

export const useChangeGroupLeaderMutation = () => {
    const queryClient = useQueryClient()
    const changeLeaderMutation = useMutation({
        mutationKey: ['sellers'],
        mutationFn: ({ id, body }) => changeGroupLeader(id, body),
        onSuccess: onChangeLeaderSuccess
    })

    function onChangeLeaderSuccess(res) {
        queryClient.setQueryData(['sellers', res.id], (oldData) => {
            oldData.teamLead = res.teamLead
            return oldData
        })
    }

    return changeLeaderMutation
}

export const useTransferSellerMutation = () => {
    const queryClient = useQueryClient()
    const transferMutation = useMutation({
        mutationKey: ['sellers'],
        mutationFn: ({ id, body }) => transferSeller(id, body),
        onSuccess: onTransferSuccess
    })

    function onTransferSuccess(res, body) {
        body = body.body

        const sellerData = queryClient.getQueryData(['sellers', body.currentGroup])?.items?.find(seller => seller?.id === res?.id)
        queryClient.setQueryData(['sellers', body.salesGroup], (oldData) => ({
            ...oldData,
            items: [...(oldData?.items || []), sellerData]
        }))
        if (queryClient.getQueryState(['sellers', body.currentGroup])) {
            queryClient.setQueryData(['sellers', body.currentGroup], (oldData) => ({
                ...oldData,
                items: oldData?.items?.filter(seller => seller?.id !== res?.id)
            }))
        }
    }

    return transferMutation
}