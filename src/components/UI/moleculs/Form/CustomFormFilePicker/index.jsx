import { useState } from 'react';
import { cn, getFileCategory } from '@/utils/lib';
import FilePreviewItem from '../../FilePreviewItem';
import FormElementWrapper from '../FormElementWrapper';
import cls from './CustomFormFilePicker.module.scss';

const CustomFormFilePicker = ({
    label = '',
    error = '',
    placeholder = '',
    accept = '',
    onChange,
    defaultFile = null,
    isMulti = false
}) => {
    const [files, setFiles] = useState(defaultFile ? [defaultFile] : []);

    const handleChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => {
            const newFiles = isMulti ? [...prevFiles, ...selectedFiles] : selectedFiles.slice(0, 1);
            onChange?.(isMulti ? newFiles : newFiles[0]);
            return newFiles;
        });
    };

    const chunkedFiles = [];
    for (let i = 0; i < files.length; i += 2) {
        chunkedFiles.push(files.slice(i, i + 2));
    }   
    

    return (
        <FormElementWrapper label={label} error={error}>
            <div className={cls.wrapper}>
                {files.length > 0 ? (
                    chunkedFiles.map((chunk, chunkIndex) => (
                        <div
                            key={chunkIndex}
                            className={chunk?.length === 1 ? cls.fileRow : cls.multiFiles}
                        >
                            {chunk.map((file, fileIndex) => (
                                <div key={fileIndex} className={cls.fileItem}>
                                    <FilePreviewItem
                                        name={file.name}
                                        size={(file.size || 0) / 1024}
                                        type={getFileCategory(file)}
                                        className={cls.previewer}
                                    />
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className={cn(cls.placeholder, error && cls.error)}>{placeholder}</div>
                )}
                <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleChange}
                    accept={accept}
                    multiple={isMulti} 
                />
                {files.length > 0 && (
                    <div className={cls.buttonsContainer}>
                        <img src='/images/Buttons.png' alt="action buttons" />
                    </div>
                )}
            </div>
        </FormElementWrapper>
    );
};

export default CustomFormFilePicker;
