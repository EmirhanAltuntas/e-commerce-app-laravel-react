import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddProduct } from "../../Models/AddProduct";
import { AddStoreProduct } from "../../Models/AddStoreProduct";
import productService from "../../Services/productService";
import storeProductService from "../../Services/storeProductService";
import { store } from "../../store";


export interface StoreProductState {
    storeProducts:any
    stores:any
  }
  const initialState:StoreProductState = {
    storeProducts:[],
    stores:[]
}

export const addStoreProduct = createAsyncThunk(
    'addStoreproduct',
    async(addStoreProduct:AddStoreProduct,thunkAPI)=>{
        try {
            return await storeProductService.addStoreProduct(addStoreProduct);
        } catch (error) {
            return thunkAPI.rejectWithValue('kayıt başarısız')
        }
    }
    
)
export const getStoreProducts = createAsyncThunk(
  'getStoreProducts',
  async(id:number)=>{
    try {
      return await storeProductService.getStoreProductsById(id);
  } catch (error) {
      return error
  }
  }
)
export const storeProductSlice = createSlice({
    name: 'storeProduct',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
      .addCase(addStoreProduct.fulfilled, (state, action) => {
        state.stores = action.payload
     //   console.log(state.stores.storeproducts.slice(-1))
        state.storeProducts = Object.assign(state.stores.storeproducts)
      })
      .addCase(getStoreProducts.fulfilled, (state, action) => {
         state.stores = action.payload
     //   console.log(Object.values(stores))
        const storeArray = Object.values(state.stores)
     //   console.log(storeArray);

        state.stores.forEach((element:any) => {
       //   console.log(element.storeproducts)
          state.storeProducts = element.storeproducts
         // console.log(state.storeProducts)
        });
        
        
      })
      
    },
});

export default storeProductSlice.reducer;
