import { getCallAndLessonLeaderboard } from "@/services/statistic";
import { useQuery } from "react-query";

const useGetCallAndLessonLeaderboard = (params) => {
    return useQuery(['call-lesson-leaderboard', params], () => getCallAndLessonLeaderboard(params));

}

export default useGetCallAndLessonLeaderboard;