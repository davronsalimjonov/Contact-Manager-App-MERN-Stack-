import cls from './ChatDateSeparator.module.scss';

const ChatDateSeparator = ({
    date = ''
}) => {
    return (
        <div className={cls.date}>
            <span className={cls.date__line}></span>
            <span>{date}</span>
            <span className={cls.date__line}></span>
        </div>
    );
}

export default ChatDateSeparator;