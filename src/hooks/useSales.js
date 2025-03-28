import { useMutation, useQuery, useQueryClient } from "react-query"
import { createSalesGroup, getSalesGroups, getSellersByGroup, getSellersForSelect, setSellerPlan, setGroupPlan, updateSalesGroup, transferSeller, changeGroupLeader, getTeamLeaderGroup, getSalesStatistics, setMonthlyPlan, getGroupsStatistics } from "@/services/sales"
import { useGetUserId } from "./useGetUser"
import { removeEmptyKeys } from "@/utils/lib"

export const useGetSalesGroups = () => {
    return useQuery(['sales-groups'], getSalesGroups, { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetSellersForSelect = (params, options = {}) => {
    return useQuery(['sellers-for-select'], () => getSellersForSelect(params), { staleTime: Infinity, cacheTime: Infinity, ...options })
}

export const useGetSellersByGroup = (groupId) => {
    return useQuery(['sellers', groupId], () => getSellersByGroup(groupId), { staleTime: Infinity, cacheTime: Infinity, enabled: !!groupId })
}

export const useGetTeamLeaderGroup = () => {
    const teamLeaderId = useGetUserId()
    return useQuery(['team-lead-group', teamLeaderId], () => getTeamLeaderGroup(teamLeaderId), { staleTime: Infinity, cacheTime: Infinity, enabled: !!teamLeaderId })
}

export const useGetSalesStatistics = (params) => {
    return useQuery(['sales-statistics', ...Object.values(removeEmptyKeys(params))], () => getSalesStatistics(params))
}

export const useGetGroupsStatistics = (params) => {
    return useQuery(['groups-statistics', ...Object.values(removeEmptyKeys(params))], () => getGroupsStatistics(params))
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
                    if (seller?.id === sellerId) seller.plan = body.body.plan
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

export const useSetMonthlyPlanMutation = () => {
    const queryClient = useQueryClient()
    const setPlanMutation = useMutation({
        mutationKey: ['sales-statistics'],
        mutationFn: setMonthlyPlan,
        onSuccess: onSetPlanSuccess
    })

    function onSetPlanSuccess() {
        queryClient.invalidateQueries({ queryKey: ['sales-statistics'] })
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

    function onChangeLeaderSuccess() {
        queryClient.invalidateQueries({ queryKey: ['sellers'] })
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

    function onTransferSuccess() {
        queryClient.invalidateQueries({ queryKey: ['sellers'] })
    }

    return transferMutation
}