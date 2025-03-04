import Dialog from "../../moleculs/Dialog";
import useGetCourseById from "@/hooks/useGetCourseById";
import cls from './CourseDialog.module.scss';
import Loader from "../../atoms/Loader";

const CourseDialog = ({ courseId, isOpen, onClose }) => {

    const { data: course, isLoading: isLoadingCourse } = useGetCourseById(courseId);



    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
           
            <div className={cls.content}>
            {isLoadingCourse && <Loader size={80} />}
                <img className={cls.content__img} src={course?.image?.url} alt="Course image" width={516} height={284} />
                <h2 className={cls.content__title}>{course?.title}</h2>
                <p className={cls.content__text} dangerouslySetInnerHTML={{__html: course?.description}}></p>
            </div>
        </Dialog>
    )
}

export default CourseDialog;