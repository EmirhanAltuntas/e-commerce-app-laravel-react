import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Row,Col } from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom'
import './header.css'
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../Features/auth/authSlice';

const Example = ({...args }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const {isLoading,isSuccess,isAuthenticated,user} = useAppSelector((state)=>state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //console.log(isAuthenticated.valueOf())

  const css = 
  `
  .btn-color{
    background-color:rgb(240,240,240 );
    border:none !important;
    color:gray;
  }
  .btn-color:hover,
  .btn-color:focus {
  box-shadow: inset 6.5em 0 0 0 var(--hover);
  background-color:orange;
  background-position: left bottom;
  transition: all .5s ease-out;
  }
  `
  function cikis(){
    dispatch(logout()).then(r=>{
      if (isLoading===false) {
        navigate('/');
      }
    });
  }
 
  return (
    <div className="d-flex ">
      <style>{css}</style>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret style={{ backgroundColor:'mediumpurple' , border:'none',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
          {isAuthenticated === true ? user?.name: 'alışverişe başla'}
        </DropdownToggle>
        <DropdownMenu {...args} className="p-2">
          {
          isAuthenticated===true? <Button className='btn-color w-100 ' onClick={()=>cikis()}>Çıkış Yap</Button>
          : <Row>
              <Col md="12" ><Button  className='btn-color w-100 ' onClick={()=>navigate('/login')}>Giriş Yap</Button></Col> 
              <Col md="12"> <Button className='btn-color w-100 mt-2' onClick={()=>navigate('/register')}>Kayıt Ol</Button></Col>  
            </Row>
        
          }
          
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Example;