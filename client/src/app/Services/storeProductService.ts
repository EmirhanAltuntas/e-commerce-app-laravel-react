import axios from "axios";
import { AddStoreProduct } from "../Models/AddStoreProduct";


var endpoint = process.env.REACT_APP_BASE_URL_ENDPOINT;

const addStoreProduct = async (addStoreProduct: AddStoreProduct): Promise<object | null> => {
    const token: any = localStorage.getItem('token');
    var jwt: any = JSON.parse(token);
    //   console.log(jwt)
    const response = await axios({
        url: `${endpoint}/store-product`,
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + jwt,
            // 'Content-Type': 'multipart/form-data'
        },

        data: addStoreProduct
    })
    return response.data;
}
const getStoreProductsById = async (id: number): Promise<any> => {
    const token: any = localStorage.getItem('token');
    var jwt: any = JSON.parse(token);
    const response = await await axios({

        url: `${endpoint}/store-product/${id}`,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + jwt,

        },


    })
    return response.data;


}
const storeProductService = {
    addStoreProduct,
    getStoreProductsById
}

export default storeProductService;