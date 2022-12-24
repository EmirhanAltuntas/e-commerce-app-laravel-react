import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
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
import LoginRegister from './LoginRegisterDropdown'

const Example = (args:any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args}  expand='md' className='bg-warning p-3'>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
           <Row className='w-100'>
        <Col md='3' className='text-center'>
       <NavLink to='/'>Getiriver</NavLink>
        </Col>
            <Col md='6'>

      <Input addon placeholder='ara' type="text"/>

            </Col>
            <Col md='3' className='d-flex justify-content-center'>
                <LoginRegister></LoginRegister>
            </Col>
           </Row>
         
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;