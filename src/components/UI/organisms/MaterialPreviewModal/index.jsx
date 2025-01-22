import Dialog from '../../moleculs/Dialog';
import cls from './MaterialPreviewModal.module.scss';

const fileUrl = 'https://api.myteacher.uz/file/material/Практическая работа 1,21737526545884.pdf'
const wordUrl = 'https://api.myteacher.uz/file/material/Самостоятельная работа1737526857263.docx'
const audioUrl = 'https://api.myteacher.uz/file/material/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-17309735691401737527156869.mp3'

const MaterialPreviewModal = ({ 
    isOpen, 
    onClose,
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.modal}>
                <h2 className={cls.modal__title}>Perfectly Spoken</h2>
                <p className={cls.modal__description}>Lorem ipsum dolor sit amet consectetur. Odio morbi commodo porttitor potenti nisl lobortis.Lorem ipsum dolor sit amet consectetur. Odio morbi commodo porttitor potenti nisl lobortis.Lorem ipsum dolor sit amet consectetur. Odio morbi commodo porttitor potenti nisl lobortis.Lorem ipsum dolor sit amet consectetur. Odio morbi commodo porttitor potenti nisl lobortis.Lorem ipsum dolor sit amet consectetur. Odio morbi commodo porttitor potenti nisl lobortis.Lorem ipsum dolor sit amet consectetur. Odio morbi commodo porttitor potenti nisl lobortis.Lorem ipsum dolor sit amet consectetur. Odio morbi commodo porttitor potenti nisl lobortis. Odio morbi commodo porttitor potenti nisl lobortis.Lorem ipsum dolor sit amet consectetur. Odio morbi commodo porttitor potenti nisl lobortis.Odio morbi commodo porttitor potenti nisl lobortis.Lorem ipsum dolor sit amet consectetur. Odio morbi commodo porttitor potenti nisl lobortis.</p>
                <div>
                    <iframe 
                        src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`} 
                        frameborder="0"
                        style={{ width: '100%', height: '500px' }}
                    ></iframe>
                </div>
            </div>
        </Dialog>
    );
}

export default MaterialPreviewModal;