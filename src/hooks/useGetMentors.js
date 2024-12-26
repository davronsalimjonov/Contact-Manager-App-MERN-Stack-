import { getCallMentors } from "@/services/mentors";
import { useQuery } from "react-query";

export const useGetMentors = () => {
    const callMentors = useQuery(['call-mentors'], () => getCallMentors({ role: '4' }))
    const mainMentors = useQuery(['main-mentors'], () => getCallMentors({ role: '2'}))
  
    return {
      callMentors,
      mainMentors
    }
}
