import ChatTasksList from '@/components/UI/organisms/ChatTasksList';
import ChatPartnerDetails from '@/components/UI/organisms/ChatPartnerDetails';
import ChatPartnerContacts from '@/components/UI/organisms/ChatPartnerContacts';
import cls from './ChatSidebar.module.scss';

const ChatSidebar = () => {
    return (
        <div className={cls.sidebar}>
            <ChatPartnerDetails />
            <ChatTasksList />
            <ChatPartnerContacts />
        </div>
    );
}

export default ChatSidebar;