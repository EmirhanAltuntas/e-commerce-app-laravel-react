import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import StoreList from '../../../Components/StoreList'
import TempStoreList from '../../../Components/TempStoreList'

function AdminCooperationRequests() {
  return (
    <Container>
      <Row className='mt-3'>
        <Col md="6">
        <h4 className='text-center'>İşbirliği Talepleri</h4>
        <TempStoreList></TempStoreList>
        </Col>
        <Col md="6">
        <h4 className='text-center'>Mağazalar</h4>
        <StoreList></StoreList>
        </Col>
      </Row>

    </Container>
  )
}

export default AdminCooperationRequests