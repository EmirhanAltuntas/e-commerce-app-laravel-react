import React, { useEffect,useState } from 'react'
import { Container } from 'reactstrap'
import HeaderInDashboard from '../../../Components/DashBoardHeader/HeaderInDashboard'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getProducts } from '../../../Features/product/productSlice';
import ExportExcel from './ExportExcel';
import { getCategories } from '../../../Features/category/categorySlice';
import { getSubCategories } from '../../../Features/subCategory/subCategorySlice';
import alertify from 'alertifyjs';
import ImportExcel from './ImportExcel';

function DocumentManagement() {

    const {products} = useAppSelector(state=>state.productReducer);
    const {categories} = useAppSelector(state=>state.categoryReducer);
    const {subCategories} = useAppSelector(state=>state.subCategoryReducer);

    const [path,setPath] = useState('');

    const  onChangeHandler = (e:any) => {
      const index = e.target.selectedIndex;
      const el = e.target.childNodes[index]
      const value =  el.getAttribute('value') ;  
      setPath(value)
    }

    const categoriesTemplate = [
        {
            categoryName:''
        }
    ]
    const subCategoriesTemplate = [
      {
        main_category_id:'',
        sub_name:''
      }
    ]
  //  console.log(path);
    
  return (
    <Container>
           <HeaderInDashboard title={'Döküman Yönetimi'}/>
           
           <div className='row border p-2'>
                <div className='col-md-4'>
                <HeaderInDashboard title={'Ürünler'}/>
                <ExportExcel excelData={products} fileName={'Ürünler'} request={getProducts()} />
                </div>
                <div className='col-md-4'>
                <HeaderInDashboard title={'Ana Kategoriler'}/>
                  <div className="row">
                    <div className="col-md-12">
                    <ExportExcel excelData={categories} fileName={'Kategoriler'} request={getCategories()} /> 
                    </div>
                    <div className="col-md-12 mt-2">
                    <ExportExcel excelData={categoriesTemplate} fileName={'Kategori şablon'} request={()=>alertify.success('Döküman indirildi.')} />
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                <HeaderInDashboard title={'Alt Kategoriler'}/>
                <div className="row">
                    <div className="col-md-12">
                    <ExportExcel excelData={subCategories} fileName={'Alt Kategoriler'} request={getSubCategories()} />
                    </div>
                    <div className="col-md-12 mt-2">
                    <ExportExcel excelData={subCategoriesTemplate} fileName={'Alt Kategori şablon'} request={()=>alertify.success('Döküman indirildi.')} />
                    </div>
                  </div>
              
                </div>
           </div>
            <div className="row mt-4 border">
              <div className="col-md-12  p-2">
                <div className="row">
                  <div className="col-md-4 offset-md-4">
                  <select name="" id="" onChange={onChangeHandler} className="w-100 form-select ">
                          <option value="">Bir tablo seçin</option>
                          <option value='multiCategory'>Ana Kategori</option>
                          <option value='multiSubCategory'>Alt Kategori</option>
                        </select>
                  </div>
                </div>
                  <div className="row mt-2">
                  <div className="col-md-12">
                    <ImportExcel end_point={path}/>
                    </div>
                   
                  
                  </div>
            
              </div>
            </div>
      </Container>
  )
}

export default DocumentManagement