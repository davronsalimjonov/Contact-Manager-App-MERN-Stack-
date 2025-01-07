import { formatFileSize } from '@/utils/lib';
import { FileIcon } from '../../atoms/icons';
import cls from './ChatFileItem.module.scss';

const ChatFileItem = ({
    fileName = 'File name is not defined',
    fileSize = 0,
    onClick
}) => {
    return (
        <div className={cls.file} onClick={onClick}>
            <div className={cls.file__icon}>
                <FileIcon />
            </div>
            <h4 className={cls.file__name}>{fileName}</h4>
            <span className={cls.file__size}>{formatFileSize(fileSize || 0)}</span>
        </div>
    );
}

export default ChatFileItem;