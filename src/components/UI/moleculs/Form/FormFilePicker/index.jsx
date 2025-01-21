import { useState } from 'react';
import { cn, getFileCategory } from '@/utils/lib';
import FilePreviewItem from '../../FilePreviewItem';
import FormElementWrapper from '../FormElementWrapper';
import cls from './FormFilePicker.module.scss';

const FormFilePicker = ({
    label = '',
    error = '',
    placeholder = '',
    accept = '',
    onChange = '',
    defaultFile = null
}) => {
    const [file, setFile] = useState(defaultFile)

    const handleChange = (e) => {
        const file = e.target.files?.[0]
        setFile(file)
        onChange?.(file)
    }

    return (
        <FormElementWrapper label={label} error={error}>
            <div className={cls.wrapper}>
                {file ? (
                    <FilePreviewItem
                        name={file.name}
                        size={(file.size || 0) / 1024}
                        type={getFileCategory(file)}
                    />
                ) : (
                    <div className={cn(cls.placeholder, error && cls.error)}>{placeholder}</div>
                )}
                <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleChange}
                    accept={accept}
                />
            </div>
        </FormElementWrapper>
    );
}

export default FormFilePicker;