import { formatMessageDate } from '@/utils/time';
import cls from './ChatDateSeparator.module.scss';

const ChatDateSeparator = ({
    date = ''
}) => {
    return (
        <div className={cls.date}>
            <span className={cls.date__line}></span>
            <span>{formatMessageDate(date)}</span>
            <span className={cls.date__line}></span>
        </div>
    );
}

export default ChatDateSeparator;