import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'


const themes = {
    winter: 'winter',
    sunset: 'sunset',
};

const getUserFromLocalStroage = () => {
    // console.log();

    return JSON.parse(localStorage.getItem('user')) || null
}
const getThemeFromLocalStorage = () => {
    const theme = localStorage.getItem('theme') || themes.winter;
    document.documentElement.setAttribute('data-theme', theme);
    return theme
}

const initialState = {
    user: getUserFromLocalStroage(),
    theme: getThemeFromLocalStorage(),
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const user = { ...action.payload.user }
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user))
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.success('Logged out successfully!')

        },
        toggleTheme: (state) => {
            const { sunset, winter } = themes;
            state.theme = state.theme === sunset ? winter : sunset;
            document.documentElement.setAttribute('data-theme', state.theme);
            localStorage.setItem('theme', state.theme)
        },
    }
})

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducer;