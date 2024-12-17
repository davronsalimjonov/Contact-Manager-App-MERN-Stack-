import Avatar from "react-avatar";
import Dialog from "../../moleculs/Dialog"
import cls from './ModerationDialog.module.scss';

import ModerationFormButtons from "../ModerationFormButtons";

const ModerationDialog = ({
    isOpen,
    onClose,
    comment,
    courseId,
    params
}) => {

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.content}>
                <Avatar round={true} size="72" src={comment?.url} />
                <h2 className={cls.content__name}>{comment?.name}</h2>
                <p className={cls.content__phone}>{comment?.phone}</p>
                <p className={cls.content__comment}>{comment?.comment}</p>
                <div className={cls.content__bottom}>
                    <span className={cls.content__bottom__question}>Ushbu fikr qabul qilinsinmi?</span>
                    <div className={cls.content__bottom__btns}>
                        <ModerationFormButtons
                            label1={"Ha"}
                            label2={"Yo'q"}
                            classNameForm={cls.content__bottom__btns}
                            classNameLabel={cls.content__bottom__btn}
                            classNameRadio={cls.content__bottom__radio}
                            commentId={comment?.commentId}
                            courseId={courseId}
                            params={params}
                            onClose={onClose}
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default ModerationDialog;