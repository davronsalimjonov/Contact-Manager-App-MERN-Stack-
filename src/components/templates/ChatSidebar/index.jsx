import ChatTasksList from '@/components/UI/organisms/ChatTasksList';
import ChatPartnerDetails from '@/components/UI/organisms/ChatPartnerDetails';
import ChatPartnerContacts from '@/components/UI/organisms/ChatPartnerContacts';
import cls from './ChatSidebar.module.scss';

const ChatSidebar = ({
    userCourseId = '',
    conversationId = '',
    firstPhoneNumber = '',
    secondPhoneNumber = '',
    thirdPhoneNumber = '',
    email = ''
}) => {
    const phoneNumbers = [firstPhoneNumber, secondPhoneNumber, thirdPhoneNumber].filter(Boolean)

    return (
        <div className={cls.sidebar}>
            <ChatPartnerDetails />
            <ChatTasksList userCourseId={userCourseId} conversationId={conversationId} />
            <ChatPartnerContacts 
                phoneNumbers={phoneNumbers}
                email={email}
            />
        </div>
    );
}

export default ChatSidebar;