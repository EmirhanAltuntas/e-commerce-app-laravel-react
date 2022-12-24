import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap'
import { register, reset } from '../../Features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RegisterUser } from '../../Models/RegisterUser.interface';
import alertify from 'alertifyjs'
import { ResponseModel } from '../../Models/ResponseModel';
import { useFormik } from 'formik';
import { registerSchema } from '../../schemas';
import ErrorMessage from '../../Components/ErrorMessage';
import Loading from '../../Components/Loading';



export default function Register() {

  const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues: {
      name:'',
      email: '',
      password:''
    },
    onSubmit:values=>{
      dispatch(register(values))
    },
    validationSchema:registerSchema
  })
  const dispatch = useAppDispatch();
  const {isLoading,isSuccess,status,message} = useAppSelector((state)=>state.auth);
  const navigate = useNavigate();



  useEffect(()=>{
    if (status=="success") {
      alertify.success(message)
      dispatch(reset());
      navigate('/login')

    }
    else if(status=='error') {
     
      const messages = Object.values(message);
    

      messages.forEach(element => {
        console.log(element)
        alertify.error(element[0]);
      });
     
      dispatch(reset());
    }
  },[status,message,dispatch])

  return (
    <div>
      <form autoComplete='off' onSubmit={handleSubmit}>
      <Container>
       
       <Row style={{ marginTop: '3%' }} >
      
         <Col className='d-flex justify-content-center col-md-8 offset-md-2'>
           <Card style={{ width: '100%' ,border:'none'}} >
             
               <Row>
                 <Col className='text-center p-3'>
                 <h4>Lütfen Kayıt Olun</h4>
                 {isLoading && isLoading==true ? <Loading/> :''}
                 </Col>
               </Row>
             <CardBody >
           <div className='row'>
             {/* <Col md='6' ><img className="img-fluid" style={{ objectFit:'cover' ,width:'400px'}} src={securtiy}></img></Col> */}
             <div  className='col-md-8 offset-md-2 align-self-center'>

         <div className="form-floating align-self-center">
           <Input onChange={handleChange} value={values.name} onBlur={handleBlur} type="text" className="form-control " id="floatingName" placeholder="kullanıcı adı" name='name' pattern="[^\s]*"/>
           <Label forhtml="floatingName">İsim</Label>
           {errors.name && touched.name && <ErrorMessage text={errors.name}/>}
         </div>
           <div className="form-floating align-self-center mt-2">
           <Input onChange={handleChange} value={values.email} onBlur={handleBlur} type="email" className="form-control " id="floatingInput" placeholder="name@example.com" name='email' pattern="[^\s]*"/>
           <Label forhtml="floatingInput">E-posta</Label>
           {errors.email && touched.email && <ErrorMessage text={errors.email}/>}
         </div>
         <div className="form-floating mt-2">
           <Input onChange={handleChange} value={values.password} onBlur={handleBlur} type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' pattern="[^\s]*"/>
           <Label forhtml="floatingPassword">Parola</Label>
           {errors.password && touched.password && <ErrorMessage text={errors.password}/>}
         </div>
         <Row>
                 <Col md='12' className='d-flex justify-content-center mt-3'><Button type='submit' disabled={isLoading} className='w-50 shadow' color='primary'>Kayıt Ol</Button></Col>
               </Row>
         </div>
           </div>

             </CardBody>
           </Card>
         </Col>
       </Row>
     </Container>
      </form>
    </div>
  )
}
