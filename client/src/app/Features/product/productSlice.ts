import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddProduct } from "../../Models/AddProduct";
import { ProductDetail } from "../../Models/ProductDetail";
import productService from "../../Services/productService";


export interface ProductState {
    products:any,
    homeProducts:any,
    links:any,
    productsCount:number,
    isLoading:boolean,
    productDetail:ProductDetail
  }
  const initialState:ProductState = {
    products:[],
    homeProducts:[],
    links:[],
    productsCount:0,
    isLoading:false,
    productDetail:{
      id:0,
      product_name:'',
      description:'',
      storeproducts: [],
      photos:[]
    }
}

export const addProduct = createAsyncThunk(
    'addproduct',
    async(addProduct:any,thunkAPI)=>{
        try {
            return await productService.addProduct(addProduct);
        } catch (error) {
            return thunkAPI.rejectWithValue('kayıt başarısız')
        }
    }
    
)
export const getProducts = createAsyncThunk(
  'getProducts',
  async()=>{
    try {
      return await productService.getProducts();
  } catch (error) {
      return error
  }
  }
)
export const getHomePageProducts = createAsyncThunk(
  'getHomePageProducts',
  async(pageNumber:any,subId:any)=>{
    try {
      return await productService.getAllProducts(pageNumber,subId);
  } catch (error) {
      return error
  }
  }
)
export const addProductDetail = createAsyncThunk(
  'addProductDetail',
  async(product:any)=>{
    try {
      return product;
  } catch (error) {
      return error
  }
  }
)


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
      .addCase(addProduct.pending, (state, action) => {
        state.isLoading=true
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload)
        state.isLoading=false
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.products.push(action.payload)
        state.isLoading=false
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.productsCount = state.products.length || 0;
        
      })
      .addCase(getHomePageProducts.fulfilled, (state, action) => {
        state.homeProducts = action.payload.data
        state.links = action.payload.links
      })
      .addCase(addProductDetail.fulfilled,(state,action)=>{
        state.productDetail = action.payload;
        console.log(state.productDetail);
        
      })
    },
});

export default productSlice.reducer;
