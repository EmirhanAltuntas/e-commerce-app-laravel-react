import axios from "axios";
import { AddCategory } from "../Models/AddCategory";
import { AddTempStore } from "../Models/AddTempStore";
import { Category } from "../Models/Category";
import { ResponseModel } from "../Models/ResponseModel";
import { TempEmployee } from "../Models/TempEmployee";
import { TempStore } from "../Models/TempStore";

var endpoint = process.env.REACT_APP_BASE_URL_ENDPOINT;

const addTempEmployee = async(addTempEmployee:TempEmployee):Promise<any>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
  //  console.log(jwt)
    const response = await axios({
        url:`${endpoint}/temp-employee`,
        method:'post',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
        data:addTempEmployee
    } )
    return response.data;
}
const getTempEmployees = async():Promise<TempEmployee[]>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
   // console.log(jwt)
    const response = await axios({
        url:`${endpoint}/temp-employees`,
        method:'get',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
       
    } )
    return response.data;
}
const getTempEmployeesByStoreId = async(id:number):Promise<ResponseModel>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
   // console.log(jwt)
    const response = await axios({
        url:`${endpoint}/tempemloyees/${id}`,
        method:'get',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
       
    } )
    return {
        data:response.data.data,
        message:response.data.message,
        status:response.data.status,
    };
}
const removeTempEmployee = async(id:number):Promise<any>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
 //   console.log(jwt)
    const response = await axios({
        url:`${endpoint}/tempemloyee/${id}`,
        method:'delete',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
    
    } )
    return response.data;
}

const tempEmployeeService = {
    addTempEmployee,
    getTempEmployees,
   removeTempEmployee,
   getTempEmployeesByStoreId
}

export default tempEmployeeService;