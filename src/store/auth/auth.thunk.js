import { useDispatch } from "react-redux"
import { authActions } from "./auth.slice"
import { useQueryClient } from "react-query"

const useAuth = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    
    return {
        login: () => dispatch(authActions.login()),
        logout: () => {
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token')
            dispatch(authActions.logout())
            queryClient.invalidateQueries(['user-info'])
        },
        loading: payload => dispatch(authActions.loading(payload))
    }
}

export default useAuth