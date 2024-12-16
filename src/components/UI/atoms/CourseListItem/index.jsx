
import cls from './CourseListItem.module.scss';
import { EditIcon } from "../icons";
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';


const CoursesListItem = ({
    image = "",
    title = "",
    description = "",
    courseId,
    handleOpen
}) => {
    

    const navigate = useNavigate();
    return (
        <li className={cls.item} onClick={handleOpen} >
            <img src={image} alt="Course Image" width={125} height={76} />
            <div className={cls.item__content}>
                <p className={cls.item__title}>{title}</p>
                <p className={cls.item__text} dangerouslySetInnerHTML={{__html: description}}></p>
            </div>
            <Button type='button' onClick={()=>navigate(`/moderation/${courseId}`)}>Moderatsiya</Button>
            <Button className={cls.item__btn} type='button' onClick={()=>navigate(`/courses/${courseId}`)}> <EditIcon/></Button>
        </li>
    )
}

export default CoursesListItem;