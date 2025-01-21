import { cn, formatFileSize } from '@/utils/lib';
import { AudioIcon, DocsIcon, PdfIcon, PictureIcon, VideoIcon } from '../../atoms/icons';
import cls from './FilePreviewItem.module.scss';

const FilePreviewItem = ({
    name = '',
    size = 0,
    className = '',
    type = ''
}) => {
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
        <div className={cn(cls.item, className)}>
            <div className={cls.item__icon}>{getFileIcon(type)}</div>
            <span className={cls.item__name} title={name}>{name}</span>
            <span className={cls.item__size}>{formatFileSize(size)}</span>
        </div>
    );
}

export default FilePreviewItem;