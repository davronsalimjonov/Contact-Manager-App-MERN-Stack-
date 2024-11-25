import ConversationInput from '@/components/UI/organisms/ConversationInput';
import ConversationHeader from '@/components/UI/organisms/ConversationHeader';
import ConversationMessages from '@/components/UI/organisms/ConversationMessages';
import cls from './ChatConversation.module.scss';
import Loader from '@/components/UI/atoms/Loader';

const ChatConversation = ({
    partnerFullName = '',
    partnerPhoneNumber = '',
    messages = [],
    isLoadingMessages = false
}) => {
    return (
        <div className={cls.chat}>
            <ConversationHeader
                fullName={partnerFullName}
                phoneNumber={partnerPhoneNumber}
            />
            {isLoadingMessages ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <ConversationMessages messages={messages} />
            )}
            <ConversationInput />
        </div>
    );
}

export default ChatConversation;