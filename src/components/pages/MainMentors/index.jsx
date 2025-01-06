import MentorsTable from "@/components/templates/MainMentorsTable";
import MentorsPageCards from "@/components/UI/moleculs/MentorsPageCards";
import useGetAcademicMentors from "@/hooks/useGetAcademicMentorStatistic";
import cls from './MainMentors.module.scss';
import { useOutletContext } from "react-router-dom";
import { formatNumber } from "@/utils/formatNumber";


const MainMentors = () => {
    const [period] = useOutletContext();

    const { data: mentors, isLoading } = useGetAcademicMentors({ startDate: period.startDate, endDate: period.endDate })

    return (
        <div className={cls.page}>
            <MentorsPageCards
                cards={
                    [

                        {
                            title: "Mentorlar soni",
                            text: mentors?.average?.count,

                        },
                        {
                            title: "O'quvchilar aktivligi",
                            text: mentors?.average?.active + "%",

                        },
                        {
                            title: "O'rtacha oylik maoshi",
                            text: formatNumber(mentors?.average?.salary) || 0,

                        },
                        {
                            title: "Darsning o'rtacha reytinggi",
                            text: mentors?.average?.lessonRate || 0,

                        },
                    ]}
            />
            <MentorsTable mentors={mentors?.items} isLoading={isLoading} />
        </div>
    )
}

export default MainMentors;
