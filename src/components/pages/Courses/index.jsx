import CoursesListItem from "@/components/UI/atoms/CourseListItem"
import Mapper from "@/components/UI/atoms/Mapper";
import useGetAllCourses from "@/hooks/useGetAllCourses";
import cls from './Courses.module.scss';
import Button from "@/components/UI/atoms/Buttons/Button";
import { useState } from "react";
import CourseDialog from "@/components/UI/organisms/CourseDialog";
import CoursesList from "@/components/templates/CoursesList";
import AddCourse from "@/components/UI/organisms/AddCourse";

const Courses = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [courseId, setCourseId] = useState("");
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const { data: courses, isLoading: isLoadingCourses } = useGetAllCourses();

    return (
        <>
            <CoursesList courses={courses} isLoadingCourses={isLoadingCourses} setIsOpen={setIsOpen} setCourseId={setCourseId} />
            <CourseDialog courseId={courseId} onClose={() => setIsOpen(false)} isOpen={isOpen} />
            <Button className={cls.btn} type="button" onClick={() => setIsOpenAdd(true)}>Kurs qo’shish</Button>
            <AddCourse isOpen={isOpenAdd} onclose={() => setIsOpenAdd(false)} />
        </>
    )
}

export default Courses;