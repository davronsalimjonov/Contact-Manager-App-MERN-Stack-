import CoursesListItem from "@/components/UI/atoms/CourseListItem"
import cls from './CoursesList.module.scss';
import Mapper from "@/components/UI/atoms/Mapper";


const CoursesList = ({
    courses,
    isLoadingCourses,
    setCourseId,
    setIsOpen
}) => {

    return (
        <ul className={cls.course__list}>
            <Mapper
                data={courses}
                isInfinityQuery
                isLoading={isLoadingCourses}
                renderItem={(course) => (
                    <CoursesListItem
                        key={course?.id}
                        title={course?.title}
                        description={course?.description}
                        image={course?.image?.url}
                        onChange={() => { }}
                        onHandleDelete={() => { }}
                        courseId={course?.id}
                        handleOpen={() => {
                            setCourseId(course?.id);
                            setIsOpen(true);
                        }}
                    />
                )}
            />

        </ul>
    )
}

export default CoursesList;