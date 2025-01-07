import { CloseIcon } from '../../atoms/icons';
import cls from './FileAttachment.module.scss';

const FileAttachment = ({
    name = '',
    onRemove
}) => {
    return (
        <div className={cls.file}>
            <span>{name}</span>
            <button onClick={onRemove}>
                <CloseIcon />
            </button>
        </div>
    );
}

export default FileAttachment;