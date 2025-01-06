import { useQuery } from "react-query"
import { useGetUserId } from "./useGetUser"
import { getAllUsers } from "@/services/user"
import { removeEmptyKeys } from "@/utils/lib"

export const useGetUsers = (params = {}) => {
    const userId = useGetUserId()

    return useQuery(
        ['all-students', userId,...Object.values(removeEmptyKeys(params))],
        () => getAllUsers(userId, params) 
    )
}