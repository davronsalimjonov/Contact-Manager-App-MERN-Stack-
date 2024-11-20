import ConversationHeader from '@/components/UI/organisms/ConversationHeader';
import ConversationInput from '@/components/UI/organisms/ConversationInput';
import ChatDateLine from '@/components/UI/moleculs/ChatDateLine';
import cls from './ChatConversation.module.scss';

const ChatConversation = () => {
    return (
        <div className={cls.chat}>
            <ConversationHeader />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ChatDateLine />
                <ChatDateLine />
            </div>
            <ConversationInput />
        </div>
    );
}

export default ChatConversation;