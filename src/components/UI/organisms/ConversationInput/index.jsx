import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';
import { useContext, useEffect, useRef, useState } from 'react';
import { isSameDay } from '@/utils/time';
import { useGetUserId } from '@/hooks/useGetUser';
import useClickOutside from '@/hooks/useClickOutside';
import useGetChat, { useMessage } from '@/hooks/useGetChat';
import { ChatMessageEditContext } from '@/providers/ChatMessageEditProvider';
import { adjustHeight, cn, generateUUID, objectToFormData } from '@/utils/lib';
import { createComment, createLessonTask, createMessage, createSms, updateHomeTask } from '@/services/chat';
import { SendIcon } from '../../atoms/icons';
import ChatLessonTaskForm from '../ChatLessonTaskForm';
import LessonTaskDatepicker from '../LessonTaskDatepicker';
import cls from './ConversationInput.module.scss';
import { MessageTypes } from '@/constants/enum';

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
    const methods = useForm()
    const userId = useGetUserId()
    const { generateMessage } = useMessage()
    const { editMessage, onEditComplete } = useContext(ChatMessageEditContext)
    const { addNewMessage, updateMessage, info: { data: { id: chatId, user: { id: studentId } } }, messages: { messages } } = useGetChat(userCourseId)
    const { register, handleSubmit, reset, getValues, watch, formState: { isDirty, isValid } } = methods
    const [messageType, setMessageType] = useState(MessageTypes.TEXT)
    const [isOpenDatepicker, setIsOpenDatepicker] = useState(false)
    const taskDatepickerRef = useClickOutside({ onClickOutside: () => setIsOpenDatepicker(false) })

    useEffect(() => {
        if (editMessage) {
            setMessageType(editMessage.type)
            reset(editMessage.message)
        }
    }, [editMessage])

    const handleSendMessage = (data) => {
        try {
            if (messageType !== MessageTypes.LESSON_TASK) {
                const id = generateUUID()
                const lastMessage = messages?.at(-1)
                const isNewMessageInPeriod = !isSameDay(lastMessage?.createdAt, new Date(Date.now()))
                const newMessage = generateMessage(data.message, messageType, { id, [isNewMessageInPeriod ? 'dateSeperator' : null]: new Date(Date.now()).toISOString() })

                addNewMessage(newMessage)
                reset()

                if (messageType === MessageTypes.TEXT) {
                    createMessage({ chat: chatId, text: data.message }).then(res => updateMessage(id, res))
                } else if (messageType === MessageTypes.COMMENT) {
                    createComment({ chat: chatId, text: data.message }).then(res => updateMessage(id, res))
                } else if (messageType === MessageTypes.SMS) {
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

            if (!editMessage) {
                const id = generateUUID()
                const lastMessage = messages?.at(-1)
                const isNewMessageInPeriod = !isSameDay(lastMessage?.createdAt, new Date(Date.now()))
                const newMessage = generateMessage(data, messageType, { id, [isNewMessageInPeriod ? 'dateSeperator' : null]: new Date(Date.now()).toISOString() })

                addNewMessage(newMessage)
                reset()

                const fd = objectToFormData({ chat: chatId, student: studentId, mentor: userId, ...data })
                createLessonTask(fd).then(res => updateMessage(id, res))

                setIsOpenDatepicker(false)
            } else {
                const id = data?.id
                const taskId = data?.taskId
                delete data.id
                delete data.taskId

                if (data?.file?.name == editMessage?.message?.file?.name) delete data.file

                updateMessage(id, (oldData) => ({
                    ...oldData,
                    homeTask: {
                        ...oldData.homeTask,
                        [data?.file ? 'url' : '']: data?.file ? URL.createObjectURL(data?.file) : '',
                        ...data,
                    }
                }))
                updateHomeTask(taskId, objectToFormData(data))
                onEditComplete()
                reset({ date: null, title: null, description: null, file: null })
                setIsOpenDatepicker(false)
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
                    className={cn(messageType === MessageTypes.TEXT && cls.input__tabs__active)}
                    onClick={() => setMessageType(MessageTypes.TEXT)}
                >
                    Chat
                </button>
                <button
                    type='button'
                    className={cn(messageType === MessageTypes.LESSON_TASK && cls.input__tabs__active)}
                    onClick={() => setMessageType(MessageTypes.LESSON_TASK)}
                >
                    Vazifa
                </button>
                <button
                    type='button'
                    className={cn(messageType === MessageTypes.SMS && cls.input__tabs__active)}
                    onClick={() => setMessageType(MessageTypes.SMS)}
                >
                    SMS
                </button>
                <button
                    type='button'
                    className={cn(messageType === MessageTypes.COMMENT && cls.input__tabs__active)}
                    onClick={() => setMessageType(MessageTypes.COMMENT)}
                >
                    Comment
                </button>
            </div>
            {messageType === MessageTypes.LESSON_TASK ? (
                <FormProvider {...methods}>
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
                        <LessonTaskDatepicker
                            defaultValue={getValues('date')}
                            onSave={handleCreateTask}
                        />
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