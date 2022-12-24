import { Jwt } from "./Jwt";

export interface LoginResponseModel{
    success:boolean,
    status:string,
    message:string,
    data :Jwt
}