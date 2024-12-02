import { adjustHeight } from '@/utils/lib';
import { SendIcon } from '../../atoms/icons';
import cls from './ConversationInput.module.scss';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import useGetChat from '@/hooks/useGetChat';

const ConversationInput = ({ chatId }) => {
    const formRef = useRef()
    const { register, handleSubmit, reset } = useForm()
    const { addNextMessages } = useGetChat(chatId)

    const handleSendMessage = (data) => {
        const newMessage = {
            id: Date.now().toString(),
            createdAt: "2024-11-29T13:01:46.671Z",
            type: "message",
            isViewed: false,
            index: 160,
            call: null,
            comment: null,
            shouldScroll: true,
            message: {
                id: "3f618a18-5957-4ee0-9c7a-ac1d8b70afad",
                type: "text",
                text: data.message,
                caption: null,
                url: null,
                whoSended: "mentor",
                mentor: {
                    "id": "80def181-e54b-4b29-8dfe-bf99139844c8",
                    "firstName": "teacherbek",
                    "lastName": "teacherov",
                    "url": null
                },
                user: null
            },
            sms: null,
            task: null
        }
        addNextMessages([newMessage])
        reset()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (!e.shiftKey) {
                e.preventDefault()
                handleSubmit(handleSendMessage)()
            }
        };
    }

    return (
        <form className={cls.input} ref={formRef} onSubmit={handleSubmit(handleSendMessage)}>
            <div className={cls.input__tabs}>
                <button>Chat</button>
                <button>Vazifa</button>
                <button>SMS</button>
                <button>Comment</button>
            </div>
            <textarea
                placeholder='O’quvchi bilan muloqot'
                className={cls.input__textarea}
                onKeyDown={handleKeyDown}
                {...register('message', {
                    onChange: adjustHeight
                })}
            >
            </textarea>
            <div className={cls.input__controls}>
                <button className={cls.input__controls__send}>
                    <SendIcon />
                </button>
            </div>
        </form>
    );
}

export default ConversationInput;