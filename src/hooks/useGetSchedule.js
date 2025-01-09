import { removeEmptyKeys } from "@/utils/lib";

import useScrollPagination from "./useScrollPagination";
import { useGetUserId } from "./useGetUser";
import { getSchedule } from "@/services/schedule";

const useGetSchedule = (params = {}) => {
    const userId = useGetUserId()
    params.teacher = userId;
    return useScrollPagination(
        ['schedule', userId, ...Object.values(removeEmptyKeys(params))],
        ({ pageParam = 1 }) => getSchedule({ ...params, page: pageParam, limit: 1000 }),
        { cacheTime: 5 * 60 * 1000, staleTime: 5 * 60 * 1000 }
    )
}

export default useGetSchedule;