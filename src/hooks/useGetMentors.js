import { useQuery } from "react-query";
import { removeEmptyKeys } from "@/utils/lib";
import { getMentors } from "@/services/mentors";
import { getAllMentors } from "@/services/mentors";

const useGetMentors = (params = {}, options = {}) => {
  const callMentors = useQuery(['call-mentors'], () => getMentors(4), { cacheTime: Infinity, staleTime: Infinity, ...options })
  const mainMentors = useQuery(['main-mentors'], () => getMentors(2), { cacheTime: Infinity, staleTime: Infinity, ...options })
  const allMentors = useQuery(['all-mentors', ...Object.values(removeEmptyKeys(params))], () => getAllMentors(params), { cacheTime: Infinity, staleTime: Infinity, ...options })

  return {
    callMentors,
    mainMentors,
    allMentors
  }
}

export default useGetMentors
