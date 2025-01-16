import { getUserById, getUserCourseList } from "@/services/user";
import { useQuery } from "react-query";

const useGetUserById = (userId) => {
    const singleUser =  useQuery(['user', userId], () => getUserById(userId), { cacheTime: Infinity, staleTime: Infinity })
    const userCourseList = useQuery(['user-course-list', userId], () => getUserCourseList(userId), { cacheTime: Infinity, staleTime: Infinity })

    return {
        singleUser,
        userCourseList
    }
}

export default useGetUserById;
