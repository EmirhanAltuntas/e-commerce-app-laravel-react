import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Col, Container, Input, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table ,  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Alert,} from 'reactstrap'
import CategoryList from '../../../Components/CategoryList';
import { AddCategory } from '../../../Models/AddCategory';
import { Category } from '../../../Models/Category';
import {addCategory, getCategories} from '../../../Features/category/categorySlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { AddSubCategory } from '../../../Models/AddSubCategory';
import { addSubCategory } from '../../../Features/subCategory/subCategorySlice';
import alertifty from 'alertifyjs';
import EmptyListMessage from '../../../Components/EmptyListMessage';
import styles from './adminCategory.module.css';
import HeaderInDashboard from '../../../Components/DashBoardHeader/HeaderInDashboard';

function AdminCategory() {
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [addSubCategoryModal, setAddSubCategoryModal] = useState(false);

  const toggle = () => setAddCategoryModal(!addCategoryModal);
  const subtoggle = () => setAddSubCategoryModal(!addSubCategoryModal);
  const dispatch = useAppDispatch();

  const [category,setCategory] = useState<AddCategory>({name:''});
  const [subCategory,setSubCategory] = useState<AddSubCategory>({main_category_id:0,sub_name:""})

  const categories = useAppSelector(state=>state.categoryReducer.categories);

  const initFetch = useCallback(() => {
    dispatch(getCategories());
  }, [dispatch])
  useEffect(() => {
    initFetch()
  }, [initFetch])
 
 const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
   
  };
  const handleInputChangeSub = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubCategory({ ...subCategory, [name]: value });
   
  };
  const  onChangeHandler = (e:any) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const myid =  parseInt(el.getAttribute('id')) ;
    const name = e.target.name
    setSubCategory({ ...subCategory, [name]:myid});

  }
 // console.log(subCategory)
 // console.log(category)

  function saveCategory(){

    dispatch(addCategory(category)).then(r=>{
      alertifty.success(r)

    console.log(r);
    toggle()

    })
    ;
}
function saveSubCategory(){

  dispatch(addSubCategory(subCategory)).then(r=>{
    
  })
  ;
}


  return (
    <Container>
      <Row>
        <Col md='12' className='text-center'>

          <HeaderInDashboard title={'Kategori Ekle-Sil'}/>

          <Row className='mt-3'>
            <Col md="6">    <Button color="primary" onClick={toggle}>Kategori Ekle</Button>  
               <Modal isOpen={addCategoryModal} toggle={toggle} centered={true}>
                <ModalHeader toggle={toggle}>Kategori Ekle</ModalHeader>
                <ModalBody>

                <InputGroup>
                <Input type='text' name='name' placeholder="kategori ismi girin" onChange={handleInputChange} />
              </InputGroup>

                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={()=>saveCategory()}>
                    Ekle
                  </Button>{' '}
                  <Button color="secondary" onClick={toggle}>
                    İptal
                  </Button>
                </ModalFooter>
              </Modal>   </Col>
              <Col md="6">    <Button color="primary" onClick={subtoggle}>Alt Kategori Ekle</Button>  
               <Modal isOpen={addSubCategoryModal} toggle={subtoggle} centered={true}>
                <ModalHeader toggle={subtoggle}>Alt Kategori Ekle</ModalHeader>
                <ModalBody>
                <Row>
                  <Col>
             {
              categories && categories.length>0
               ?     <select name="main_category_id" onChange={onChangeHandler} className="w-100 form-select ">
              <option>Bir kategori seçin</option>
          {
           categories && categories.map((data:any)=>(
            <option id={data.id} key={data.id}>{data.name}</option>
           ))
          }
          
        </select>
        :  <EmptyListMessage text={'Liste boş. Ekleme yapın ya da sunucunuzu kontrol edin.'}/>
             }
              
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                  <Input
              type="text"
              className="form-control"
              id="sub_name"
              required
              placeholder='alt kategori ismi girin'
              onChange={handleInputChangeSub}
              name="sub_name"
            />
                  </Col>
                </Row>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={()=>saveSubCategory()}>
                    Ekle
                  </Button>{' '}
                  <Button color="secondary" onClick={subtoggle}>
                    İptal
                  </Button>
                </ModalFooter>
              </Modal>   </Col>

          </Row>
          
          <Row className='mt-3'>
            <Col>
                <CategoryList></CategoryList>
            </Col>
          </Row>

        </Col>
      </Row>

    </Container>
  )
}

export default AdminCategory