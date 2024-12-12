import ServisStatisticTable from "@/components/templates/ServisStatisticTable";
import useGetLessonServisStatistic from "@/hooks/useGetLessonServisStatistic";
import { useOutletContext } from "react-router-dom";

const LessonRateStatistic = () => {
    const [period] = useOutletContext();
    const { data: statistics, isLoading: isLoadingStatistics } = useGetLessonServisStatistic({startDate:period.startDate, endDate:period.endDate});

    return (
        <ServisStatisticTable activeTab="lesson" data={statistics} isLoading={isLoadingStatistics} headers={["Dars o’tgan mentor ismi", "Guruhi", "Dars o’rtacha statistikasi"]} />
    )
}

export default LessonRateStatistic;