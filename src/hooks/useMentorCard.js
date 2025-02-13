import { createMentorCard } from "@/services/mentor-card";
import { useMutation, useQueryClient } from "react-query"

export const useCreateMentorCardMutation = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: createMentorCard,
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(newCard, body) {        
        queryClient.setQueriesData(['all-mentors'], (oldData) => ({
            ...oldData,
            items: oldData?.items?.map(item => {
                if (item?.id === body?.mentor) {
                    item = { ...item, cards: [...(item?.cards || []), newCard] }
                }
                return item
            })
        }))
    }
    
    return createMutation
}