import { useMutation } from "react-query"
import { createReminder } from "@/services/reminder"

export const useCreateReminderMutation = () => {
    return useMutation({
        mutationFn: createReminder,
    })
}