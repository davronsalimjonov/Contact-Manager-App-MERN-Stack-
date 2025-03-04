import { createMentorCard, viewMentorCard } from "@/services/mentor-card";
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

export const useViewedMentorCardMutation = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: viewMentorCard,
        onSuccess: onViewedSuccess
    })

    function onViewedSuccess(res, cardId) {
        queryClient.setQueryData(['user-info'], (oldData) => {
            oldData.cards.forEach(card => {
                if (card?.id === cardId) {
                    card.isViewed = true
                }
                return card
            })

            return oldData
        })
    }

    return createMutation
}