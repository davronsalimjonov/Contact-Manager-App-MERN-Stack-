import { useEffect } from 'react';
import PreviewModal from 'react-media-previewer';

const MediaPreviewer = ({
    visible = false,
    setVisible,
    urls = []
}) => {

    useEffect(() => {
        if (visible) {
            let modalRef = null

            const handleClickModal = (e) => {
                e.stopPropagation()
                if (e.target === modalRef) {
                    setVisible?.(false);
                }
            }

            setTimeout(() => {
                modalRef = document.getElementsByClassName('rc-dialog-wrap')?.[0]
                modalRef?.addEventListener('click', handleClickModal)
            })

            return () => {
                modalRef?.removeEventListener('click', handleClickModal)
            }
        }
    }, [visible])

    return (
        <PreviewModal
            visible={visible}
            setVisible={setVisible}
            urls={urls}
        />
    );
}

export default MediaPreviewer;