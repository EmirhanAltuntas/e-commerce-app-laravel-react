import { Photo } from "./Photo";
import { StoreProducts } from "./StoreProducts";

export interface ProductDetail{
    id:number,
    product_name:string,
    description:string,
    storeproducts: StoreProducts[];
    photos:Photo[]
}