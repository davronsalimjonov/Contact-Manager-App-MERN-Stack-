import MentorsTable from "@/components/templates/MentorsTable";
import MentorsPageCards from "@/components/UI/moleculs/MentorsPageCards";
import useGetAcademicMentors from "@/hooks/useGetAcademicMentorStatistic";
import cls from './MainMentors.module.scss';
import { useOutletContext } from "react-router-dom";


const MainMentors = () => {
    const [period] = useOutletContext();

    const { data: mentors, isLoading } = useGetAcademicMentors({ startDate:period.startDate, endDate:period.endDate })
    console.log(mentors)

    return (
        <div className={cls.page}>
            <MentorsPageCards reytings={mentors?.average?.lessonRate} activityStudent={mentors?.average?.active} salary={mentors?.average?.salary} teachersCount={mentors?.average?.count} />
            <MentorsTable mentors={mentors?.items} isLoading={isLoading} />
        </div>
    )
}

export default MainMentors;
