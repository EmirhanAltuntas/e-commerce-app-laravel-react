import axios from "axios";
import jwtDecode from "jwt-decode";
import { DisplayUser } from "../Models/DisplayUser.interface";
import { Jwt } from "../Models/Jwt";
import { LoginResponseModel } from "../Models/LoginResponseModel";
import { LoginUser } from "../Models/LoginUser";
import { RegisterUser } from "../Models/RegisterUser.interface";
import { ResponseModel } from "../Models/ResponseModel";

var endpoint = process.env.REACT_APP_BASE_URL_ENDPOINT;

const register = async(registerUser:RegisterUser):
Promise<ResponseModel> =>{

    const response = await axios.post(`${endpoint}/register`,registerUser);
  //  console.log(response.data);
    return response.data
    
}
const login = async(loginUser:LoginUser):
Promise<LoginResponseModel> =>{

    const response = await axios.post(`${endpoint}/login`,loginUser);
 //   console.log(response.data.data.token)
    if(response.data){
        var token:string = response.data.data.token
     //   console.log(token)
        var decoded:any = jwtDecode(token);
        var user:any ={
            user_id:decoded.sub,
            name:decoded.name,
            email:decoded.email,
            user_level:decoded.user_level,
            store_id:decoded.store_id
        }

 
        localStorage.setItem('token',JSON.stringify(response.data.data.token));
       

    }
  //  console.log(response.data.message)
 //   console.log(response.data.message)
    return {
        data:user,
        status:response.data.status,
        message:response.data.message,
        success:response.data.success
    };
}

const logout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

const authService = {
 register,
 login,
 logout
} 

export default authService;