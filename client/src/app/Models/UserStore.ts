import { ProductImage } from "./ProductImage";

export interface UserStore{
    id:any,
    store_name:string,
    tax_number:string,
    tel_number:string,
    photos:ProductImage[];
}