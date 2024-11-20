import { BlockIcon, CallIcon, CloseIcon, VideoCamIcon } from '../../atoms/icons';
import cls from './ConversationHeader.module.scss';

const ConversationHeader = () => {
    return (
        <div className={cls.header}>
            <div className={cls.header__user}>
                <h4 className={cls.header__user__name}>Sardor Xudoyberdiyev</h4>
                <span className={cls.header__user__phone}>+998 94 252 66 55</span>
            </div>
            <div className={cls.header__actions}>
                <button>
                    <VideoCamIcon />
                </button>
                <button>
                    <CallIcon />
                </button>
                <button>
                    <BlockIcon />
                </button>
                <button>
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
}

export default ConversationHeader;