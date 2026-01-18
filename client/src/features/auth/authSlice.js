import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../api/config';

const AUTH_URL = `${API_URL}/auth/`;

// Login User
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await axios.post(AUTH_URL + 'login', userData);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Register User
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await axios.post(AUTH_URL + 'register', userData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Current User (Refresh Profile)
export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(AUTH_URL + 'me', config);
        // Important: We need to update the 'user' object in localStorage without losing the token
        const ls = JSON.parse(localStorage.getItem('user'));
        if (ls) {
            ls.user = response.data;
            localStorage.setItem('user', JSON.stringify(ls));
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.msg) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user.user : null,
    token: user ? user.token : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.msg;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.token = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    }
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
