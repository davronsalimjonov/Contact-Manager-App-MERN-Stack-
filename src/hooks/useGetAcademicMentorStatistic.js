import { getMainMentors } from "@/services/mentors";
import { useQuery } from "react-query";

const useGetAcademicMentors = (params) => {
    return useQuery(['mentors',params], () => getMainMentors(params))
}

export default useGetAcademicMentors;
