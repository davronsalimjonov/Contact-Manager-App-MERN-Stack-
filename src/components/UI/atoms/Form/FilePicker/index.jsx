import { useState } from 'react';
import { cn } from '@/utils/lib';
import FilePreviewItem from '@/components/UI/moleculs/FilePreviewItem';
import cls from './FilePicker.module.scss';
import { CloudUploadIcon } from '../../icons';

const FilePicker = ({
    accept,
    onChange,
    placeholder = '',
    defaultFile = null,
    error,
}) => {
    const [file, setFile] = useState(defaultFile)

    const handleChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setFile(file)
        onChange?.(file)
    }

    return (
        <div className={cls.wrapper}>
            {file ? (
                <FilePreviewItem
                    name={file.name}
                    size={(file.size || 0) / 1024}
                />
            ) : (
                <div className={cn(cls.placeholder, error && cls.error)}>
                    {placeholder}
                    <CloudUploadIcon />
                </div>
            )}
            <input
                type="file"
                style={{ display: 'none' }}
                onChange={handleChange}
                accept={accept}
            />
        </div>
    );
}

export default FilePicker;