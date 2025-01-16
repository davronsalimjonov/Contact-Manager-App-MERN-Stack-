import { getSingleMentor } from "@/services/mentors"
import { useQuery } from "react-query"

export const useGetSingleMentor = (mentorId, params = {}) => {

  const singleMentor = useQuery(['single-mentor', mentorId, params], () => getSingleMentor( mentorId , params), {enabled: Boolean(mentorId)})

  return {
    singleMentor  
  }
}   