import { adjustHeight } from '@/utils/lib';
import { SendIcon } from '../../atoms/icons';
import cls from './ConversationInput.module.scss';

const ConversationInput = () => {
    return (
        <div className={cls.input}>
            <div className={cls.input__tabs}>
                <button>Chat</button>
                <button>Vazifa</button>
                <button>SMS</button>
                <button>Comment</button>
            </div>
            <textarea
                placeholder='O’quvchi bilan muloqot'
                className={cls.input__textarea}
                onChange={adjustHeight}
            >
            </textarea>
            <div className={cls.input__controls}>
                <button className={cls.input__controls__send}>
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}

export default ConversationInput;