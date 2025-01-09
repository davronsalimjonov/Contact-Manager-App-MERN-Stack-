import { getMentors } from "@/services/mentors";
import { useQuery } from "react-query";

export const useGetMentors = () => {
    const callMentors = useQuery(['call-mentors'], () => getMentors(4))
    const mainMentors = useQuery(['main-mentors'], () => getMentors(2))
  
    return {
      callMentors,
      mainMentors
    }
}