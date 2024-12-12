import { getCallRateStatistic } from "@/services/statistic";
import { useQuery } from "react-query";

const useGetCallServisStatistic = (params) => {
    return useQuery(['call-rate-statistic', params], () => getCallRateStatistic(params));
}

export default useGetCallServisStatistic;