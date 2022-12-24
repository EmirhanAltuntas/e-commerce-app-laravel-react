import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Row,
  Col,
  InputGroupText,
  InputGroup,
  Input
} from 'reactstrap';
import { useAppSelector } from '../hooks';
import { DisplayUser } from '../Models/DisplayUser.interface';
import LoginRegister from './LoginRegisterDropdown'

const Example = (args:any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const {isLoading,isSuccess,user,isAuthenticated} = useAppSelector((state)=>state.auth);

 
 const navigate = useNavigate();
  const css = 
  `
  .navBackground{
    background-color: rgb(220,220,220) !important;
  }
  `
  return (
    <div className='mt-4'>
        <style>{css}</style>
      <Navbar {...args}  expand='md' className='navBackground p-3 d-flex justify-content-center'>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className='d-flex justify-content-center'>
        
            <Row>
                <Col md="12" className='text-center'>
                <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">SSS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                {user? user?.name : ""}
              </NavLink>
            </NavItem>
            {

              isAuthenticated && user?.user_level === 4 ?
              <NavItem>
                <NavLink onClick={()=>navigate('storeRegister')}>
                Mağaza Aç 
              </NavLink>
              </NavItem>:
               ""
            }

          </Nav>
                </Col>
            </Row>
         
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;