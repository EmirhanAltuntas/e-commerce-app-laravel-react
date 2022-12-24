import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import HeaderInDashboard from '../../../Components/DashBoardHeader/HeaderInDashboard';
import TempEmployeeList from '../../../Components/TempEmployeeList';
function AdminEmployeeRequests() {


  return (
    <Container fluid={true}>
        <HeaderInDashboard title={'Çalışan Talepleri'}/>
      <Row className='mt-3'>
        <Col><TempEmployeeList></TempEmployeeList></Col>
      </Row>
    </Container>
  )
}

export default AdminEmployeeRequests