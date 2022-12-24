import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "history";
import { AddCategory } from "../../Models/AddCategory";
import { Category } from "../../Models/Category";
import categoryService from "../../Services/categoryService";


export interface CategoryState {
  categories:any
}
const initialState:CategoryState = {
  categories:[]
}


export const addCategory = createAsyncThunk(
    'category',
    async(addCategory:AddCategory,thunkAPI)=>{
        try {
            return await categoryService.addCategory(addCategory);
        } catch (error) {
            return thunkAPI.rejectWithValue('kayıt başarısız')
        }
    }
    
)

export const getCategories = createAsyncThunk(
  'getcategory',
  async()=>{
    try {
      return await categoryService.getCategories();
  } catch (error) {
      return error
  }
  }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
      .addCase(addCategory.fulfilled, (state, action) => {
        console.log(action.payload)
        state.categories.push(action.payload)
       
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        
      })
    },
});

export default categorySlice.reducer;
