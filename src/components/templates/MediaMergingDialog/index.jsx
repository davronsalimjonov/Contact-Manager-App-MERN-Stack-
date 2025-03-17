import Dialog from "@/components/UI/moleculs/Dialog"
import cls from "./MediaMerginDialog.module.scss"

const MediaMergingDialog = ({
  isOpen=false,
  setIsOpen
}) => {

  return (
    <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={cls.MediaMerginDialog}>
            <img src="/images/merging.png" alt="" />
            <h2>Video Qayta Ishlanmoqda...</h2>
        </div>
    </Dialog>
  )
}

export default MediaMergingDialog