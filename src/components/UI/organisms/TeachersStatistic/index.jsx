import MentorsStatisticTable from "@/components/templates/MentorsStatisticTable";
import ServisStatisticTable from "@/components/templates/ServisStatisticTable";
import useGetLessonServisStatistic from "@/hooks/useGetLessonServisStatistic";
import { useOutletContext } from "react-router-dom";

const TeachersStatistic = () => {
    const [period] = useOutletContext();
    //TODO   change api
    const { data: statistics, isLoading: isLoadingStatistics } = useGetLessonServisStatistic({startDate:period.startDate, endDate:period.endDate});

 
    return (
        <MentorsStatisticTable activeTab="lesson" data={statistics} isLoading={isLoadingStatistics} headers={["№", "Asosiy o’qituvchi", "O’quvchi soni","Aktivlik","Reytingi"]} />
    )
}

export default TeachersStatistic;