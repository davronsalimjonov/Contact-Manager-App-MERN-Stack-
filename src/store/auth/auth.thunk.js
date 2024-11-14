import { useDispatch } from "react-redux"
import { authActions } from "./auth.slice"

const useAuth = () => {
    const dispatch = useDispatch()
    
    return {
        login: () => dispatch(authActions.login()),
        logout: () => {
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token')
            dispatch(authActions.logout())
        },
        loading: payload => dispatch(authActions.loading(payload))
    }
}

export default useAuth