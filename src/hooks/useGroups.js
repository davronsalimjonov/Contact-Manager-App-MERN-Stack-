import { useMutation, useQuery, useQueryClient } from "react-query";
import { removeEmptyKeys } from "@/utils/lib";
import { createGroups } from "@/services/groups";
import { getActiveGroups, getGroupInfo, getGroupsByLevel, getGroupStudents } from "@/services/group"

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
        mutationFn: (data) => {
            createGroups(data);
        },
        onSuccess: (data) => {
            queryClient.setQueriesData(["create-groups", data], () => data)
            queryClient.invalidateQueries({
                queryKey: ["groups"], exact: false
            })
        },
    });

    return {
        createGroupMutation,
    };
};

export const useGetActiveGroups = (params, enabled = true) => {
    return useQuery(['active-groups', ...Object.values(removeEmptyKeys(params))], () => getActiveGroups(params), { cacheTime: Infinity, staleTime: Infinity, enabled })
}

export const useGetGroupInfo = (groupId) => {
    return useQuery(['group-info', groupId], () => getGroupInfo(groupId), { cacheTime: Infinity, staleTime: Infinity })
}

export const useGetGroupStudents = (groupId, params = {}) => {
    return useQuery(['group-students', groupId, ...Object.values(removeEmptyKeys(params))], () => getGroupStudents(groupId, params), { cacheTime: Infinity, staleTime: Infinity })
}