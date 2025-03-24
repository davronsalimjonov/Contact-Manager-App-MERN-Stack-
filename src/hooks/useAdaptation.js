import { useMutation, useQuery, useQueryClient } from "react-query"
import { removeEmptyKeys } from "@/utils/lib"
import { changeAdaptationMentor, getAllAdaptation, getFinishedAdaptations } from "@/services/adaptation"

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

export const useGetFinishedAdaptations = (params = {}) => {
    return useQuery(['finished-adaptations', ...Object.values(removeEmptyKeys(params))], () => getFinishedAdaptations(params))
}

export const useChangeAdaptationMentorMutation = () => {
    const queryClient = useQueryClient()
    const changeAdaptationMentorMutation = useMutation({
        mutationFn: async data => {
            return await changeAdaptationMentor(data?.id, { mentor: data?.mentor })
        },
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(newAdaptation) {
        const mentorId = newAdaptation?.mentor?.id
        const adaptationId = newAdaptation?.id

        const oldMentorId = queryClient.getQueryData(['adaptation'])?.find(adaptation => adaptation.id === adaptationId)?.mentor?.id
        queryClient.setQueriesData(['adaptation', mentorId], oldData => ([...(oldData || []), newAdaptation]))
        queryClient.setQueriesData(['adaptation', oldMentorId], oldData => oldData?.filter(adaptation => adaptation.id !== adaptationId))
    }

    return changeAdaptationMentorMutation
}