import { getAllMentors } from "@/services/mentors";
import { removeEmptyKeys } from "@/utils/lib";
import { getMentors } from "@/services/mentors";
import { useQuery } from "react-query";

const useGetMentors = (params = {}) => {
  const callMentors = useQuery(['call-mentors'], () => getMentors(4))
  const mainMentors = useQuery(['main-mentors'], () => getMentors(2))
  const allMentors = useQuery(['all-mentors', ...Object.values(removeEmptyKeys(params))], () => getAllMentors(params))

  return {
    callMentors,
    mainMentors,
    allMentors 
  }
}

export default useGetMentors
