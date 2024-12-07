import toast from 'react-hot-toast';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isSameDay } from '@/utils/time';
import { createComment, createMessage, createSms } from '@/services/chat';
import useGetChat, { useMessage } from '@/hooks/useGetChat';
import { adjustHeight, cn, generateUUID } from '@/utils/lib';
import { SendIcon } from '../../atoms/icons';
import cls from './ConversationInput.module.scss';

const ConversationInput = ({ userCourseId }) => {
    const formRef = useRef()
    const { generateMessage } = useMessage()
    const { addNewMessage, updateMessage, info: { data: { id: chatId, user: { id: userId } } }, messages: { messages } } = useGetChat(userCourseId)
    const { register, handleSubmit, reset } = useForm()
    const [messageType, setMessageType] = useState('message')

    const handleSendMessage = (data) => {
        try {
            const id = generateUUID()
            const lastMessage = messages?.at(-1)
            const isNewMessageInPeriod = !isSameDay(lastMessage?.createdAt, new Date(Date.now()))
            const newMessage = generateMessage(data.message, messageType, { id, [isNewMessageInPeriod ? 'dateSeperator' : null]: new Date(Date.now()).toISOString() })
           
            addNewMessage(newMessage)
            reset()

            if (messageType === 'message') {
                createMessage({ chat: chatId, text: data.message }).then(res => updateMessage(id, res))
            } else if (messageType === 'comment') {
                createComment({ chat: chatId, text: data.message }).then(res => updateMessage(id, res))
            } else if (messageType === 'sms') {
                createSms(userId, { chat: chatId, text: data.message }).then(res => updateMessage(id, res))
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
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
                <button
                    type='button'
                    className={cn(messageType === 'message' && cls.input__tabs__active)}
                    onClick={() => setMessageType('message')}
                >
                    Chat
                </button>
                <button
                    type='button'
                    className={cn(messageType === 'task' && cls.input__tabs__active)}
                    onClick={() => setMessageType('task')}
                >
                    Vazifa
                </button>
                <button
                    type='button'
                    className={cn(messageType === 'sms' && cls.input__tabs__active)}
                    onClick={() => setMessageType('sms')}
                >
                    SMS
                </button>
                <button
                    type='button'
                    className={cn(messageType === 'comment' && cls.input__tabs__active)}
                    onClick={() => setMessageType('comment')}
                >
                    Comment
                </button>
            </div>
            <textarea
                placeholder='O’quvchi bilan muloqot'
                className={cls.input__textarea}
                onKeyDown={handleKeyDown}
                {...register('message', { onChange: adjustHeight })}
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