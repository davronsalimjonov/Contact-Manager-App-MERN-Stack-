import { useEffect } from 'react';
import PreviewModal from 'react-media-previewer';

const MediaPreviewer = ({
    visible = false,
    setVisible,
    urls = []
}) => {

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                const modalRef = document.getElementsByClassName('rc-dialog-wrap')?.[0]

                const handleClickModal = (e) => {
                    e.stopPropagation()
                    if (e.target === modalRef) {
                        setVisible?.(false);
                    }
                }

                modalRef?.addEventListener('click', handleClickModal)

                return () => {
                    modalRef?.removeEventListener('click', handleClickModal)
                }
            })
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