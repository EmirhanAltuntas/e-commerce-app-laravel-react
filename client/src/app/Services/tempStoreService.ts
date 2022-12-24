import axios from "axios";
import { AddCategory } from "../Models/AddCategory";
import { AddTempStore } from "../Models/AddTempStore";
import { Category } from "../Models/Category";
import { TempStore } from "../Models/TempStore";

var endpoint = process.env.REACT_APP_BASE_URL_ENDPOINT;

const addTempStore = async(addTempStore:AddTempStore):Promise<TempStore|null>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
    console.log(jwt)
    const response = await axios({
        url:`${endpoint}/tempstore`,
        method:'post',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
        data:addTempStore
    } )
    return response.data;
}
const getTempStores = async():Promise<TempStore|null>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
    const response = await axios({
        url:`${endpoint}/tempstores`,
        method:'get',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
        data:addTempStore
    } )
    return response.data;
  
}
const deleteTempStore = async(id:number):Promise<object>=>{

    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
    const response = await axios({
        url:`${endpoint}/tempstore/${id}`,
        method:'delete',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
        data:id
    } )
    return response.data;
}

const tempStoreService = {
    addTempStore,
    getTempStores,
    deleteTempStore
}

export default tempStoreService;