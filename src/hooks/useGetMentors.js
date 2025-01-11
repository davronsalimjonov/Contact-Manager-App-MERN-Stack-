import { getAllMentors, getCallMentors } from "@/services/mentors";
import { removeEmptyKeys } from "@/utils/lib";
import { useQuery } from "react-query";

const useGetMentors = (params = {}) => {
    const callMentors = useQuery(['call-mentors'], () => getCallMentors({ role: '4' }))
    const mainMentors = useQuery(['main-mentors'], () => getCallMentors({ role: '2'}))
    const allMentors = useQuery(['all-mentors', ...Object.values(removeEmptyKeys(params))], () => getAllMentors(params))
  
    return {
      callMentors,
      mainMentors,
      allMentors
    }
}

export default useGetMentors
