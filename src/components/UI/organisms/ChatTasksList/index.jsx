import { useState } from 'react';
import { useGetUncompletedChatTasks, useTaskMutations } from '@/hooks/useTask';
import TaskForm from '../TaskForm';
import Loader from '../../atoms/Loader';
import { PlusIcon } from '../../atoms/icons';
import TaskItem from '../../moleculs/TaskItem';
import WhiteButton from '../../atoms/Buttons/WhiteButton';
import ChatSidebarAccordion from '../../moleculs/ChatSidebarAccordion';
import cls from './ChatTasksList.module.scss';

const ChatTasksList = ({
    disabled = false,
    conversationId = '',
    userCourseId = ''
}) => {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const { data: tasks, isLoading } = useGetUncompletedChatTasks(userCourseId)
    const { updateTaskMutation, statusChangeMutation, createTaskMutation } = useTaskMutations(userCourseId);

    const handleCreateTask = (data) => {
        createTaskMutation.mutate({ ...data, chat: conversationId, userCourse: userCourseId })
        setIsOpenForm(false)
    }

    return (
        <ChatSidebarAccordion name='Tasklar' count={tasks?.length}>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={cls.tasks}>
                    {tasks?.length > 0 && tasks.map(task => (
                        <TaskItem
                            key={task?.id}
                            title={task?.title}
                            deadline={task?.date}
                            isCompleted={task?.isCompleted}
                            expired={!task?.isCompleted && (new Date(task?.date) < new Date())}
                            onUpdate={(data) => updateTaskMutation.mutate({ id: task?.id, ...data })}
                            onStatusChange={() => statusChangeMutation.mutate(task?.id)}
                        />
                    ))}
                    {isOpenForm && <TaskForm onSubmit={handleCreateTask} />}
                    <WhiteButton disabled={disabled} onClick={() => setIsOpenForm(true)}>
                        <PlusIcon fill='var(--blue-color)' /> Yangi task qo’shish
                    </WhiteButton>
                </div>
            )}
        </ChatSidebarAccordion>
    );
}

export default ChatTasksList;