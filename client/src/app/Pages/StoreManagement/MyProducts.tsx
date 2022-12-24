import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Alert, Button, Col, Input, Label, Row, Table } from 'reactstrap'
import StoreProductList from '../../Components/StoreProductList';
import  {getProducts}  from '../../Features/product/productSlice';
import { addStoreProduct } from '../../Features/storeProduct/storeProductSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AddStoreProduct } from '../../Models/AddStoreProduct';

function MyProducts() {


  const products = useAppSelector(state=>state.productReducer.products);
  const user = useAppSelector(state=>state.auth.user);
  const dispatch = useAppDispatch();

  const [storeProduct,setStoreProduct] = useState<AddStoreProduct>({
    store_id:user?user.store_id:"",
    product_id:"",
    price:0,
    stock:0
  });


  const initFetch = useCallback(() => {
    dispatch(getProducts());
  }, [dispatch])
  useEffect(() => {
    initFetch()
  }, [initFetch])

//  console.log(products)
 // console.log(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreProduct({ ...storeProduct, [name]: parseInt(value) });

  };

  const  onChangeHandler = (e:any) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const myid =  parseInt(el.getAttribute('id')) ;
    const name = e.target.name
    setStoreProduct({ ...storeProduct, [name]:myid});

  }
  const saveStoreProduct = ()=>{
    dispatch(addStoreProduct(storeProduct)).then((r:any)=>{
     // console.log(r)
    })
  }
 // console.log(storeProduct);
  const css = 
  `
   .shadow{
    box-shadow:rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px !important;
   }
   .productRow{
    background-color:rgb(245,245,245)
   }
  `

  return (
    <div>
      <style>{css}</style>
      <Row className=''>
        <Col className='text-center shadow productRow'>
          {
            user && user.user_level == 2 ? <h4 className='mt-2'>Ürün Ekle </h4> : <h4 className='mt-2'>Ürün Güncelle </h4>
          }
         
        </Col>

      </Row>
      {
        user && user.user_level == 2 ?  <Row className='text-center p-2 productRow mt-2' >
        <Col>
          <Label>Ürün seç</Label>
          {
              products && products.length>0
               ?     <select name="product_id" onChange={onChangeHandler} className="w-100 form-select ">
              <option>Bir ürün seçin</option>
          {
           products && products.map((data:any)=>(
            <option id={data.id} key={data.id}>{data.product_name}</option>
           ))
          }
          
        </select>
        : <Alert>
            Ürün Listesi Boş.
        </Alert>
             }
        </Col>
        <Col>
          <Label>Fiyat ekle</Label>
          <Input
            type="text"
            className="form-control"
            id="price"
            required
            placeholder='fiyat girin'
            onChange={handleInputChange}
            name="price"
          />
        </Col>
        <Col>
          <Label>Stok Ekle</Label>
          <Input
            type="text"
            className="form-control"
            id="stock"
            required
            placeholder='stock girin'
            onChange={handleInputChange}
            name="stock"
          />
        </Col>
        <Col>
        <Button onClick={()=>saveStoreProduct()} className='w-50' color='primary' style={{margin:"2rem"}}>Ekle</Button>
        </Col>
      </Row>
      : ""
      }
    
      <Row className='mt-5'>
        <Col>
         <StoreProductList></StoreProductList>
        </Col>
      </Row>
    </div>
  )
}

export default MyProducts