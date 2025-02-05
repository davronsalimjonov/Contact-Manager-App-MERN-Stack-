import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSocket } from "@/providers/SocketProvider";
import { getCallMentorStudents, getMainMentorStudents, getStudentIds } from "@/services/course";
import { autoPlayAudio, removeEmptyKeys } from "@/utils/lib";
import { getStudentsForAdaptation } from "@/services/students";
import { useGetUserId } from "./useGetUser";

let soundTimer = null;

export const useGetCallMentorStudents = (params = {}) => {
    const userId = useGetUserId()
    const { socket } = useSocket()
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
                    autoPlayAudio('/audio/new-message-came.mp3')
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

    return { ...data, updateStudentAdaptation }
}

export const useGetMainMentorStudents = (params = {}) => {
    const mentorId = useGetUserId()
    return useQuery(
        ['students', mentorId, ...Object.values(removeEmptyKeys(params))],
        () => getMainMentorStudents(mentorId, params),
        { cacheTime: 5 * 60 * 1000, staleTime: 5 * 60 * 1000 }
    )
}

export const useGetMainMentorStudentsIds = (params = {}, options = {}) => {
    return useQuery(['student-ids', ...Object.values(params)], () => getStudentIds(params), { cacheTime: 0, staleTime: 0, ...options })
}