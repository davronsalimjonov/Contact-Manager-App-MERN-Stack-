import { getCallMentors} from "@/services/mentors";
import { useQuery } from "react-query";

const useGetCallMentors = (params) => {
    return useQuery(['mentors',params], () => getCallMentors(params))
}

export default useGetCallMentors;
