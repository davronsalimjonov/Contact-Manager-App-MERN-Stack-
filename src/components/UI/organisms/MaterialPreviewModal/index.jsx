import { getFileCategory } from '@/utils/lib';
import Dialog from '../../moleculs/Dialog';
import cls from './MaterialPreviewModal.module.scss';

const fileUrl = 'https://api.myteacher.uz/file/material/Практическая работа 1,21737526545884.pdf'
const wordUrl = 'https://api.myteacher.uz/file/material/Самостоятельная работа1737526857263.docx'
const audioUrl = 'https://api.myteacher.uz/file/material/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-17309735691401737527156869.mp3'
const imageUrl = 'https://images.unsplash.com/photo-1566761284295-af58908238bb?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const MaterialPreviewModal = ({
    isOpen, 
    onClose,
    title = '',
    description = '',
    fileUrl = '',
}) => {
    const fileType = getFileCategory(fileUrl)
    
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.modal}>
                <h2 className={cls.modal__title}>{title}</h2>
                {description && <p className={cls.modal__description}>{description}</p>}
                <div>
                    {fileType === 'image' && <img className={cls.modal__image} src={fileUrl} alt="" />}
                    {fileType === 'video' && <video className={cls.modal__video} src={fileUrl} controls />}
                    {/* <object 
                        data={audioUrl} 
                        frameborder="0"
                        style={{ width: '100%', height: '500px', objectFit: 'contain' }}
                    ></object> */}
                </div>
            </div>
        </Dialog>
    );
}

export default MaterialPreviewModal;