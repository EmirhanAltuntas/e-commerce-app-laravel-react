import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap'

import jwt_decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../Models/LoginUser';
import { login, reset } from '../../Features/auth/authSlice';
import { DecodedJwt } from '../../Models/DecodedJwt';

import alertify from 'alertifyjs';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas';
import ErrorMessage from '../../Components/ErrorMessage';
import Loading from '../../Components/Loading';


export default function Login() {

  const [userlevel,setUserlevel]=useState<number>(0);

  const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues: {
      email: '',
      password:''
    },
    onSubmit:values=>{
      dispatch(login(values))
      .then(r=>{
      
        try {
        var token = localStorage.getItem('token');
        var decoded:DecodedJwt =jwt_decode(token?token:"")
       
        var sayi:number = +decoded.user_level
        
       
        setUserlevel(sayi);
        } catch (error) {
  
        alertify.error(r.payload)
       // console.log(status)
    }
    
       
      })
     
    },
    validationSchema:loginSchema
  });
  
  const dispatch = useAppDispatch();
  const {isLoading,isSuccess,jwt,message,status} = useAppSelector((state)=>state.auth); 
  const navigate = useNavigate();
  

useEffect(()=>{

  if (status=="error") {
    const messages = Object.values(message);
    

    messages.forEach(element => {
    //  console.log(element)
      alertify.error(element[0]);
    });
   
    dispatch(reset());
  
  }
 else if (status=="success" && userlevel==1) {
   // console.log(message)
    alertify.success(message);
    
    navigate('/statistics')
    dispatch(reset());
  
  }
 else if (isSuccess && userlevel==4) {
  alertify.success(message);
    dispatch(reset());
    navigate('/')
  
  }
  else if (isSuccess && userlevel==2) {
    alertify.success(message);
    dispatch(reset());
    navigate('/store-management/my-products')
  
  }
   else if (isSuccess && userlevel==3) {
    alertify.success(message);
    dispatch(reset());
    navigate('/store-management/my-products')
  
  }
},[isSuccess,userlevel,dispatch])

  return (
    <div>
      <form autoComplete='off' onSubmit={handleSubmit}>
      <Container>
        <Row >
          <Col className='d-flex justify-content-center'>
            <Card style={{ width: 'auto' ,border:'none'}} className='m-5'>
            
            <Row>
                  <Col className='text-center p-3'>                  
                  <h4>Lütfen Giriş Yapın</h4>
                  {isLoading && isLoading==true ? <Loading/> :''}
                  </Col>
                </Row>
              <CardBody >
            <Row>
             
              {/* <Col md='6' ><img className="img-fluid" style={{ objectFit:'cover' ,width:'325px'}} src={securtiy}></img></Col> */}
              <Col className='align-self-center'>
            <div className="form-floating align-self-center">
            <Input onChange={handleChange} value={values.email} onBlur={handleBlur} type="email" className="form-control " name='email' id="floatingInput" placeholder="name@example.com"  pattern="[^\s]*"/>
            <Label forhtml="floatingInput">E-posta</Label>
            {errors.email && touched.email && <ErrorMessage text={errors.email}/> }
          </div>
          <div className="form-floating mt-2">
            <Input onChange={handleChange} value={values.password} type="password" className="form-control" name='password' id="floatingPassword" placeholder="Password"  pattern="[^\s]*"/>
            <Label forhtml="floatingPassword">Parola</Label>
            {errors.password && touched.password && <ErrorMessage text={errors.password}/> }
          </div>
          <Row>
                  <Col md='12' className='d-flex justify-content-center mt-3'><Button className='w-50 shadow' color='primary' type='submit' disabled={isLoading&&isLoading}>Giriş Yap</Button></Col>
                  <Col md='12' className='text-center mt-3'><a>Bir hesabın yok mu ?</a></Col>
                  <Col md='12' className='d-flex justify-content-center mt-3'><Button className='w-50 shadow ' color='primary' onClick={()=>navigate('/register')}>Kayıt Ol</Button></Col>
                </Row>
          </Col>
            </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      </form>
    </div>
  )
}
