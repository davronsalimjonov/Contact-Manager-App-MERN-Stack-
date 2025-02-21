import axios from "axios";
import { QueryClient } from "react-query";
import { store } from "@/store";
import { authActions } from "@/store/auth/auth.slice";
import { removeEmptyKeys } from "@/utils/lib";

export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
})

api.interceptors.request.use(
    config => {
        if (config.url !== '/auth/login' && config.url !== '/auth/refresh') {
            const authToken = JSON.parse(localStorage.getItem('access-token'));
            if (authToken !== undefined) {
                config.headers.Authorization = `Bearer ${authToken}`;
            }
        }
        return config;
    }, (err) => {
        return Promise.reject(err);
    }
)


api.interceptors.response.use(
    res => res,
    error => {
        const { config, response } = error;
        
        if ((!response || [400, 500].includes(response?.status)) && ['/user/me', '/employee/me', '/auth/login', '/auth/refresh'].includes(config?.url)) {
            store.dispatch(authActions.logout())
            return Promise.reject(error);
        }

        if (response?.status === 401 && config?.url !== '/auth/login' && config?.url !== '/auth/refresh' && !config?.sent) {
            config.sent = true
            const refreshToken = JSON.parse(localStorage.getItem('refresh-token'))
            if (refreshToken) {
                return api.post('/auth/refresh', {}, { headers: { Authorization: `Bearer ${refreshToken}` } })
                    .then(({ data }) => {
                        const { accessToken, refreshToken } = data;
                        localStorage.setItem('access-token', JSON.stringify(accessToken));
                        localStorage.setItem('refresh-token', JSON.stringify(refreshToken));
                        config.headers["Authorization"] = `Bearer ${accessToken}`
                        return api(config)
                    }).catch(error => {
                        store.dispatch(authActions.logout())
                        return Promise.reject(error);
                    })
            } else {
                store.dispatch(authActions.logout())
                return Promise.reject(error);
            }
        } else {
            return Promise.reject(error);
        }
    }
)

export const paramsToString = (params = {}) => {
    params = removeEmptyKeys(params)
    const paramsObj = new URLSearchParams(params)
    return paramsObj.toString()
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            retryOnMount: false
        },
    },
});