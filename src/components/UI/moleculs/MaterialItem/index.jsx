import { getFileCategory } from '@/utils/lib';
import FilePreviewItem from '../FilePreviewItem';
import TableActionButton from '../TableActionButton';
import cls from './MaterialItem.module.scss';

const MaterialItem = ({
    title = '',
    description = '',
    fileName = '',
    fileSize = 0,
    fileUrl = '',
    onClickEdit,
    onClickDelete,
    onClickFile
}) => {
    const fileType = getFileCategory(fileUrl)

    const dropdownMenuItems = [
        { label: 'Tahrirlash', onClick: onClickEdit },
        { label: "O'chirish", onClick: onClickDelete },
    ]

    return (
        <div className={cls.item}>
            <span className={cls.item__title}>{title}</span>
            <TableActionButton menuItems={dropdownMenuItems} />
            <FilePreviewItem
                className={cls.item__file}
                name={fileName}
                size={fileSize}
                type={fileType}
                onClick={onClickFile}
            />
            {description && <span className={cls.item__description} title={description}>{description}</span>}
        </div>
    );
}

export default MaterialItem;