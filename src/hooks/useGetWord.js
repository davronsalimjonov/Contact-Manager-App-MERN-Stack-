import { deleteWord, getWordById } from "@/services/words"
import { useQuery } from "react-query"


export function useGetWord(wordId) {
    const query = useQuery(['word', wordId], () => getWordById(wordId),{ cacheTime: Infinity, staleTime: Infinity })

    return query
}