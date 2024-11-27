import Input from '../../atoms/Form/Input';
import PhoneInput from '../../atoms/Form/PhoneInput';
import { EmailIcon, PlusIcon } from '../../atoms/icons';
import WhiteButton from '../../atoms/Buttons/WhiteButton';
import ChatSidebarAccordion from '../../moleculs/ChatSidebarAccordion';
import cls from './ChatPartnerContacts.module.scss';

const ChatPartnerContacts = () => {
    return (
        <ChatSidebarAccordion name='Kontaktlar'>
            <div className={cls.contacts}>
                <PhoneInput
                    placeholder='Telefon raqam'
                    className={cls.contacts__input}
                />
                <Input
                    placeholder='E-mail'
                    suffix={<EmailIcon />}
                    className={cls.contacts__input}
                />
                <WhiteButton>
                    <PlusIcon fill='var(--blue-color)' /> Yangi nomer qo’shish
                </WhiteButton>
            </div>
        </ChatSidebarAccordion>
    );
}

export default ChatPartnerContacts;