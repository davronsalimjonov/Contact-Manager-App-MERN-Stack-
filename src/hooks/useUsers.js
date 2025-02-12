import { useQuery } from "react-query"
import { getAllUsers } from "@/services/user"
import { removeEmptyKeys } from "@/utils/lib"

export const useGetUsers = (params = {}) => {
    return useQuery(['users', ...Object.values(removeEmptyKeys(params))], () => getAllUsers(params))
}