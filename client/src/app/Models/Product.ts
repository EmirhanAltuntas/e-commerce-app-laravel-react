import { ProductImage } from "./ProductImage";

export interface Product{
    id:any,
    name:string,
    description:string,
    sub_category_id:number,
    photos:ProductImage[]
}