import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container,Row,Col, Button, Card, CardBody, Input, Label,Collapse,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ErrorMessage from '../Components/ErrorMessage';
import Loading from '../Components/Loading';
import { addTempStore, getTempStore } from '../Features/tempStores/tempStoreSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { AddTempStore } from '../Models/AddTempStore';
import { tempStoreSchema } from '../schemas';



function StoreRegister() {
  const user = useAppSelector(state=>state.auth.user);
  const {isLoading,} = useAppSelector((state)=>state.tempStore);

  const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues: {
      store_name:'',
      tel_number: '',
      tax_number:'',
      status:false,
      user_id:user.user_id
    },
    onSubmit:values=>{
      dispatch(addTempStore(values)).then(r=>{

        navigate('/');
        
      })
    },
    validationSchema:tempStoreSchema
  })

  const dispatch = useAppDispatch();
 
  const [modal, setModal] = useState(false);
  var [check, setcheck] = useState<boolean>(false);
  var [disable, setDisable] = useState<boolean>(true);

  const toggle = () => setModal(!modal);
  const checkk = () => setcheck(!false);
  const navigate = useNavigate();
 const handleInputCheck = (e:React.ChangeEvent<HTMLInputElement>)=>{
  check = e.target.checked
  console.log(check)
  setcheck(check)
  console.log(check)
 }

  return (
      <form autoComplete='off' onSubmit={handleSubmit}>
            <Container>
    <Row className='mt-4'>
              <Col className='text-center p-3'>
              <h4>Mağaza Kayıt</h4>
              {isLoading && isLoading==true ? <Loading/> :''}
              </Col>
   </Row>

    <Row >
   
      <Col className='d-flex justify-content-center'>
        <Card style={{ border:'none'}}>
          
         
          <CardBody style={{ width:'24rem'}}>
        <Row>
          <Col className='align-self-center'>

      <div className="form-floating align-self-center">
        <Input onChange={handleChange} value={values.store_name} onBlur={handleBlur} type="text" className="form-control " id="floatingName1" placeholder="mağaza adı" name='store_name' pattern="[^\s]*"/>
        <Label forhtml="floatingName1">Mağaza Adı :</Label>
        {errors.store_name && touched.store_name && <ErrorMessage text={errors.store_name}/>}
      </div>
      <div className="form-floating align-self-center mt-3">
        <Input  onChange={handleChange} value={values.tax_number} onBlur={handleBlur} type="text" className="form-control " id="floatingName2" placeholder="vergi no" name='tax_number' pattern="[^\s]*"/>
        <Label forhtml="floatingName2">Vergi No :</Label>
        {errors.tax_number && touched.tax_number && <ErrorMessage text={errors.tax_number}/>}
      </div>
      <div className="form-floating align-self-center mt-3">
        <Input  onChange={handleChange} value={values.tel_number} onBlur={handleBlur} type="text" className="form-control " id="floatingName4" placeholder="tel no" name='tel_number' pattern="[^\s]*"/>
        <Label forhtml="floatingName4">Tel No :</Label>
        {errors.tel_number && touched.tel_number && <ErrorMessage text={errors.tel_number}/>}
      </div>
      <div className="form-floating align-self-center mt-3">
        <Row>
          <Col xs='3' className='d-flex justify-content-center'><Input onChange={handleInputCheck} onClick={checkk} type="checkbox" id="floatingName5" aria-label="Checkbox for following text input"/></Col>
          <Col xs='9'> <Label forhtml="floatingName5"><span onClick={toggle} style={{color:'steelblue'}}>sözleşmeyi</span> okudum, onaylıyorum.</Label></Col>
        </Row>

     
    </div>
    <div className="form-floating align-self-center mt-3">
    <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Mağaza Açma Sözleşmesi
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>

          <Button color="secondary" onClick={toggle}  >
            Kapat
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  

      <Row>
              <Col md='12' className='d-flex justify-content-center mt-3'><Button  disabled={isLoading} type="submit" className='w-50 shadow' color='primary'>Kaydet</Button></Col>
      </Row>
      </Col>
        </Row>

          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
      </form>
  )
}

export default StoreRegister