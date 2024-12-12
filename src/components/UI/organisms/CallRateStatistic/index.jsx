import ServisStatisticTable from "@/components/templates/ServisStatisticTable";
import useGetCallServisStatistic from "@/hooks/useGetCallServisStatistic";
import { useOutletContext } from "react-router-dom";
import cls from './CallRateStatistic.module.scss';

const CallRateStatistic = () => {
    const [period] = useOutletContext();
    const { data: statistics, isLoading: isLoadingStatistics } = useGetCallServisStatistic({ startDate: period.startDate, endDate: period.endDate });
   
    return (
        <>
            <ServisStatisticTable
            activeTab={"call"}
                data={statistics}
                isLoading={isLoadingStatistics}
                headers={["Telefon qilgan mentor ismi", "Call o’rtacha statistikasi"]}
            />
        </>
    )
}

export default CallRateStatistic;