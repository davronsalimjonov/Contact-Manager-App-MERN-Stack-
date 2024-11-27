import { adjustHeight } from '@/utils/lib';
import { SendIcon } from '../../atoms/icons';
import cls from './ConversationInput.module.scss';
import { useRef } from 'react';

const ConversationInput = () => {
    const ref = useRef()

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                e.preventDefault();
                const textarea = e.target;
                const { selectionStart, selectionEnd, value } = textarea;

                const updatedValue = value.substring(0, selectionStart) + '\n' + value.substring(selectionEnd);
                textarea.value = updatedValue;

                textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);
            } else {
                e.preventDefault();
                ref.current.submit()
            }
        }
    };

    return (
        <form className={cls.input} ref={ref}>
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
                onKeyDown={handleKeyDown}
            >
            </textarea>
            <div className={cls.input__controls}>
                <button className={cls.input__controls__send}>
                    <SendIcon />
                </button>
            </div>
        </form>
    );
}

export default ConversationInput;