import { createSlice } from "@reduxjs/toolkit"

export const {
    actions: authActions,
    reducer: authReducer
} = createSlice({
    name: "auth",
    initialState: {
        isAuth: Boolean(JSON.parse(localStorage.getItem('access-token'))),
        isLoading: true,
    },
    reducers: {
        login: (state) => {
            state.isAuth = true
        },
        logout: (state) => {
            state.isAuth = false
        },
        loading: (state, { payload }) => {
            state.isLoading = payload
        },
    }
})