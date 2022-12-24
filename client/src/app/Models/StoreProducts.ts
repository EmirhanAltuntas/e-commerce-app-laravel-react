export interface StoreProducts{
    id: number,
    store_name: string,
    tax_number: string,
    tel_number: string,
    pivot: {
      product_id: number,
      store_id: number,
      price: number,
      stock: number
    }
}