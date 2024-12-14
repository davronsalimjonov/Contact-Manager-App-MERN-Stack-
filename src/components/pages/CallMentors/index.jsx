import MentorsPageCards from "@/components/UI/moleculs/MentorsPageCards";
import cls from './CallMentors.module.scss';
import { useOutletContext } from "react-router-dom";
import CallMentorsTable from "@/components/templates/CallMentorsTable";
import useGetCallMentors from "@/hooks/useGetCallMentorStatistic";
import { StarIcon } from "@/components/UI/atoms/icons";
import { formatTime } from "@/utils/formatTime";


const CallMentors = () => {
    const [period] = useOutletContext();

    const { data: mentors, isLoading } = useGetCallMentors({ startDate: period.startDate, endDate: period.endDate })
  
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
                            title: "Call reytinggi",
                            text: <span className={cls.page__icon}><StarIcon color={"#fff"} /> {mentors?.average?.callRate || 0}</span>, 

                        },
                        {
                            title: "O'rtacha call davomiyligi",
                            text: formatTime(mentors?.average?.Duration || 0) + " s", 

                        },


                    ]} />
            <CallMentorsTable mentors={mentors?.items} isLoading={isLoading} />
        </div>
    )
}

export default CallMentors;