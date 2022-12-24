import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { AddCategory } from "../Models/AddCategory";
import { AddStore } from "../Models/AddStore";
import { AddTempStore } from "../Models/AddTempStore";
import { Category } from "../Models/Category";
import { TempStore } from "../Models/TempStore";

var endpoint = process.env.REACT_APP_BASE_URL_ENDPOINT;


const addStore = async(addStore:AddStore):Promise<any|null>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
    console.log(jwt)
    const response = await axios({
        url:`${endpoint}/store`,
        method:'post',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
        data:addStore
    } )
    return response.data;
}


const getStores = async():Promise<Store|null>=>{
   const token:any = localStorage.getItem('token');
   var jwt:any = JSON.parse(token) ;
    const response = await axios({
        url:`${endpoint}/stores`,
        method:'get',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
       // data:addTempStore
    } )
    return response.data;
  
}
const getStoreById = async(store_id:any):Promise<any>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
     const response = await axios({
         url:`${endpoint}/store/${store_id}`,
         method:'get',
         headers:{
             'Authorization' : 'Bearer ' + jwt,
         },
        // data:addTempStore
     } )
     return response.data;
   
}

const storeService = {
    addStore,
    getStores,
    getStoreById
}

export default storeService;