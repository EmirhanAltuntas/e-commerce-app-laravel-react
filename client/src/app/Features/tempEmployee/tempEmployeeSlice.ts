import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddSubCategory } from "../../Models/AddSubCategory";
import { AddTempStore } from "../../Models/AddTempStore";
import { SubCategory } from "../../Models/SubCategory";
import { TempEmployee } from "../../Models/TempEmployee";
import subCategoryService from "../../Services/subCategoryService";
import tempEmployeeService from "../../Services/tempEmployeeService";
import tempStoreService from "../../Services/tempStoreService";




export interface TempEmployeeState {
    tempEmployess:any;
  }
  const initialState:TempEmployeeState = {
    tempEmployess:[]
  }
  
  
  export const addTempEmployee = createAsyncThunk(
      'addTempEmployee',
      async(addTempEmployee:TempEmployee,thunkAPI)=>{
          try {
              return await tempEmployeeService.addTempEmployee(addTempEmployee);
          } catch (error) {
              return thunkAPI.rejectWithValue('kayıt başarısız')
          }
      }
      
)

export const getTempEmployee = createAsyncThunk(
    'getTempEmployee',
    async()=>{
      try {
        return await tempEmployeeService.getTempEmployees();
    } catch (error) {
        return error
    }
    }
)
export const getTempEmployeeByStoreId = createAsyncThunk(
  'getTempEmployeeByStoreId',
  async(id:number)=>{
    try {
      return await tempEmployeeService.getTempEmployeesByStoreId(id);
  } catch (error) {
      return error
  }
  }
)
export const removeTempEmployee =  createAsyncThunk(
  'removeTempEmployee',
  async(id:number)=>{
    try {
      return await tempEmployeeService.removeTempEmployee(id);
  } catch (error) {
      return error
  }
  }
)

  export const tempEmployeeSlice = createSlice({
    name: 'tempEmployee',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
      .addCase(addTempEmployee.fulfilled, (state, action) => {
       // console.log(action.payload)
        state.tempEmployess.push(action.payload)
       
      })
      .addCase(getTempEmployee.fulfilled, (state, action) => {
        
        state.tempEmployess = action.payload
     //   console.log(state.tempEmployess)
      })
      .addCase(getTempEmployeeByStoreId.fulfilled, (state, action) => {
        
        state.tempEmployess = action.payload.data
     //   console.log(state.tempEmployess)
      })
    .addCase(removeTempEmployee.fulfilled, (state, action) => {
        
        state.tempEmployess = state.tempEmployess.filter((item:any) => item.id !== action.payload);
      
    //   console.log(state.tempEmployess)
       })
    },
});
  
  export default tempEmployeeSlice.reducer;
  