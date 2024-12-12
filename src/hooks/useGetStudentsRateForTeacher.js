import { getStudentsRateForTeacher } from "@/services/statistic";
import { useQuery } from "react-query";

const useGetStudentsRateForTeacher = (teacherId,groupId, params) => {
    return useQuery(['lesson-rate-statistic', teacherId,groupId, params], () => getStudentsRateForTeacher(teacherId,groupId, params));

}

export default useGetStudentsRateForTeacher;