import { useState } from 'react';
import { CloudUploadIcon } from '@/components/UI/atoms/icons';
import FilePicker from '@/components/UI/atoms/Form/FilePicker';
import FilePreviewItem from '../../FilePreviewItem';
import FormElementWrapper from '../FormElementWrapper';
import cls from './FormMultipleFilePicker.module.scss';

const FormMultipleFilePicker = ({
    label = '',
    error = '',
    placeholder = '',
    limit = 10,
    accept,
    onChange,
    defaultFiles = []
}) => {
    const [files, setFiles] = useState(defaultFiles)

    const handlePickFile = (file) => {
        if (files.length < limit && file) {
            const newFiles = [...files, file]
            setFiles(newFiles)
            onChange?.(newFiles)
        }
    }

    const handleClear = (index) => {
        const newFiles = files?.filter((_, i) => i !== index)
        setFiles(newFiles)
        onChange?.(newFiles)
    }

    return (
        <FormElementWrapper label={label} error={error}>
            {files?.length > 0 ? (
                <div className={cls.wrapper}>
                    <div className={cls.wrapper__files}>
                        {files.map((file, index) => (
                            <FilePreviewItem
                                key={index}
                                name={file.name}
                                size={(file.size / 1024)}
                                isClearable
                                onClear={(e) => (e.stopPropagation(), e.preventDefault(), handleClear(index))}
                            />
                        ))}
                    </div>
                    <label className={cls.wrapper__btn} >
                        <CloudUploadIcon />
                        <input disabled={files.length >= limit} type="file" accept={accept} onChange={e => handlePickFile(e.target.files?.[0])} />
                    </label>
                </div>
            ) : (
                <FilePicker
                    error={error}
                    placeholder={placeholder}
                    accept={accept}
                    onChange={handlePickFile}
                />
            )}
        </FormElementWrapper>
    );
}

export default FormMultipleFilePicker;