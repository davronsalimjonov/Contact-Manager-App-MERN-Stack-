import MentorsTable from "@/components/templates/MainMentorsTable";
import MentorsPageCards from "@/components/UI/moleculs/MentorsPageCards";
import useGetAcademicMentors from "@/hooks/useGetAcademicMentorStatistic";
import cls from './CallMentors.module.scss';
import { useOutletContext } from "react-router-dom";
import CallMentorsTable from "@/components/templates/CallMentorsTable";
import useGetCallMentors from "@/hooks/useGetCallMentorStatistic";


const CallMentors = () => {
    const [period] = useOutletContext();

    const { data: mentors, isLoading } = useGetCallMentors({ startDate:period.startDate, endDate:period.endDate })
console.log(mentors);
    return (
        <div className={cls.page}>
            <MentorsPageCards
                cards={
                    [

                        {
                            title: "Teacherlar soni",
                            text: mentors?.average?.count,

                        },
                        {
                            title: "O'quvchilar aktivligi",
                            text: mentors?.average?.active + "%",

                        },
                        {
                            title: "Call tezligi",
                            text: mentors?.average?.salary || 0,  //TODO

                        },
                        {
                            title: "O'rtacha call davomiyligi",
                            text: mentors?.average?.lessonRate,  //TODO

                        },


                    ]} /> 
                      <CallMentorsTable mentors={mentors?.items} isLoading={isLoading} />
        </div>
    )
}

export default CallMentors;
