import { getFileCategory } from '@/utils/lib';
import Dialog from '../../moleculs/Dialog';
import { CloseIcon } from '../../atoms/icons';
import AudioPlayer from '../../moleculs/AudioPlayer';
import cls from './MaterialPreviewModal.module.scss';

const MaterialPreviewModal = ({
    isOpen, 
    onClose,
    title = '',
    description = '',
    fileUrl = '',
    fileName = ''
}) => {
    const fileType = getFileCategory(fileUrl)
    
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.modal}>
                <div className={cls.modal__header}>
                    <h2 className={cls.modal__title}>{title}</h2>
                    <button className={cls.modal__close} onClick={onClose}><CloseIcon /></button>
                </div>
                {description && <p className={cls.modal__description}>{description}</p>}
                <div>
                    {fileType === 'image' && <img className={cls.modal__image} src={fileUrl} alt="" />}
                    {fileType === 'video' && <video className={cls.modal__video} src={fileUrl} controls />}
                    {fileType === 'docs' && <iframe className={cls.modal__iframe} src={'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(fileUrl)} frameBorder="0" />}
                    {fileType === 'pdf' && <iframe className={cls.modal__iframe} src={'https://docs.google.com/gview?&embedded=true&url=' + encodeURIComponent(fileUrl)} frameBorder="0" />}
                    {fileType === 'audio' && <AudioPlayer title={fileName} url={fileUrl} />}
                </div>
            </div>
        </Dialog>
    );
}

export default MaterialPreviewModal;
