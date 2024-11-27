import WhiteButton from '../../atoms/Buttons/WhiteButton';
import { PlusIcon } from '../../atoms/icons';
import ChatSidebarAccordion from '../../moleculs/ChatSidebarAccordion';
import cls from './ChatTasksList.module.scss';

const ChatTasksList = () => {
    return (
        <ChatSidebarAccordion name='Tasklar'>
            <div className={cls.tasks}>
                
                <WhiteButton>
                    <PlusIcon fill='var(--blue-color)' /> Yangi task qo’shish
                </WhiteButton>
            </div>
        </ChatSidebarAccordion>
    );
}

export default ChatTasksList;