import { getUserFullName } from "@/utils/lib";
import Button from "../../atoms/Buttons/Button"
import { EditIcon } from "../../atoms/icons"
import { formatDate } from "@/utils/formatDate";
import cls from './SingleStudentCourse.module.scss';
import { useNavigate } from "react-router-dom";


const SingleStudentCourse = (
    {
        course
    }
) => {
    const navigate = useNavigate();
    return (
        <div className={cls.course}>
            <h2 className={cls.course__header}>Kurs</h2>

            <div className={cls.course__content}>
                <dl className={cls.course__dl}>
                    <div>
                        <dt className={cls.course__dt}>Kurs nomi</dt>
                        <dd>{course?.course?.title}</dd>
                    </div>
                    <div>
                        <dt className={cls.course__dt}>Asosiy mentor</dt>
                        <dd>{getUserFullName(course?.teacher)}</dd>
                    </div>
                    <div>
                        <dt className={cls.course__dt}>Nazoratchi mentor</dt>
                        <dd>{getUserFullName(course?.secondTeacher)}</dd>
                    </div>
                    <div>
                        <dt className={cls.course__dt}>Sotib olgan sana</dt>
                        <dd>{formatDate(course?.startDate)}</dd>
                    </div>
                    <div>
                        <dt className={cls.course__dt}>Tugash sanasi</dt>
                        <dd>{formatDate(course?.endDate)}</dd>
                    </div>
                    <div>
                        <dt className={cls.course__dt}>Darajasi</dt>
                        <dd>{course?.level}</dd>
                    </div>
                </dl>
                <Button className={cls.course__btn} onClick={()=>navigate(`/update-course/${course?.id}`)} type="button"><EditIcon /></Button>
            </div>
        </div>
    )
}

export default SingleStudentCourse;