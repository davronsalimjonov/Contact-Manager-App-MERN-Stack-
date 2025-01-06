import { getLessonRateStatistic } from "@/services/statistic";
import { useQuery } from "react-query";

const useGetLessonServisStatistic = (params) => {
    return useQuery(['lesson-rate-statistic', params], () => getLessonRateStatistic(params));

}

export default useGetLessonServisStatistic;