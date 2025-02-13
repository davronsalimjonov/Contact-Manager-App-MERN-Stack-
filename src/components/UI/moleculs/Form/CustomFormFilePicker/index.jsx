import { useState, useRef } from 'react';
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
    defaultFile = [],
    isMulti = false
}) => {
    const initialFiles = Array.isArray(defaultFile) 
  ? defaultFile.map((file) => ({
      name: file.fileName || file.name,
      url: file.url,
      size: file.size || 0,
      isBackendFile: Boolean(file.url) 
    }))
  : [];

    const [files, setFiles] = useState(initialFiles);
    const inputRef = useRef(null);

    const handleChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => {
            const newFiles = isMulti 
                ? [...prevFiles, ...selectedFiles] 
                : selectedFiles.slice(0, 1);
            onChange?.(newFiles);
            return newFiles;
        });
        e.target.value = null;
    };

    const triggerFileInput = () => {
        inputRef.current && inputRef.current.click();
    };

    const chunkedFiles = [];
    for (let i = 0; i < files.length; i += 2) {
        chunkedFiles.push(files.slice(i, i + 2));
    }

    return (
        <FormElementWrapper label={label} error={error}>
            <div className={cls.wrapper}>
                {files.length > 0 ? (
                    <>
                        {chunkedFiles.map((chunk, chunkIndex) => (
                            <div
                                key={chunkIndex}
                                className={chunk.length === 1 ? cls.fileRow : cls.multiFiles}
                            >
                                {chunk.map((file, fileIndex) => (
                                    <div key={fileIndex} className={cls.fileItem}>
                                        <FilePreviewItem
                                           name={file.name}
                                           size={(file.size || 0) / 1024}
                                           type={getFileCategory(file?.url) || getFileCategory(file)} 
                                           className={cls.previewer}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                        {files.length > 0 && (
                            <div className={cls.buttonsContainer}>
                                <img src='/images/Buttons.png' alt="action buttons" />
                            </div>
                        )}
                    </>
                ) : (
                    <div
                        className={cn(cls.placeholder, error && cls.error)}
                        onClick={triggerFileInput}
                        role="button"
                        tabIndex={0}
                    >
                        {placeholder}
                    </div>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleChange}
                    accept={accept}
                    multiple={isMulti}
                />
            </div>
        </FormElementWrapper>
    );
};

export default CustomFormFilePicker;
