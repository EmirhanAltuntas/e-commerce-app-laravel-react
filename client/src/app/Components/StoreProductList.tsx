import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Alert, Button, Table } from 'reactstrap'
import { getStoreProducts } from '../Features/storeProduct/storeProductSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import EmptyListMessage from './EmptyListMessage';

function StoreProductList() {

    const storeProducts = useAppSelector(state=>state.storeProductReducer.storeProducts);
    const user = useAppSelector(state=>state.auth.user);

    const dispatch = useAppDispatch();
    console.log(storeProducts?storeProducts:"")

    const initFetch = useCallback(() => {
        dispatch(getStoreProducts(user?.store_id));
      }, [dispatch])
      useEffect(() => {
        initFetch()
      }, [initFetch])
   
    
      const css = 
      `
        tr{
          text-align:center;
        }
        .scroll-table-container {
          overflow-y: auto;
          overflow-x:hidden;
          }
          .scroll-table, td, th {
   
          vertical-align:middle;
  
        }
        .scroll-table, th,td {
  
          border:1px solid rgb(210,210,210); 
  
  
        }`
  return (
    <div>
      <style>{css}</style>
        {
            storeProducts&& storeProducts.length>0 ? <Table>
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  Ürün İsmi
                </th>
                <th>
                  Açıklama
                </th>
                <th>
                  Fiyat
                </th>
                <th>
                  Stok
                </th>
                <th>
                  Görseller
                </th>
                {
                  user && user.user_level ==3 ?  <th>
                  İşlem
                </th> : ""
                }
              </tr>
            </thead>
            <tbody>
              {
               storeProducts.map((storeproduct:any,index:number)=>(
                  <tr key={storeproduct.id}>
                  <th scope="row">
                 {index+1}
                  </th>
                  <td>
                  {storeproduct.product_name}
                  </td>
                  <td>
                  {storeproduct.description}
                  </td>
                  <td>
                   {storeproduct.pivot.price}
                  </td>
                  <td>
                   {storeproduct.pivot.stock}
                  </td>
                  <td>{storeproduct.photos.map((image:any)=>(
                      <img width={50} src={ "http://127.0.0.1:8000/product_images/" + image.image_path}></img>
                    ))}
                    </td>
                    {
                  user && user.user_level ==3 ?  <td>
                  <Button>Güncelle</Button>
                </td> : ""
                }
                </tr>
                ))
              }
             
            </tbody>
          </Table>
          : <EmptyListMessage text={'Liste boş. Ekleme yapın ya da sunucunuzu kontrol edin.'}/>
        }
         
    </div>
  )
}

export default StoreProductList