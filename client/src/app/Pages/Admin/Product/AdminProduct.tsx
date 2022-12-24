import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { Alert, Button, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap'
import EmptyListMessage from '../../../Components/EmptyListMessage';
import Loading from '../../../Components/Loading';
import ProductList from '../../../Components/ProductList';
import { addProduct } from '../../../Features/product/productSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { AddProduct } from '../../../Models/AddProduct';
import { SubCategory } from '../../../Models/SubCategory'; 
import styles from './adminProduct.module.css'
function AdminProduct() {
  const [addProductModal, setAddProductModal] = useState(false);
  const [product, setProduct] = useState<any>({ sub_category_id: 0, product_name: "", description: "" })
  const subCategories = useAppSelector(state => state.subCategoryReducer.subCategories);
  const dispatch = useAppDispatch()
  const toggle = () => setAddProductModal(!addProductModal);

  const tempArr: any = [];
  const [images, setImages] = useState<any[]>([]);

  const onDrop = useCallback((acceptedFiles: any, rejectFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()
      reader.onload = () => {
        const obje = {
          source: reader.result,
          file: file
        }
      //  console.log(obje)
        setImages((prevState: any) => [...prevState, obje])
       // console.log(file)
      }

      reader.readAsDataURL(file)
    });

  }, [])
  const products: any= useAppSelector(state => state.productReducer.products)
  const {isLoading} = useAppSelector(state => state.productReducer)
  // console.log(images)
  for (let i = 0; i < images.length; i++) {
    const dataImages = {
      image_path: images[i].source,
    }
    tempArr.push(dataImages);

    //console.log(tempArr)

  }
  //console.log(product);
 // console.log(images[0]?.source)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, maxFiles: 3, accept: {
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpd'],
      'image/png': ['.png']
    }
  });

  const initFetch = useCallback(() => {

  }, [dispatch, images])
  useEffect(() => {
    initFetch()
  }, [initFetch])


  const indexArttır = (item: any) => {

    const fromIndex = images.indexOf(item); // 👉️ 0
    const toIndex = fromIndex + 1;

    const element = images.splice(fromIndex, 1)[0];


    images.splice(toIndex, 0, element);


    setImages([...images])
    // console.log("index :", toIndex, element);


  }
  const indexAzalt = (item: any) => {

    const fromIndex = images.indexOf(item); //  0
    const toIndex = fromIndex - 1;

    const element = images.splice(fromIndex, 1)[0];
    // console.log("index :", toIndex,element);


    images.splice(toIndex, 0, element);


    setImages([...images])


  }
  const onChangeHandler = (e: any) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const myid = parseInt(el.getAttribute('id'));
    const name = e.target.name
    setProduct({ ...product, [name]: myid });

  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

  };

  function saveProduct() {
  // console.log('fonksiyon çalıştı')
    const formData = new FormData();
    formData.append('product_name', product.product_name);
    formData.append('sub_category_id', product.sub_category_id);
    formData.append('description', product.description);
    images.forEach(img => {
      formData.append("imagePath[]", img.file)
  //    console.log(img)
    })


    dispatch(addProduct(formData)).then(r => {
  //    console.log(r);
      setImages([]);
      toggle();
    })
      ;
  }


 
  return (
    <Container>
    
      <Row>
        <Col md='12' className='text-center'>
        <Row className={`${styles.header} mb-2`}>
        <Col className='p-1'>
          Ürün Ekle Sil
        </Col>
      </Row>
          <Row className='mt-3'>
            <Col >    <Button color="primary" onClick={toggle}>Ürün Ekle</Button>
              <Modal size='lg' isOpen={addProductModal} toggle={toggle} centered={true} >
                <ModalHeader toggle={toggle}>Ürün Ekle</ModalHeader>
                <ModalBody>
                {isLoading && isLoading==true ? <Loading/> :''}
                  <Row>
                    <Col>
                    {
                      subCategories && subCategories.length>0 ?
                      <select name="sub_category_id" onChange={onChangeHandler} className="w-100 form-select ">
                        <option>Bir kategori seçin</option>
                        {
                          subCategories &&  subCategories.map((data: SubCategory) => (
                            <option id={data.id} key={data.id}>{data.sub_name}</option>
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
                        id="product_name"
                        required
                        placeholder='ürün ismi girin'
                        onChange={handleInputChange}
                        name="product_name"
                      />
                    </Col>
                  </Row>
                  <Row className='mt-2'>
                    <Col>
                      <Input
                        type="textarea"
                        className="form-control"
                        id="description"
                        required
                        placeholder='açıklama girin'
                        onChange={handleInputChange}
                        name="description"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Container>
                     
                        <Row className='mt-3 '>
                          <Col md='5' className='text-center d-flex justify-content-center'>
                            <div className={styles.dropzone} {...getRootProps()}>
                              <Input {...getInputProps()}></Input>
                              <p>{isDragActive ? 'Bırakabilirsin' : 'Görsel sürükleyin veya seçin(.png  .jpeg .jpg)'}</p>
                            </div>
                          </Col>
                          <Col md="7" >
                            <Row>
                              {
                                images.length > 0 &&
                                <Col>
                                  <ul>
                                    {
                                      images.map((image, index) => (
                                        <li key={index}>{index}{index == 0
                                          ? <div>
                                            <img className={styles.selectedimages1} src={image.source} key={index}></img><br></br>

                                          </div>
                                          : index === 1 ?
                                            <div className='text-center'>
                                              <img className={styles.selectedimages} src={image.source} key={index}></img> <br></br>

                                              <button className='btn btn-primary m-1' onClick={() => indexArttır(image)}>ileri</button>
                                              <button className='btn btn-warning' onClick={() => indexAzalt(image)}>geri</button>
                                            </div>

                                            : <div className='text-center'>
                                              <img className={styles.selectedimages} src={image.source} key={index}></img> <br></br>
                                              <button className='btn btn-warning m-1' onClick={() => indexAzalt(image)}>geri</button>
                                            </div>}

                                        </li>

                                      ))
                                    }
                                  </ul>
                                </Col>


                              }
                            </Row>

                          </Col>
                        </Row>

                      </Container>

                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" disabled={isLoading} onClick={() => saveProduct()}>
                    Ekle
                  </Button>{' '}
                  <Button color="secondary" onClick={toggle}>
                    İptal
                  </Button>
                </ModalFooter>
              </Modal>   </Col>

          </Row>
          <Row className='mt-3'>
            <Col>
              {
                <ProductList></ProductList>
              }

            </Col>
          </Row>

        </Col>
      </Row>

    </Container>
  )
}

export default AdminProduct