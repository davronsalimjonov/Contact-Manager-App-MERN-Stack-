import { queryClient } from "@/services/api";
import { getGroupsByLevel } from "@/services/group";
import { createGroups } from "@/services/groups";
import { removeEmptyKeys } from "@/utils/lib";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
