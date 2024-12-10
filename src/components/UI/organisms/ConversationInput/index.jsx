import toast from 'react-hot-toast';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { isSameDay } from '@/utils/time';
import { useGetUserId } from '@/hooks/useGetUser';
import useClickOutside from '@/hooks/useClickOutside';
import useGetChat, { useMessage } from '@/hooks/useGetChat';
import { adjustHeight, cn, generateUUID, objectToFormData } from '@/utils/lib';
import { createComment, createLessonTask, createMessage, createSms } from '@/services/chat';
import { SendIcon } from '../../atoms/icons';
import ChatLessonTaskForm from '../ChatLessonTaskForm';
import LessonTaskDatepicker from '../LessonTaskDatepicker';
import cls from './ConversationInput.module.scss';

const getTextAreaPlaceholder = (messageType) => {
    switch (messageType) {
        case 'message':
            return 'O’quvchi bilan muloqot'
        case 'task':
            return 'Vazifa yuborish'
        case 'sms':
            return 'SMS yuborish'
        case 'comment':
            return 'Comment yuborish'
        default:
            return 'O’quvchi bilan muloqot'
    }
}

const ConversationInput = ({ userCourseId }) => {
    const formRef = useRef()
    const userId = useGetUserId()
    const { generateMessage } = useMessage()
    const { addNewMessage, updateMessage, info: { data: { id: chatId, user: { id: studentId } } }, messages: { messages } } = useGetChat(userCourseId)
    const { register, handleSubmit, reset, watch, formState: { isDirty, isValid }, ...methods } = useForm()
    const [messageType, setMessageType] = useState('message')
    const [isOpenDatepicker, setIsOpenDatepicker] = useState(false)
    const taskDatepickerRef = useClickOutside({ onClickOutside: () => setIsOpenDatepicker(false) })

    const handleSendMessage = (data) => {
        try {
            if (messageType !== 'task') {
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
                    createSms(studentId, { chat: chatId, text: data.message }).then(res => updateMessage(id, res))
                }
            } else {
                setIsOpenDatepicker(true)
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    const handleCreateTask = (date) => {
        try {
            const data = watch()
            data.date = date
            delete data.message

            const id = generateUUID()
            const lastMessage = messages?.at(-1)
            const isNewMessageInPeriod = !isSameDay(lastMessage?.createdAt, new Date(Date.now()))
            const newMessage = generateMessage(data, messageType, { id, [isNewMessageInPeriod ? 'dateSeperator' : null]: new Date(Date.now()).toISOString() })

            addNewMessage(newMessage)
            reset()

            const fd = objectToFormData({ chat: chatId, student: studentId, mentor: userId, ...data })
            createLessonTask(fd).then(res => updateMessage(id, res))

            setIsOpenDatepicker(false)
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
            {messageType === 'task' ? (
                <FormProvider {...methods} register={register} handleSubmit={handleSubmit} reset={reset} watch={watch}>
                    <ChatLessonTaskForm />
                </FormProvider>
            ) : (
                <textarea
                    onKeyDown={handleKeyDown}
                    className={cls.input__textarea}
                    placeholder={getTextAreaPlaceholder(messageType)}
                    {...register('message', {
                        required: true,
                        validate: (message) => message?.trim()?.length > 0,
                        onChange: adjustHeight
                    })}
                ></textarea>
            )}
            <div className={cls.input__controls}>
                {isOpenDatepicker && (
                    <div
                        className={cls.input__controls__task__datepicker}
                        ref={taskDatepickerRef}
                    >
                        <LessonTaskDatepicker onSave={handleCreateTask} />
                    </div>
                )}
                <button
                    className={cls.input__controls__send}
                    disabled={!isDirty || !isValid}
                >
                    <SendIcon />
                </button>
            </div>
        </form>
    );
}

export default ConversationInput;