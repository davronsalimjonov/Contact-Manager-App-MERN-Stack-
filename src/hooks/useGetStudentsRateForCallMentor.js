import { getStudentsRateForCallMentor } from "@/services/statistic";
import { useQuery } from "react-query";


// TODO might change 
const useGetStudentsRateForCallMentor = (params) => {
    return useQuery(['call-rate-statistic', params], () => getStudentsRateForCallMentor( params));

}

export default useGetStudentsRateForCallMentor;