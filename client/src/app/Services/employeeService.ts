import axios from "axios";
import { AddCategory } from "../Models/AddCategory";
import { AddTempStore } from "../Models/AddTempStore";
import { Category } from "../Models/Category";
import { ResponseModel } from "../Models/ResponseModel";
import { TempEmployee } from "../Models/TempEmployee";
import { TempStore } from "../Models/TempStore";

var endpoint = process.env.REACT_APP_BASE_URL_ENDPOINT;

const addEmployee = async(addTempEmployee:TempEmployee):Promise<any>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;

    const response = await axios({
        url:`${endpoint}/add-employee`,
        method:'post',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
        data:addTempEmployee
    } )
    return response.data;
}
const getEmployeesById = async(id:number):Promise<ResponseModel>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
  
    const response = await axios({
        url:`${endpoint}/store-employees/${id}`,
        method:'get',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
       
    } )
    console.log(response.data)
    return {
        data:Object.values(response.data.data),
        message:response.data.message,
        status:response.data.status
    };
}

const employeeService = {
    addEmployee,
    getEmployeesById,
   // deleteTempStore
}

export default employeeService;