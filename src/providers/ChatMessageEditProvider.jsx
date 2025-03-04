import { createContext, useState } from "react";
import { MessageTypes } from "@/constants/enum";

export const ChatMessageEditContext = createContext()

const ChatMessageEditProvider = ({ children }) => {
    const [editMessage, setEditMessage] = useState()

    const handleSetMessage = async (message) => {
        if (message?.type === MessageTypes.LESSON_TASK) {
            let file = null

            if (message?.homeTask?.file) {
                const fileName = message?.homeTask?.file?.fileName
                file = new File([new Blob()], fileName)
            }

            setTimeout(() => {
                setEditMessage({
                    type: MessageTypes.LESSON_TASK,
                    message: {
                        id: message?.id,
                        taskId: message?.homeTask?.id,
                        date: message?.homeTask?.date,
                        title: message?.homeTask?.title,
                        description: message?.homeTask?.description,
                        file,
                    }
                })
            }, 0)
        }
    }

    const onEditComplete = () => {
        setEditMessage(null)
    }

    return (
        <ChatMessageEditContext.Provider value={{ editMessage, handleSetMessage, onEditComplete }}>
            {children}
        </ChatMessageEditContext.Provider>
    );
}

export default ChatMessageEditProvider;
