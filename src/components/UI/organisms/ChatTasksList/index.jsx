import { useState } from 'react';
import { useGetUncompletedTasks, useTaskMutations } from '@/hooks/useTask';
import TaskForm from '../TaskForm';
import Loader from '../../atoms/Loader';
import { PlusIcon } from '../../atoms/icons';
import TaskItem from '../../moleculs/TaskItem';
import WhiteButton from '../../atoms/Buttons/WhiteButton';
import ChatSidebarAccordion from '../../moleculs/ChatSidebarAccordion';
import cls from './ChatTasksList.module.scss';

const ChatTasksList = ({
    chatId = ''
}) => {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const { updateTaskMutation } = useTaskMutations(chatId)
    const { data: tasks, isLoading } = useGetUncompletedTasks(chatId)

    return (
        <ChatSidebarAccordion name='Tasklar'>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={cls.tasks}>
                    {tasks?.length > 0 && tasks.map(task => (
                        <TaskItem
                            key={task?.id}
                            taskId={task?.id}
                            title={task?.title}
                            deadline={task?.date}
                            isCompleted={task?.isCompleted}
                            expired={!task?.isCompleted && (new Date(task?.date) < new Date())}
                            onUpdate={(data) => updateTaskMutation.mutate({ id: task?.id, ...data })}
                        />
                    ))}
                    {isOpenForm && <TaskForm chatId={chatId} />}
                    <WhiteButton onClick={() => setIsOpenForm(true)}>
                        <PlusIcon fill='var(--blue-color)' /> Yangi task qo’shish
                    </WhiteButton>
                </div>
            )}
        </ChatSidebarAccordion>
    );
}

export default ChatTasksList;