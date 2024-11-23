import ConversationInput from '@/components/UI/organisms/ConversationInput';
import ConversationHeader from '@/components/UI/organisms/ConversationHeader';
import ConversationMessages from '@/components/UI/organisms/ConversationMessages';
import cls from './ChatConversation.module.scss';

const ChatConversation = ({
    partnerFullName = '',
    partnerPhoneNumber = '',
    messages = []
}) => {
    return (
        <div className={cls.chat}>
            <ConversationHeader 
                fullName={partnerFullName}
                phoneNumber={partnerPhoneNumber}
            />
            <ConversationMessages />
            <ConversationInput />
        </div>
    );
}

export default ChatConversation;