import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { BlockIcon, CallIcon, CloseIcon, VideoCamIcon } from '../../atoms/icons';
import cls from './ConversationHeader.module.scss';

const ConversationHeader = ({
    fullName = '',
    phoneNumber = ''
}) => {
    return (
        <div className={cls.header}>
            <div className={cls.header__user}>
                <h4 className={cls.header__user__name}>{fullName}</h4>
                <span className={cls.header__user__phone}>{formatPhoneNumberIntl(phoneNumber)}</span>
            </div>
            <div className={cls.header__actions}>
                <button disabled>
                    <VideoCamIcon />
                </button>
                <button disabled>
                    <CallIcon />
                </button>
                <button disabled>
                    <BlockIcon />
                </button>
                <button disabled>
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
}

export default ConversationHeader;