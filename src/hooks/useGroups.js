import { getGroupsByLevel } from "@/services/group";
import { createGroups } from "@/services/groups";
import { removeEmptyKeys } from "@/utils/lib";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getActiveGroups, getGroupsByLevel } from "@/services/group"
import { removeEmptyKeys } from "@/utils/lib"
import { useQuery } from "react-query"

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