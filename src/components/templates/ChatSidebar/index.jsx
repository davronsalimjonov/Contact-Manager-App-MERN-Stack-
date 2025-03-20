import ChatTasksList from '@/components/UI/organisms/ChatTasksList';
import ChatPartnerDetails from '@/components/UI/organisms/ChatPartnerDetails';
import ChatPartnerContacts from '@/components/UI/organisms/ChatPartnerContacts';
import cls from './ChatSidebar.module.scss';

const ChatSidebar = ({
    disableTaskAttachment = false,
    userCourseId = '',
    conversationId = '',
    userAvatar = '',
    userFullName = '',
    firstPhoneNumber = '',
    secondPhoneNumber = '',
    thirdPhoneNumber = '',
    email = '',
    status = '',
    comment = ''
}) => {
    const phoneNumbers = [firstPhoneNumber, secondPhoneNumber, thirdPhoneNumber].filter(Boolean)

    return (
        <div className={cls.sidebar}>
            <ChatPartnerDetails 
                userCourseId={userCourseId}
                status={status}
                comment={comment}
                userFullName={userFullName}
                userAvatar={userAvatar} 
            />
            <ChatTasksList 
                userCourseId={userCourseId} 
                conversationId={conversationId} 
                disabled={disableTaskAttachment}
            />
            <ChatPartnerContacts 
                phoneNumbers={phoneNumbers}
                email={email}
            />
        </div>
    );
}

export default ChatSidebar;