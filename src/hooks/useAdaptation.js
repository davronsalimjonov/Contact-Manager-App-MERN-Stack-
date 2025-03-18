import { useMutation, useQuery, useQueryClient } from "react-query"
import { removeEmptyKeys } from "@/utils/lib"
import { changeAdaptationMentor, getAllAdaptation } from "@/services/adaptation"

export const useGetAllAdaptation = (params = {}) => {
    const queryClient = useQueryClient()
    const query = useQuery(['adaptation', ...Object.values(removeEmptyKeys(params))], () => getAllAdaptation(params))

    const updateStudentAdaptation = async (adaptationId, data) => {
        queryClient.setQueryData(['adaptation'], (students) => {
            return students?.map(adaptation => adaptation.id === adaptationId ? { ...adaptation, ...data } : adaptation)
        })
    }

    return { ...query, updateStudentAdaptation }
}

export const useChangeAdaptationMentorMutation = () => {
    const queryClient = useQueryClient()
    const changeAdaptationMentorMutation = useMutation({
        mutationFn: changeAdaptationMentor,
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(data) {
        const adaptationId = data?.id
        queryClient.setQueryData(['adaptation', 'change-mentor', adaptationId], oldData => ({
            ...oldData,
            items: oldData?.items?.map(item => item.id === adaptationId ? data : item)
        }))
    }

    return changeAdaptationMentorMutation
}