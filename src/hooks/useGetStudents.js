import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { socket } from "@/services/socket";
import { removeEmptyKeys } from "@/utils/lib";
import { getCallMentorStudents } from "@/services/course";
import { useGetUserId } from "./useGetUser";
import { getStudentsForAdaptation } from "@/services/students";

let soundTimer = null;

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
                if (!soundTimer) {
                    const audio = new Audio('/audio/new-message-came.mp3')
                    audio.play()

                    soundTimer = setTimeout(() => {
                        soundTimer = null;
                    }, 300);
                }
            })
        }
    }, [socket])

    return useQuery(
        ['students', userId, ...Object.values(removeEmptyKeys(params))],
        () => getCallMentorStudents(userId, params),
        { cacheTime: 5 * 60 * 1000, staleTime: 5 * 60 * 1000 }
    )
}

export const useGetStudentsForAdaptation = () => {
    const mentorId = useGetUserId()
    const queryClient = useQueryClient()
    const data = useQuery(['adaptation-students', mentorId], () => getStudentsForAdaptation(mentorId), { cacheTime: 5 * 60 * 1000, staleTime: 5 * 60 * 1000 })

    const updateStudentAdaptation = async (adaptationId, data) => {
        queryClient.setQueryData(['adaptation-students', mentorId], (students) => {
            return students?.map(adaptation => adaptation.id === adaptationId ? { ...adaptation, ...data } : adaptation)
        })
    }

    useEffect(() => {
        if (socket && !socket.hasListeners('new-adaptation')) {
            socket.on('new-adaptation', student => {
                const audio = new Audio('/audio/new-adaptation-sound.mp3')
                audio.play()
                queryClient.setQueryData(['adaptation-students', mentorId], (students) => [...(students || []), student])
            })
        }
    }, [socket])

    return { ...data, updateStudentAdaptation }
}

export default useGetStudents;