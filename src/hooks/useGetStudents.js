import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { socket } from "@/services/socket";
import { removeEmptyKeys } from "@/utils/lib";
import { getCallMentorStudents } from "@/services/course";
import { useGetUserId } from "./useGetUser";

const useGetStudents = (params = {}) => {
    const userId = useGetUserId()
    const queryClient = useQueryClient()

    const addNewMessage = (userCourseId) => {
        queryClient.setQueriesData(['students', userId], (students) => {
            const studentIndex = students?.findIndex(student => student.id === userCourseId);

            if (studentIndex === -1) {
                return students;
            }

            const updatedStudents = [...students];
            const [student] = updatedStudents.splice(studentIndex, 1);

            student.messageCount = (student.messageCount || 0) + 1;
            updatedStudents.unshift(student);

            return updatedStudents;
        })
    }

    useEffect(() => {
        if (socket && !socket.hasListeners('new-message')) {            
            socket.on('new-message', userCourseId => {
                addNewMessage(userCourseId)
            })
        }
    }, [socket])

    return useQuery(
        ['students', userId, ...Object.values(removeEmptyKeys(params))],
        () => getCallMentorStudents(userId, params),
        { cacheTime: 5 * 60 * 1000, staleTime: 5 * 60 * 1000 }
    )
}

export default useGetStudents;
