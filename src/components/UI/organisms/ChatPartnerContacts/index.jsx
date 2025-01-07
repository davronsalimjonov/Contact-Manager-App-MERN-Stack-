import Input from '../../atoms/Form/Input';
import PhoneInput from '../../atoms/Form/PhoneInput';
import { EmailIcon, PlusIcon } from '../../atoms/icons';
import WhiteButton from '../../atoms/Buttons/WhiteButton';
import ChatSidebarAccordion from '../../moleculs/ChatSidebarAccordion';
import cls from './ChatPartnerContacts.module.scss';

const ChatPartnerContacts = ({
    phoneNumbers = [],
    email
}) => {
    return (
        <ChatSidebarAccordion name='Kontaktlar'>
            <div className={cls.contacts}>
                {phoneNumbers?.length > 0 && phoneNumbers.map((phone, index) => (
                    <PhoneInput
                        key={index}
                        placeholder='Telefon raqam'
                        value={phone}
                        readOnly
                        className={cls.contacts__input}
                    />
                ))}
                <Input
                    placeholder='E-mail'
                    value={email}
                    suffix={<EmailIcon />}
                    className={cls.contacts__input}
                    readOnly
                />
                <WhiteButton disabled>
                    <PlusIcon fill='var(--blue-color)' /> Yangi nomer qo’shish
                </WhiteButton>
            </div>
        </ChatSidebarAccordion>
    );
}

export default ChatPartnerContacts;