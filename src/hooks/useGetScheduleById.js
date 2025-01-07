import { getScheduleById } from "@/services/schedule";
import { useQuery } from "react-query";
const useGetScheduleById = (scheduleId) => {
    return useQuery(['schedule', scheduleId], () => getScheduleById(scheduleId))
}
export default useGetScheduleById;