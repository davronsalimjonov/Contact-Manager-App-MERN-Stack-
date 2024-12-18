import TaskForm from '../TaskForm';
import { PlusIcon } from '../../atoms/icons';
import TaskItem from '../../moleculs/TaskItem';
import WhiteButton from '../../atoms/Buttons/WhiteButton';
import ChatSidebarAccordion from '../../moleculs/ChatSidebarAccordion';
import cls from './ChatTasksList.module.scss';

const ChatTasksList = ({
    chatId = ''
}) => {
    return (
        <ChatSidebarAccordion name='Tasklar'>
            <div className={cls.tasks}>
                <TaskItem />
                <TaskForm chatId={chatId} />
                <WhiteButton>
                    <PlusIcon fill='var(--blue-color)' /> Yangi task qo’shish
                </WhiteButton>
            </div>
        </ChatSidebarAccordion>
    );
}

export default ChatTasksList;