import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../api/config';

const ADMIN_URL = `${API_URL}/admin/`;

// Helper to get token
const getConfig = (thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

// Get Members
export const getMembers = createAsyncThunk('admin/getMembers', async (_, thunkAPI) => {
    try {
        const response = await axios.get(ADMIN_URL + 'members');
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Generate Code (Immediate or Flexible)
export const generateCode = createAsyncThunk('admin/generateCode', async (data, thunkAPI) => {
    try {
        const response = await axios.post(ADMIN_URL + 'generate-code', data);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.msg) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const initialState = {
    members: [],
    generatedResult: null, // Stores the code or success message
    isLoading: false,
    isError: false,
    message: ''
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetAdmin: (state) => {
            state.generatedResult = null;
            state.isError = false;
            state.message = '';
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMembers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMembers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.members = action.payload;
            })
            .addCase(getMembers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(generateCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(generateCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.generatedResult = action.payload; // Contains { msg, user? or code? }
            })
            .addCase(generateCode.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;
