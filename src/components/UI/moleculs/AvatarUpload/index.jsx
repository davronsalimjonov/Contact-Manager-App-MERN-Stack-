import { useState } from 'react';
import { PlusIcon, TrashIcon, UserIcon } from '../../atoms/icons';
import cls from './AvatarUpload.module.scss';
import { cn } from '@/utils/lib';

const AvatarUpload = () => {
    const [selectedFile, setSelectedFile] = useState()

    return (
        <div className={cls.wrapper}>
            {selectedFile ? (
                <div className={cls.avatar}>
                    <img src={URL.createObjectURL(selectedFile)} alt="avatar" />
                    <button 
                        className={cn(cls.badge, cls.badge__delete)}
                        onClick={() => setSelectedFile(null)}
                    >
                        <TrashIcon />
                    </button>
                </div>
            ) : (
                <label className={cls.upload}>
                    <UserIcon />
                    <input
                        type="file"
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={(e) => setSelectedFile(e.target.files?.[0])}
                    />
                    <div className={cn(cls.badge, cls.badge__add)}>
                        <PlusIcon />
                    </div>
                </label>
            )}
        </div>
    )
}

export default AvatarUpload;