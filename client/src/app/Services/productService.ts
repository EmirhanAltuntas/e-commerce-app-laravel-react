import axios from "axios";
import { AddProduct } from "../Models/AddProduct";
import { Product } from "../Models/Product";

var endpoint = process.env.REACT_APP_BASE_URL_ENDPOINT;

const addProduct = async(addProduct:any):Promise<Product|null>=>{
    const token:any = localStorage.getItem('token');
    var jwt:any = JSON.parse(token) ;
    const response = await axios({
        url:`${endpoint}/product`,
        method:'post',
        headers:{
            'Authorization' : 'Bearer ' + jwt,
            'Content-Type': 'multipart/form-data'
        },
        
        data:addProduct
    } )
    return response.data;
}
const getProducts = async():Promise<Product|null>=>{
   
    const response = await axios.get(`${endpoint}/products`)
 //  console.log(response.data)
    return response.data;
  
}
const getAllProducts = async(pageNumber:number,subId:any):Promise<any>=>{
   
    const response = await axios.get(`${endpoint}/all-products?page=${pageNumber}`)

   const arrResponse = Object.values(response.data.data)
    return {
        data:arrResponse,
        links:response.data.links
    };
  
}
const productService = {
    addProduct,
    getProducts,
    getAllProducts
}

export default productService;