import { useOutletContext } from "react-router-dom";
import { formatPrice } from "@/utils/lib";
import Loader from "@/components/UI/atoms/Loader";
import { StarIcon } from "@/components/UI/atoms/icons";
import { useGetMainMentorsStatistic } from "@/hooks/useMentor";
import MentorsAvarageCard from "@/components/UI/moleculs/MentorsAvarageCard";
import MainMentorsStatisticTable from "@/components/templates/MainMentorsStatisticTable";
import cls from './MainMentorsStatistic.module.scss';

const MainMentorsStatistic = () => {
    const [period] = useOutletContext()
    const { data: mentors, isLoading } = useGetMainMentorsStatistic({ startDate: period.startDate, endDate: period.endDate })

    return !isLoading ? (
        <div className={cls.page}>
            <div className={cls.page__header}>
                <MentorsAvarageCard
                    title="Teacherlar soni"
                    value={mentors?.average?.count || 0}
                />
                <MentorsAvarageCard
                    title="O'quvchilar aktivligi"
                    value={(mentors?.average?.activeStudentsPercentage || 0) + ' %'}
                    backgroundColor="rgba(0, 199, 89, 0.8)"
                />
                <MentorsAvarageCard
                    title="O'rtacha oylik maoshi"
                    value={formatPrice(mentors?.average?.salary || 0) + ' so\'m'}
                    backgroundColor="rgba(239, 183, 0, 0.8)"
                />
                <MentorsAvarageCard
                    title="O’qituvchining o'rtacha reytinggi"
                    value={<span className={cls.page__header__rating}><StarIcon /> {mentors?.average?.rating || 0}</span>}
                    backgroundColor="rgba(255, 144, 102, 1)"
                />
            </div>
            <MainMentorsStatisticTable 
                mentors={mentors?.items}
            />
        </div>
    ) : (
        <Loader />
    )
}

export default MainMentorsStatistic;
