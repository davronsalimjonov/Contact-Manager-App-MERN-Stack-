import { DEGREEOPTIONS, STUDENTS_STATUS_OPTION } from "@/constants";
import cls from './SingleStudentCourseForm.module.scss';
import { useForm } from "react-hook-form";
import FormInput from "../../moleculs/Form/FormInput";
import FormSelect from "../../moleculs/Form/FormSelect";
import Button from "../../atoms/Buttons/Button";
import RedButton from "../../atoms/Buttons/RedButton";
import useGetStudentCourse from "@/hooks/useGetStudentCourse";
import { getUserFullName } from "@/utils/lib";
import FormDatepicker from "../../moleculs/Form/FormDatepicker";
import FormPasswordInput from "../../moleculs/Form/FormPasswordInput";
import Loader from "../../atoms/Loader";
import {  singleStudentCourseSchema } from "@/schemas/course";
import { yupResolver } from "@hookform/resolvers/yup";

const SingleStudentCourseForm = ({
    defaultValues,
    onSubmit
}) => {

    const {
        courses: { data: courses, isLoading: isLoadingCourses },
        teachers: { data: teachers, isLoading: isLoadingTeachers },
        secondTeachers: { data: secondTeachers, isLoading: isLoadingSecondTeachers },
    } = useGetStudentCourse();


    const { register, control, handleSubmit, reset, formState: { errors, isDirty, isSubmitting } } = useForm({
        mode: 'onSubmit',
        defaultValues: defaultValues,
         resolver: yupResolver(singleStudentCourseSchema)
    })

    return (
        !isLoadingCourses &&
        !isLoadingSecondTeachers &&
        !isLoadingTeachers
    ) ? (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.form__elements}>
                <FormSelect
                    className={cls.form__input}
                    name="course"
                    isClearable={true}
                    control={control}
                    options={courses?.map(course => ({ value: course.id, label: course.title }))}
                    placeholder="Kursni tanlang"
                    label="Kursni tanlang"
                    error={errors?.course?.message}
                />
                <FormDatepicker
                    name='startDate'
                    label='Kursni boshlanish vaqti'
                    placeholder='Kursni boshlanish vaqti'
                    control={control}
                    error={errors?.startDate?.message}
                />
                <FormDatepicker
                    name='endDate'
                    label='Kursni tugash vaqti'
                    placeholder='Kursni tugash vaqti'
                    control={control}
                    error={errors?.endDate?.message}
                />
                <FormInput
                    className={cls.form__input}
                    label='Login'
                    placeholder='Login'
                    register={{ ...register('login') }}
                    error={errors?.login?.message}
                />
                <FormPasswordInput
                    label='Parol'
                    placeholder='Parolni kiriting'
                    register={{ ...register('password', { required: 'Parolni kiriting' }) }}
                    error={errors?.password?.message}
                />

                <FormSelect
                    className={cls.form__input}
                    name="teacher"
                    isClearable={true}
                    control={control}
                    options={teachers?.map(teacher => ({ value: teacher.id, label: getUserFullName(teacher) }))}
                    placeholder="Tanlang"
                    label="Mentorni tanlang"
                    error={errors?.teacher?.message}
                />

                <FormSelect
                    className={cls.form__input}
                    name="secondTeacher"
                    isClearable={true}
                    control={control}
                    options={secondTeachers?.map(secondTeacher => ({ value: secondTeacher.id, label: getUserFullName(secondTeacher) }))}
                    placeholder="Tanlang"
                    label="Yordamchi mentorni tanlang"
                    error={errors?.secondTeacher?.message}
                />


                <FormSelect
                    className={cls.form__input}
                    name="status"
                    isClearable={true}
                    control={control}
                    options={STUDENTS_STATUS_OPTION}
                    placeholder="Tanlang"
                    label="Foydalanuvchi statusi"
                    error={errors?.status?.message}
                />


                <FormSelect
                    className={cls.form__input}
                    name="level"
                    isClearable={true}
                    control={control}
                    options={DEGREEOPTIONS}
                    placeholder="Tanlang"
                    label="O'quvchi darajasi"
                    error={errors?.level?.message}
                />


                <div className={cls.form__buttons}>
                    <Button
                        type='submit'
                        isLoading={isSubmitting}
                    >O'zgartirish</Button>
                    <RedButton
                        disabled={!isDirty}
                        onClick={() => reset()}
                    >
                        Bekor qilish
                    </RedButton>
                </div>
            </div>
        </form>
    ) : (
        <Loader />
    )
}


export default SingleStudentCourseForm;