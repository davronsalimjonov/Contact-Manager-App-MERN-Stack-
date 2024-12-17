import Avatar from "react-avatar";
import Button from "../../atoms/Buttons/Button"
import Dialog from "../../moleculs/Dialog"
import cls from './ModerationDialog.module.scss';

const ModerationDialog = ({
    isOpen,
    onClose,
    comment,
    handleAccept,
    handleNotAccept
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.content}>
                <Avatar round={true} size="72" src={comment?.url}/>
                <h2 className={cls.content__name}>{comment?.name}</h2>
                <p className={cls.content__phone}>{comment?.phone}</p>
                <p className={cls.content__comment}>{comment?.comment}</p>
                <div className={cls.content__bottom}>
                    <span className={cls.content__bottom__question}>Ushbu fikr qabul qilinsinmi?</span>
                    <div className={cls.content__bottom__btns}>
                        <Button className={cls.content__bottom__btn} onClick={handleAccept}>Ha</Button>
                        <Button className={cls.content__bottom__btn} onClick={handleNotAccept}>Yo'q</Button>
                    </div>

                </div>

            </div>
        </Dialog>
    )
}

export default ModerationDialog;