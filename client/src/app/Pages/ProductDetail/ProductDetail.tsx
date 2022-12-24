import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks';
import style from './productDetail.module.css';
function ProductDetail() {
    const {id} = useParams();

    const {productDetail} = useAppSelector(state=>state.productReducer);
    const [index,setIndex] = useState(0);
  var endpoint = 'http://localhost:8000/product_images'
  console.log(productDetail);
  
  return (

    <div className="contaier">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="row p-2  m-1">
            <div className="col-md-6 ">
              <div className="row d-flex justify-content-center">
                <div className={`${style.mainImgDiv} col-md-12  d-flex justify-content-center border-bottom`}><img className={style.mainImg} src={`${endpoint}/${productDetail.photos.length>0 ?productDetail.photos[index].image_path : ''}`} alt="" /></div>
                <div className="col-md-12 mt-2" style={{height:'100px'}}>
                      <div className="row d-flex justify-content-center">
                        {
                          productDetail.photos.length>0 ?productDetail.photos.map((item,index)=>(
                            <div className={`${style.smImgDiv} col-md-4`} onClick={()=>setIndex(index)} >
                              <img  className={style.smImages} src={`${endpoint}/${item.image_path}`} alt="" />
                            </div>
                          )) :''
                        }
                      </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              {
                productDetail.storeproducts.length>0?
                 <div className="row mt-5 text-center" >
                <div className="col-md-12 mt-2 border-bottom">
                  <h6>Satıcı : {productDetail.storeproducts[0].store_name}</h6>
                </div>
                <div className="col-md-12 mt-2">
                  <h4>Ürün : {productDetail.product_name}</h4>
                </div>
                <div className="col-md-12 mt-2">
                  <h5>Fiyat : {productDetail.storeproducts[0].pivot.price} $</h5>
                </div>
                <div className="col-md-12 mt-2">
                  <h6>Açıklama : {productDetail.description}</h6>
                </div>
                <div className="col-md-12 mt-5 mb-5">
                  <div className="btn btn-dark btn-sm">Sepete Ekle</div>
                </div>
              </div>
              :""
              }
             
                  
            </div>
          </div>
        </div>
      </div>
    </div>
   
  )
}

export default ProductDetail