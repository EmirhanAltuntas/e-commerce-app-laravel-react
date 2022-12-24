import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Table, Alert} from 'reactstrap';
import { getCategories } from '../Features/category/categorySlice';
import { getSubCategories } from '../Features/subCategory/subCategorySlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Category } from '../Models/Category';
import { SubCategory } from '../Models/SubCategory';
import EmptyListMessage from './EmptyListMessage';


export default function CategoryList() {
    const [modal, setModal] = useState(false);
    const categories = useAppSelector(state=>state.categoryReducer.categories);
    const subCategories = useAppSelector(state=>state.subCategoryReducer.subCategories);
    const dispatch = useAppDispatch();


    
    const initFetch = useCallback(() => {
        dispatch(getSubCategories());
        dispatch(getCategories());
      }, [dispatch])
      useEffect(() => {
        initFetch()
      }, [initFetch])

  //  console.log(categories)
  //  console.log(subCategories)
  
  const mergeById = (a1:any, a2:any) =>
  a2.map((itm:any) => ({
    ...a1.find((item:any) => item.id === itm.main_category_id && item),
    ...itm,
  }));

  const lastCategories = mergeById(categories.length>0?categories:[],subCategories.length>0? subCategories:[]);


    const toggle = () => setModal(!modal);
    return (
        <div>
          {
            categories && subCategories && subCategories.length>0 ?
            <Table className='border'>
                <thead>
                    <tr>
                        <th>
                            Ana Kategori
                        </th>
                        <th>
                            Alt Kategori
                        </th>
                        <th>
                            İşlem
                        </th>
                    </tr>
                </thead>
                <tbody>
              {
                 lastCategories && lastCategories.map((category:any)=>(
                  <tr>
                    <td>{category.name}</td>
                    <td>{category.sub_name}</td>             
                    <td><button className='btn btn-warning btn-sm' onClick={toggle}>Düzenle</button> <button className='btn btn-danger btn-sm'>Sil</button></td>
                  </tr>
                 ))
              }

                </tbody>
            </Table>
            :  <EmptyListMessage text={'Liste boş. Ekleme yapın ya da sunucunuzu kontrol edin.'}/>
          }
            


            <Modal isOpen={modal} toggle={toggle} centered={true} >
        <ModalHeader toggle={toggle}>Kategori Güncelle-Sil</ModalHeader>
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
