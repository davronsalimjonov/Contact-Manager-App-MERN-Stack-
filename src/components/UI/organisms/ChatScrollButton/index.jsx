import { cn } from '@/utils/lib';
import { ArrowDown } from '../../atoms/icons';
import cls from './ChatScrollButton.module.scss';

const ChatScrollButton = ({
    isOpened = false,
    count = 0,
    onClick
}) => {
    return (
        <button
            className={cn(cls.btn, isOpened ? cls.open : cls.close)}
            onClick={onClick}
        >
            <div>
                {count > 0 && <span className={cls.btn__badge}>{count}</span>}
                <ArrowDown />
            </div>
        </button>
    );
}

export default ChatScrollButton;