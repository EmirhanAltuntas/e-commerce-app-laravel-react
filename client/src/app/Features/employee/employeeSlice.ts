import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddSubCategory } from "../../Models/AddSubCategory";
import { AddTempStore } from "../../Models/AddTempStore";
import { SubCategory } from "../../Models/SubCategory";
import { TempEmployee } from "../../Models/TempEmployee";
import MyEmployees from "../../Pages/StoreManagement/MyEmployees";
import employeeService from "../../Services/employeeService";
import subCategoryService from "../../Services/subCategoryService";
import tempEmployeeService from "../../Services/tempEmployeeService";
import tempStoreService from "../../Services/tempStoreService";




export interface EmployeeState {
    employess:any;
    myEmployess:any;
  }
  const initialState:EmployeeState = {
    employess:[],
    myEmployess:[]
  }
  
  
  export const addEmployee = createAsyncThunk(
      'addEmployee',
      async(addEmployee:TempEmployee,thunkAPI)=>{
          try {
              return await employeeService.addEmployee(addEmployee);
          } catch (error) {
              return thunkAPI.rejectWithValue('kayıt başarısız')
          }
      }
      
)

export const getEmployeeById = createAsyncThunk(
    'getEmployeeById',
    async(id:number)=>{
      try {
        return await employeeService.getEmployeesById(id);
    } catch (error) {
        return error
    }
    }
)
  
  export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
      .addCase(addEmployee.fulfilled, (state, action) => {
     //   console.log(action.payload)
        state.employess.push(action.payload)
       
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.myEmployess = action.payload.data
      
      })
   
    },
});
  
  export default employeeSlice.reducer;
  