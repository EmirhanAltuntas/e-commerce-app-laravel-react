import axios from "axios";
import { AddSubCategory } from "../Models/AddSubCategory";
import { SubCategory } from "../Models/SubCategory";



var endpoint = process.env.REACT_APP_BASE_URL_ENDPOINT;

const addSubCategory = async(addCategory:AddSubCategory):Promise<SubCategory|null>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
    console.log(jwt)
    const response = await axios({
        url:`${endpoint}/subCategory`,
        method:'post',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
        },
        data:addCategory
    } )
    return response.data;
}
const getSubCategories = async():Promise<SubCategory|null>=>{
   
    const response = await axios.get(`${endpoint}/subcategories`)
    //console.log(response.data)
    return response.data;
  
}

const subCategoryService = {
    addSubCategory,
    getSubCategories
}

export default subCategoryService;