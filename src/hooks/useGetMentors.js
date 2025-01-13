import { getAllMentors, getCallMentors, getSingleMentor } from "@/services/mentors";
import { removeEmptyKeys } from "@/utils/lib";
import { useQuery } from "react-query";

const useGetMentors = (params = {}, id = '', role = '') => {
    const callMentors = useQuery(['call-mentors'], () => getCallMentors({ role: '4' }))
    const mainMentors = useQuery(['main-mentors'], () => getCallMentors({ role: '2'}))
    const allMentors = useQuery(['all-mentors', ...Object.values(removeEmptyKeys(params))], () => getAllMentors(params))
    const singleMentor = useQuery(['single-mentor'], () => getSingleMentor({id, role}))
  
    return {
      callMentors,
      mainMentors,
      allMentors,
      singleMentor  
    }
}

export default useGetMentors
