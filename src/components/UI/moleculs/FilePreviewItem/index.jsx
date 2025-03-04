import { cn, formatFileSize, getFileCategory } from '@/utils/lib';
import { AudioIcon, CloseIcon, DocsIcon, PdfIcon, PictureIcon, VideoIcon } from '../../atoms/icons';
import cls from './FilePreviewItem.module.scss';

const FilePreviewItem = ({
    className = '',
    name = '',
    size = 0,
    // type = '',
    isClearable = false,
    onClear,
    onClick
}) => {
    const type = getFileCategory(name)
    
    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf': return <PdfIcon />;
            case 'docs': return <DocsIcon />;
            case 'audio': return <AudioIcon />;
            case 'image': return <PictureIcon />;
            case 'video': return <VideoIcon />;
            default: return <DocsIcon />;
        }
    }

    return (
        <div className={cn(cls.item, className)} onClick={onClick}>
            <div className={cls.item__icon}>{getFileIcon(type)}</div>
            <span className={cls.item__name} title={name}>{name}</span>
            <span className={cls.item__size}>{formatFileSize(size)}</span>
            {isClearable && <button onClick={onClear} className={cls.item__clear}><CloseIcon /></button>}
        </div>
    );
}

export default FilePreviewItem;