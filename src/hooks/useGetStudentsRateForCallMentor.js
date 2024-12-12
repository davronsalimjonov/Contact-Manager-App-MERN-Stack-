import { getStudentsRateForCallMentor } from "@/services/statistic";
import { useQuery } from "react-query";


// TODO might change 
const useGetStudentsRateForCallMentor = (teacherId, params) => {
    return useQuery(['call-rate-statistic', teacherId, params], () => getStudentsRateForCallMentor(teacherId, params));

}

export default useGetStudentsRateForCallMentor;