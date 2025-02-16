import { useGetCallMentorsStatistic } from "@/hooks/useMentor";
import CallMentorsStatisticTable from "@/components/templates/CallMentorsStatisticTable";
import cls from './CallMentorsStatistic.module.scss';
import Loader from "@/components/UI/atoms/Loader";
import MentorsAvarageCard from "@/components/UI/moleculs/MentorsAvarageCard";
import { StarIcon } from "@/components/UI/atoms/icons";

const CallMentorsStatistic = () => {
    const { data: mentors, isLoading } = useGetCallMentorsStatistic()
    
    return !isLoading ? (
        <div className={cls.page}>
            <div className={cls.page__header}>
                <MentorsAvarageCard 
                    title="Mentorlar soni"
                    value={mentors?.average?.count || 0}
                />
                <MentorsAvarageCard 
                    title="O'quvchilar aktivligi"
                    value={(mentors?.average?.active || 0) + ' %'}
                    backgroundColor="rgba(0, 199, 89, 0.8)"
                />
                <MentorsAvarageCard 
                    title="Call reytinggi"
                    value={<span className={cls.page__header__rating}><StarIcon /> {mentors?.average?.rating || 0}</span>}
                    backgroundColor="rgba(239, 183, 0, 0.8)"
                />
                <MentorsAvarageCard 
                    title="Adaptatsiyalar soni"
                    value={(mentors?.average?.adaptation || 0) + ' ta'}
                    backgroundColor="rgba(255, 144, 102, 1)"
                />
            </div>
            <CallMentorsStatisticTable mentors={mentors?.items} />
        </div>
    ) : (
        <Loader />
    )
}

export default CallMentorsStatistic;