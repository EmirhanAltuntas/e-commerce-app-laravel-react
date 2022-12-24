import axios from "axios";
import { AddCategory } from "../Models/AddCategory";
import { Category } from "../Models/Category";

var endpoint = process.env.REACT_APP_BASE_URL_ENDPOINT;

const addCategory = async(addCategory:AddCategory):Promise<Category|null>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
    console.log(jwt)
    const response = await axios({
        url:`${endpoint}/category`,
        method:'post',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
        data:addCategory
    } )
    return response.data;
}
const getCategories = async():Promise<Category|null>=>{
   
    const response = await axios.get(`${endpoint}/categories`)
 //   console.log(response)
    return response.data;
  
}

const categoryService = {
    addCategory,
    getCategories
}

export default categoryService;