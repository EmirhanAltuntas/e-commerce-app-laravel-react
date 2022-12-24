import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Table, Alert} from 'reactstrap';
import { getProducts } from '../Features/product/productSlice';
import { getSubCategories } from '../Features/subCategory/subCategorySlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Product } from '../Models/Product';
import EmptyListMessage from './EmptyListMessage';


export default function ProductList() {
    const [modal, setModal] = useState(false);
    const products:any = useAppSelector(state=>state.productReducer.products)
    const toggle = () => setModal(!modal);
 //   console.log(products)
    const dispatch = useAppDispatch();

    const initFetch = useCallback(() => {
      dispatch(getProducts());
      dispatch(getSubCategories());
    }, [dispatch])
    useEffect(() => {
      initFetch()
    }, [initFetch])


    return (
        <div> 
          {
            products && products.length>0 ?
             <Table className='border'>
                <thead>
                    <tr>

                        <th>
                            Ürün
                        </th>
                        <th>
                            Açıklama
                        </th>

                        <th>
                            Görseller
                        </th>
                        <th>
                            İşlem
                        </th>
                    </tr>
                </thead>
                
                
               
                <tbody>
                {
                 products &&  products.map((product:any)=>(
                  <tr key={product.id}>
                    <td>{product.product_name}</td>
                    <td>{product.description}</td>
                    <td>{product.photos && product.photos.map((image:any)=>(
                      <img  width={50}  src={ "http://127.0.0.1:8000/product_images/" + image.image_path}></img>
                    ))}
                    </td>         
                    <td><button className='btn btn-warning btn-sm' onClick={toggle}>Düzenle</button> <button className='btn btn-danger btn-sm'>Sil</button></td>
                  </tr>
                 ))
                
              }
              
                </tbody>
              
  
            </Table>
            : 
            <EmptyListMessage text={'Liste boş. Ekleme yapın ya da sunucunuzu kontrol edin.'}/>
          }
           



          <Modal isOpen={modal} toggle={toggle} centered={true} >
        <ModalHeader toggle={toggle}>Ürün Güncelle Sil</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
        </div>
    )
}
