import axios from 'axios';
import { toast } from 'react-toastify';
import { customFetch } from '.';

// const BASE_URL = 'https://plushheaven.onrender.com'; // Replace this with your API base URL
const BASE_URL = 'http://localhost:5000';
export const updateUser = async (userData) => {
    try {
        const response = await customFetch.patch('/api/v1/users/updateUser', userData, {
            withCredentials: true,
        });
        toast.success('User Information Updated successfully')
        return response.data;
    } catch (error) {

        toast.error(error.response.data.msg)
    }
};

export const updateUserPassword = async (passwordData) => {
    try {
        const response = await customFetch.patch(`/api/v1/users/updateUserPassword`, passwordData, {
            withCredentials: true,
        });
        toast.success("Password updated");
        return response.data;
    } catch (error) {

        toast.error(error.response.data.msg)
    }
};
