
import cls from './ModerationTableRow.module.scss';
import { CheckIcon, CloseIcon, StarIcon } from '../../atoms/icons';
import ModerationFormButtons from '../../organisms/ModerationFormButtons';

const ModerationTableRow = ({
    commentId,
    index,
    fullName,
    phoneNumber,
    comment,
    avarageRate,
    isActive,
    url,
    onOpen,
    courseId,
    params
}) => {

    return (
        <tr className={cls.row} >
            <td>{index}.</td>
            <td className={cls.row__name} onClick={() => onOpen({
                name: fullName,
                phone: phoneNumber,
                comment: comment,
                commentId: commentId,
                url: url,
            })}>
                <span className={cls.row__fullname}>{fullName}</span>
                <span className={cls.row__phone}>{phoneNumber}</span>
            </td>
            <td className={cls.row__td} onClick={() => onOpen({
                name: fullName,
                phone: phoneNumber,
                comment: comment,
                commentId: commentId,
                url: url,
            })}>{comment}</td>
            <td className={cls.row__rate__cell}>
                <span className={cls.row__rate}><StarIcon begining={avarageRate * 20} />{avarageRate}</span>
                {isActive === null &&
                    <ModerationFormButtons
                        classNameForm={cls.row__form}
                        classNameLabel={cls.row__form__label}
                        classNameRadio={cls.row__form__radio}
                        commentId={commentId}
                        courseId={courseId}
                        params={params}
                        preffix1={<CheckIcon />}
                        preffix2={<CloseIcon fill='#fff' />}
                    />
                }
            </td>
        </tr>
    )
}

export default ModerationTableRow;