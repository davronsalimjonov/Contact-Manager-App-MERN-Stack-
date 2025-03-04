import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { autoPlayAudio } from "@/utils/lib";
import useGetUser, { useGetUserId } from "@/hooks/useGetUser";
import { useSocket } from "./SocketProvider";
import { USER_ROLES } from "@/constants";

const SocketEventsProvider = ({ children }) => {
    const userId = useGetUserId()
    const { socket } = useSocket()
    const { data: user } = useGetUser()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (socket) {
            if (user?.role === USER_ROLES.CALL_MENTOR) {
                socket.on('new-adaptation', (newStudent) => {
                    const queryKey = ['adaptation-students', userId]
                    const queryState = queryClient.getQueryState(queryKey)
                    if (queryState) queryClient.setQueryData(queryKey, (students) => [...(students || []), newStudent])
                    autoPlayAudio('/audio/new-adaptation-sound.mp3')
                })
            }
        }
    }, [socket])

    return children
}

export default SocketEventsProvider;