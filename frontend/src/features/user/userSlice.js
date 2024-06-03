import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'
import { updateUser, updateUserPassword } from "../../utils/userApi";


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
        updateUserLocally: (state, action) => {
            const user = { ...action.payload.user }
            // state.user = { ...state.user, ...action.payload };
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user))
        },
    }
})

export const { loginUser, logoutUser, toggleTheme, updateUserLocally } = userSlice.actions;
export const updateUserAsync = (userData) => async (dispatch) => {
    try {
        const updatedUser = await updateUser(userData);

        dispatch(updateUserLocally(updatedUser));
        toast.success("User information updated successfully!");
    } catch (error) {
        console.error("Error updating user:", error);
        toast.error(error.message);
        if (error.status === 401) {
            dispatch(logoutUser());
        }
    }
};

export const updateUserPasswordAsync = (passwordData) => async (dispatch) => {
    try {
        await updateUserPassword(passwordData);

    } catch (error) {

        if (error.status === 401) {
            dispatch(logoutUser());
        }
    }
};

export default userSlice.reducer;