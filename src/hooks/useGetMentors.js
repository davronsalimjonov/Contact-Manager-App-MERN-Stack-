import { getCallMentors } from "@/services/mentors";
import { useQuery } from "react-query";

export const useGetMentors = () => {
    const callMentors = useQuery(['call-mentors'],() => getCallMentors({ role: '4' }))
  
    return {
      callMentors,
    }
}
