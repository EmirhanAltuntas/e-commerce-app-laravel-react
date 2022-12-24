import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddSubCategory } from "../../Models/AddSubCategory";
import { AddTempStore } from "../../Models/AddTempStore";
import { SubCategory } from "../../Models/SubCategory";
import subCategoryService from "../../Services/subCategoryService";
import tempStoreService from "../../Services/tempStoreService";




export interface TempStoreState {
    tempStores:any;
    isLoading:boolean
  }
  const initialState:TempStoreState = {
    tempStores:[],
    isLoading:false
  }
  
  
  export const addTempStore = createAsyncThunk(
      'addTempStore',
      async(addTempStore:AddTempStore,thunkAPI)=>{
          try {
              return await tempStoreService.addTempStore(addTempStore);
          } catch (error) {
              return thunkAPI.rejectWithValue('kayıt başarısız')
          }
      }
      
  )
  export const deleteTempStore = createAsyncThunk(
    'deleteTempStore',
    async(id:number,thunkAPI)=>{
        try {
            return await tempStoreService.deleteTempStore(id);
        } catch (error) {
            return thunkAPI.rejectWithValue('silme başarısız')
        }
    }
    
)
  export const getTempStore = createAsyncThunk(
    'getTempStore',
    async()=>{
      try {
        return await tempStoreService.getTempStores();
    } catch (error) {
        return error
    }
    }
  )
  
  export const tempStoreSlice = createSlice({
    name: 'tempStore',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
      .addCase(addTempStore.fulfilled, (state, action) => {
        console.log(action.payload)
        state.tempStores.push(action.payload)
        state.isLoading=false
      })
      .addCase(addTempStore.pending, (state, action) => {
        state.isLoading=true       
      })
      .addCase(addTempStore.rejected, (state, action) => {
        state.isLoading=false    
      })
      .addCase(getTempStore.fulfilled, (state, action) => {
        
        state.tempStores = action.payload
        console.log(state.tempStores)
      })
      .addCase(deleteTempStore.fulfilled, (state, action) => {
        
        state.tempStores = state.tempStores.filter((item:any) => item.id !== action.payload);
       // state.tempStores = action.payload
        console.log(state.tempStores)
      })
    },
});
  
  export default tempStoreSlice.reducer;
  