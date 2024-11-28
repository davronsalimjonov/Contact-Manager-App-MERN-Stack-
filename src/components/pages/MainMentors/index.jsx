import MentorsTable from "@/components/templates/MentorsTable";
import MentorsPageCards from "@/components/UI/moleculs/MentorsPageCards";
import useGetAcademicMentors from "@/hooks/useGetAcademicMentorStatistic";
import cls from './MainMentors.module.scss';


const MainMentors = () => {
    const startDate = new Date("01.11.2024");
    const endDate = new Date("30.11.2024");
    const { data: mentors, isLoading } = useGetAcademicMentors({ startDate, endDate })
    console.log(mentors)

    return (
        <div className={cls.page}>
            <MentorsPageCards reytings={mentors?.average?.lessonRate} activityStudent={mentors?.average?.active} salary={mentors?.average?.salary} teachersCount={mentors?.average?.count} />
            <MentorsTable mentors={mentors?.items} isLoading={isLoading} />
        </div>
    )
}

export default MainMentors;
