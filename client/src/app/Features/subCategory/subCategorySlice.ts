import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddSubCategory } from "../../Models/AddSubCategory";
import { SubCategory } from "../../Models/SubCategory";
import subCategoryService from "../../Services/subCategoryService";




export interface SubCategoryState {
    subCategories:any;
  }
  const initialState:SubCategoryState = {
    subCategories:[]
  }
  
  
  export const addSubCategory = createAsyncThunk(
      'addSubCategory',
      async(addCategory:AddSubCategory,thunkAPI)=>{
          try {
              return await subCategoryService.addSubCategory(addCategory);
          } catch (error) {
              return thunkAPI.rejectWithValue('kayıt başarısız')
          }
      }
      
  )
  
  export const getSubCategories = createAsyncThunk(
    'getSubCategory',
    async()=>{
      try {
        return await subCategoryService.getSubCategories();
    } catch (error) {
        return error
    }
    }
  )
  
  export const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
      .addCase(addSubCategory.fulfilled, (state, action) => {
        console.log(action.payload)
        state.subCategories.push(action.payload)
       
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.subCategories = action.payload
        
      })
    },
});
  
  export default subCategorySlice.reducer;
  