import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DisplayUser } from "../../Models/DisplayUser.interface";
import { Jwt } from "../../Models/Jwt";
import { LoginUser } from "../../Models/LoginUser";
import { RegisterUser } from "../../Models/RegisterUser.interface";
import authService from "../../Services/authService";


const storedUser : string | null = localStorage.getItem('user');
const user : DisplayUser | null = !! storedUser ? JSON.parse(storedUser):null

const storedJwt : string | null = localStorage.getItem('token');
const jwt : Jwt  = !! storedJwt ? JSON.parse(storedJwt):null;


interface AsyncState{
    isLoading:boolean;
    isSuccess:boolean;
    isError:boolean;
}

interface AuthState extends AsyncState{
    user: any ,
    jwt : Jwt,
    isAuthenticated:boolean,
    status:string,
    message:any,
}
const initialState: AuthState = {
    user:user,
    jwt:jwt,
    isAuthenticated:false,
    isLoading:false,
    isSuccess:false,
    isError:false,
    status:'',
    message:'',
}
//console.log(user)

export const register = createAsyncThunk(
    'auth/register',
    async(user:RegisterUser,thunkAPI)=>{
        try {
            return await authService.register(user);
        } catch (error) {
            return thunkAPI.rejectWithValue('kayıt başarısız')
        }
    }
    
)
export const login = createAsyncThunk(
    'auth/login',
    async(user:LoginUser,thunkAPI)=>{
        try {
            return await authService.login(user);
        } catch (error) {
            return thunkAPI.rejectWithValue('giriş başarısız')
        }
    }
    
)
export const logout = createAsyncThunk(
    'auth/logout',
    async()=>{
        await authService.logout();
    }
    
)

 const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state) =>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError = false;
            state.message ="";
            state.status = "";
        }
    },
    extraReducers:(builder)=>{
        builder
        //register
        .addCase(register.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess = true;
          //  state.user= action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError = true;
            state.user= null;

        })
         //login
         .addCase(login.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess = true;
            state.jwt= action.payload.data;
            state.isAuthenticated = true;
            state.user=action.payload.data;
            state.status = action.payload.status;
            state.message = action.payload.message;
          //  console.log(action.payload.message)
           // console.log(action.payload.status)
        })
        .addCase(login.rejected,(state)=>{
            state.isLoading=false;
            state.isError = true;
            state.user= null;
            state.isAuthenticated = false;
            

        })
        //logout
        .addCase(logout.fulfilled, (state)=>{
            state.user = null
            state.jwt = null
            state.isAuthenticated = false
            state.isLoading = false
        })
    },
});

export default authSlice.reducer;
export const {reset} = authSlice.actions;