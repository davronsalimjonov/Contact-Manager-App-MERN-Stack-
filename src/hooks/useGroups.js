import { useMutation, useQuery, useQueryClient } from "react-query";
import { removeEmptyKeys } from "@/utils/lib";
import { createGroups } from "@/services/groups";
import { getActiveGroups, getGroupInfo, getGroupsByLevel, getGroupStudents, transferStudent, updateGroup } from "@/services/group"
import { useGetUserId } from "./useGetUser";

export const useGetGroupsByLevel = (level, params) => {
    return useQuery(
        ["groups", level, ...Object.values(removeEmptyKeys(params))],
        () => getGroupsByLevel({ level, ...params }),
        { cacheTime: Infinity, staleTime: Infinity }
    );
};

export const useCreateGroupMutation = () => {
    const queryClient = useQueryClient();
    const createGroupMutation = useMutation({
        mutationFn: createGroups,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups"], exact: false })
        },
    });

    return createGroupMutation
};

export const useUpdateGroupMutation = () => {
    const queryClient = useQueryClient();
    const updateGroupMutation = useMutation({
        mutationFn: async (data) => {
            const groupId = data?.id
            delete data?.id
            return await updateGroup(groupId, data)
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['group-info', data?.id], data)
            queryClient.setQueriesData(['groups', data?.level], (oldData) => {
                return {
                    ...oldData,
                    items: oldData?.items?.map(group => {
                        if (group?.id === data?.id) {
                            group = { ...group, ...data }
                        }
                        return group
                    })
                }
            })
        },
    });

    return updateGroupMutation
};

export const useTransferMutation = () => {
    const mentorId = useGetUserId()
    const queryClient = useQueryClient();
    const transferMutation = useMutation({
        mutationFn: transferStudent,
        onSuccess: onSuccessTransfer
    });

    function onSuccessTransfer(_, data) {
        const from = data?.from
        const to = data?.to

        queryClient.invalidateQueries(['students', mentorId, from])
        queryClient.invalidateQueries(['students', mentorId, to])
    }

    return transferMutation
}

export const useGetActiveGroups = (params = {}, enabled = true) => {
    return useQuery(['active-groups', ...Object.values(removeEmptyKeys(params))], () => getActiveGroups(params), { cacheTime: Infinity, staleTime: Infinity, enabled })
}

export const useGetGroupInfo = (groupId) => {
    return useQuery(['group-info', groupId], () => getGroupInfo(groupId), { cacheTime: Infinity, staleTime: Infinity })
}

export const useGetGroupStudents = (groupId, params = {}) => {
    return useQuery(['group-students', groupId, ...Object.values(removeEmptyKeys(params))], () => getGroupStudents(groupId, params), { cacheTime: Infinity, staleTime: Infinity })
}