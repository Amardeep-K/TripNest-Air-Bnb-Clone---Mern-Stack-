import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
const loginUser = createAsyncThunk(
     "auth/loginuser",
     async (credentials,{ rejectWithValue })=>{
        try{
        const response = await api.post("/auth/login",credentials);
        return response.data.user;
        }catch(error){
            return rejectWithValue(err.response?.data?.message || 'Login Failed');

        }
        
     }
)
const checkAuthStatus = createAsyncThunk(
     "auth/checkStatus",
     async (_,{ rejectWithValue })=>{
        try{
        const response = await api.get("/auth/me");
        return response.data.user;
        }catch(error){
            return rejectWithValue(null);

        }
        
     }
)
const authSlice = createSlice({
    name:"Auth",
    initialState:{
        user:null,
        isLoading:false,
        isAuthenticated:false,
        error:null,
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(checkAuthStatus.pending,(state,action)=>{

            state.isLoading=true;
            state.error=null

        })
        .addCase(checkAuthStatus.fulfilled,(state,action)=>{
            state.user=action.payload;
            state.isAuthenticated=true;
            state.isLoading=false;

        })
        .addCase(checkAuthStatus.rejected,(state,action)=>{
            state.user=null;
            state.isAuthenticated=false;
            state.isLoading=false;
            state.error=action.error;

        })
        .addCase(loginUser.pending,(state,action)=>{
             state.isLoading=true;
            state.error=null

        })
        .addCase(loginUser.fulfilled,(state,action)=>{
           state.user=action.payload;
            state.isAuthenticated=true;
            state.isLoading=false;

        })

    }

});
export default authSlice.reducer