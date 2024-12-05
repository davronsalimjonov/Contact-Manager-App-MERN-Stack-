
import cls from './CourseListItem.module.scss';
import { EditIcon } from "../icons";
import Button from '../Buttons/Button';


const CoursesListItem = ({
    src = "",
    title = "",
    description = "",
    handleOpen

}) => {

    return (
        <li className={cls.item} onClick={handleOpen} >
            <img src={src} alt="Course Image" width={125} height={76} />
            <div className={cls.item__content}>
                <p className={cls.item__title}>{title}</p>
                <p className={cls.item__text} dangerouslySetInnerHTML={{__html: description}}></p>
            </div>
            <Button className={cls.item__btn} type='button'><EditIcon /></Button>
        </li>
    )
}

export default CoursesListItem;