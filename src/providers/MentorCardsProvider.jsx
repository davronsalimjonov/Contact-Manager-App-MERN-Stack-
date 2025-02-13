import { useEffect, useState } from "react";
import useGetUser from "@/hooks/useGetUser";
import { useQueryClient } from "react-query";
import MentorCardModal from "@/components/UI/organisms/MentorCardModal";
import { useViewedMentorCardMutation } from "@/hooks/useMentorCard";
import { useSocket } from "./SocketProvider";

const MentorCardsProvider = ({ children }) => {
    const {socket} = useSocket()
    const queryClient = useQueryClient()
    const { data: user } = useGetUser()
    const [cards, setCards] = useState([])
    const [cardModal, setCardModal] = useState({ isOpen: false, card: null })
    const viewedCardMutation = useViewedMentorCardMutation()

    useEffect(() => {
        if (user?.cards?.length > 0) {
            console.log('new cards');
            
            setCards(user?.cards?.filter(card => !card.isViewed))
        }
    }, [user?.cards])

    useEffect(() => {
        if (cards?.length > 0 && !cardModal.isOpen) {
            viewedCardMutation.mutate(cards[0]?.id)
            setCardModal({ isOpen: true, card: cards[0] })
        } else if (cards?.length === 0) {
            setCardModal(state => ({ ...state, isOpen: false }))
        }
    }, [cards])

    useEffect(() => {
        if(socket) {
            socket.on('new-card', newCard => {
                queryClient.setQueryData(['user-info'], oldData => {
                    oldData.cards = [...(oldData?.cards || []), newCard]
                    return oldData
                })
            })

            return () => socket.off('new-card')
        }
    }, [socket])

    const handleCloseCardModal = () => {
        setCardModal(state => ({ ...state, isOpen: false }))
        setTimeout(() => setCards(cards.filter(card => card?.id !== cardModal.card?.id)), 300)
    }

    return (
        <div>
            <MentorCardModal
                isOpen={cardModal.isOpen}
                onClose={handleCloseCardModal}
                type={cardModal.card?.type}
                amount={cardModal.card?.amount}
                description={cardModal.card?.description}
            />
            {children}
        </div>
    )
};

export default MentorCardsProvider;