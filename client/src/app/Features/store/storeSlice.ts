import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddStore } from "../../Models/AddStore";
import { Store } from "../../Models/Store";
import storeService from "../../Services/storeService";




export interface StoreState {
    stores:any;
    store:Store;
    storesCount:number;
  }
  const initialState:StoreState = {
    stores:[],
    store:{store_name:"",status:false,id:"",tax_number:"",tel_number:""},
    storesCount:0
}
  
  
export const addStore = createAsyncThunk(
      'addStore',
      async(addStore:AddStore,thunkAPI)=>{
          try {
              return await storeService.addStore(addStore);
          } catch (error) {
              return thunkAPI.rejectWithValue('kayıt başarısız')
          }
      }
      
)
  
  export const getStores = createAsyncThunk(
    'getStore',
    async()=>{
      try {
        return await storeService.getStores();
    } catch (error) {
        return error
    }
    }
  )
  export const getStoreById = createAsyncThunk(
    'getStoreById',
    async(store_id:any)=>{
      try {
        return await storeService.getStoreById(store_id);
    } catch (error) {
        return error
    }
    }
  )
  
  
  export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
      .addCase(addStore.fulfilled, (state, action) => {
        //console.log(action.payload.data.store)
        state.stores.push(action.payload.data.store)
       
      })
      .addCase(getStores.fulfilled, (state, action) => {
        
        state.stores = action.payload
        state.storesCount = state.stores.length || 0
      })
      .addCase(getStoreById.fulfilled, (state, action) => {   
        state.store = action.payload
        console.log(state.store)
      })
    },
});
  
  export default storeSlice.reducer;
  