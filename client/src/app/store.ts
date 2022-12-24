import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './Features/auth/authSlice';
import categoryReducer from './Features/category/categorySlice';
import subCategoryReducer from './Features/subCategory/subCategorySlice';
import productReducer from './Features/product/productSlice';
import tempStore from './Features/tempStores/tempStoreSlice';
import storeReducer from './Features/store/storeSlice';
import storeProductReducer from './Features/storeProduct/storeProductSlice';
import tempEmployeeReducer from './Features/tempEmployee/tempEmployeeSlice';
import employeeReducer from './Features/employee/employeeSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    categoryReducer,
    subCategoryReducer:subCategoryReducer,
    productReducer,
    tempStore,
    storeReducer,
    storeProductReducer,
    tempEmployeeReducer,
    employeeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
