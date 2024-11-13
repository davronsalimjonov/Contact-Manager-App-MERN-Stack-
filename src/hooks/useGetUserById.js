import { getUserById } from "@/services/user";
import { useQuery } from "react-query";

const useGetUserById = (userId) => {
    return useQuery(['user', userId], () => getUserById(userId), { cacheTime: Infinity, staleTime: Infinity })
}

export default useGetUserById;
