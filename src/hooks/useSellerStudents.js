import { removeEmptyKeys } from "@/utils/lib"
import { getSellerStudents } from "@/services/seller"
import { useGetUserId } from "./useGetUser"
import { useQuery } from "react-query"

const useGetSellerStudents = (params) => {
    const userId = useGetUserId()
    return useQuery(
        ['seller-students', userId, ...Object.values(removeEmptyKeys(params))], 
        () => getSellerStudents(userId, params), 
        { cacheTime: Infinity, staleTime: Infinity }
    ) 
}

export default useGetSellerStudents