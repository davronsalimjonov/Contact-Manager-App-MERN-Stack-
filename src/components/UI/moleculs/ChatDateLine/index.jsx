import cls from './ChatDateLine.module.scss';

const ChatDateLine = () => {
    return (
        <div className={cls.date}>
            <span className={cls.date__line}></span>
            <span>17 oktabr, 2024</span>
            <span className={cls.date__line}></span>
        </div>
    );
}

export default ChatDateLine;