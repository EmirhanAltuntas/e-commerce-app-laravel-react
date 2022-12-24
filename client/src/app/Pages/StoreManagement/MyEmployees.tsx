import React, { useState } from 'react'
import { Button, Col, Container, Input, Label, Row } from 'reactstrap'
import MyTempEmployeeList from '../../Components/MyTempEmployeeList';
import MyEmployeeList from '../../Components/MyEmployeesList'
import { addTempEmployee } from '../../Features/tempEmployee/tempEmployeeSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { TempEmployee } from '../../Models/TempEmployee';

function MyEmployees() {

  const store = useAppSelector(state=>state.storeReducer.store);
  const [tempEmployee,setTempEmployee] = useState<TempEmployee>({store_id:store.id?store.id:"",store_name:store.store_name?store.store_name:"",email:""});
  const dispacth = useAppDispatch();
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempEmployee({ ...tempEmployee, [name]: value });

  };
 // console.log(tempEmployee)
  
  function saveEmployee(){
    dispacth(addTempEmployee(tempEmployee));
  }
  const css = 
  `
   .shadow{
    box-shadow:rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px !important;
   }
   .productRow{
    background-color:rgb(245,245,245)
   }
  `
  return (
    <Container fluid={true}>
      <style>{css}</style>
      <Row className=''>
        <Col className='text-center shadow productRow'>
          <h4 className='mt-2'>Çalışanlarım </h4>
        </Col>

      </Row>
      <Row className='text-center p-2 productRow mt-2' >

        <Col>
          <Label>E-posta ekle</Label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            placeholder='E-posta girin'
            onChange={handleInputChange}
            name="email"
          />
        </Col>

        <Col>
        <Button onClick={()=>saveEmployee()} className='w-50' color='primary' style={{margin:"2rem"}}>Ekle</Button>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col>
        <MyTempEmployeeList></MyTempEmployeeList>
        </Col>
        <Col>
        <MyEmployeeList></MyEmployeeList>
        </Col>
        </Row>
    </Container>
  )
}

export default MyEmployees