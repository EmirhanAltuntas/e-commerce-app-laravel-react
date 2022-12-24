import React from 'react'
import { Col, Container, Row, ListGroup, ListGroupItem, Button, Card, CardBody, CardHeader, DropdownToggle, DropdownItem, DropdownMenu, UncontrolledDropdown } from 'reactstrap'
import Multiselect from 'multiselect-react-dropdown';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator,faHandshake,faUser,faChartPie,faFile,faCircleUser, faFilePen, faComment } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '../../../hooks';
import styles from './dashboard.module.css';
function AdminDashboard() {

  const navigate = useNavigate();
  const {user} = useAppSelector(state=>state.auth);

   const productIcon = <FontAwesomeIcon icon={faCalculator} />
   const handShake = <FontAwesomeIcon icon={faHandshake} />
   const userIcon = <FontAwesomeIcon icon={faUser} />
   const statistic = <FontAwesomeIcon icon={faChartPie} />
   const file = <FontAwesomeIcon icon={faFile} />
   const admin = <FontAwesomeIcon icon={faCircleUser} />
   const notes = <FontAwesomeIcon icon={faFilePen} />
   const comment = <FontAwesomeIcon icon={faComment} />
  return (
    <Container  fluid={true}>
      <Row className='mt-2 p-1'>
        <Col md='2' className='px-1'>
          <Card className={`${styles.cardBg}`} style={{  borderRadius: '0' }}>
            <CardBody className='m-0'>
              <Row >
                <Col className='text-center '>
                  <h4>Yönetici Menüsü</h4>
                </Col>
              </Row>
              <Row className='mt-5'>
              <Col className='text-center ' style={{fontSize:'18px',color:'rgb(67,67,67)'}}>
                  {admin} {user && user.name}
                </Col>
              </Row>
              <ListGroup className='mt-5'>
                <ListGroupItem className='p-0 mt-2  bg-transparent' >
                  <UncontrolledDropdown className="bg-transparent" direction="end" >
                    <DropdownToggle caret className={`${styles.btnDash} w-100 p-2 `} style={{background:'rgb(245,245,245)'}}>
                   <span className='mx-2'>{productIcon}</span> <span className='mx-1'>Ürün İşlemleri</span>
                    </DropdownToggle>
                    <DropdownMenu className={` w-100 p-2 ${styles.dashDrop}`} >
                    <ListGroupItem className='p-0 mt-2 '><Button className={`${styles.btnDash} w-100 p-1 bg-transparent`} onClick={() => navigate('/adminProduct') } >Ürün Ekle-Sil</Button></ListGroupItem>
                   <ListGroupItem className='p-0 mt-2  '><Button className={`${styles.btnDash} w-100 p-1 bg-transparent `} onClick={() => navigate('/adminCategory')} >Kategori Ekle-Sil</Button></ListGroupItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>


                </ListGroupItem>
                <ListGroupItem className='p-0 mt-2  bg-transparent'>
                <Button className={`${styles.btnDash} w-100 p-2 bg-transparent`} onClick={() => navigate('/cooperationRequests')} >
                 <Row >
                  <Col md='3' xs='3'>
                  {handShake}
                  </Col>
                  <Col md='9' xs='9' className='p-0'>
                  İşbirliği Talepleri
                  </Col>
                 </Row>
                </Button>
                </ListGroupItem>
                <ListGroupItem className='p-0 mt-2  bg-transparent'>
                  <Button className={`${styles.btnDash} w-100 p-2 bg-transparent`} onClick={() => navigate('/employeeRequests')} >
                  <Row>
                  <Col md='3' xs='6'>
                  {userIcon}
                  </Col>
                  <Col md='9' xs='6' className='p-0'>
                  Çalışan Talepleri
                  </Col>
                 </Row>
                    </Button>
                </ListGroupItem>
                <ListGroupItem className='p-0 mt-2  bg-transparent'>
                  <Button className={`${styles.btnDash} w-100 p-2 bg-transparent`} onClick={() => navigate('/statistics')} >
                  <Row>
                  <Col md='3' xs='6'>
                  {statistic}
                  </Col>
                  <Col md='9' xs='6' className='p-0'>
                  İstatistikler
                  </Col>
                 </Row>
                    </Button>
                  </ListGroupItem>
                <ListGroupItem className='p-0 mt-2  bg-transparent'>
                  <Button className={`${styles.btnDash} w-100 p-2 bg-transparent`} onClick={() => navigate('/documentManagement')} >
                  <Row>
                  <Col md='3' xs='6'>
                  {file}
                  </Col>
                  <Col md='9' xs='6' className='p-0'>
                  Döküman Yönetimi
                  </Col>
                 </Row>
                    </Button>
                </ListGroupItem>
                <ListGroupItem className='p-0 mt-2  bg-transparent'>
                  <Button className={`${styles.btnDash} w-100 p-2 bg-transparent`} onClick={() => navigate('/statistics')} >
                  <Row>
                  <Col md='3' xs='6'>
                  {notes}
                  </Col>
                  <Col md='9' xs='6' className='p-0'>
                  Notlarım
                  </Col>
                 </Row>
                    </Button>
                  </ListGroupItem>
                <ListGroupItem className='p-0 mt-2  bg-transparent'>
                  <Button className={`${styles.btnDash} w-100 p-2 bg-transparent`} onClick={() => navigate('/statistics')} >
                  <Row>
                  <Col md='3' xs='6'>
                  {comment}
                  </Col>
                  <Col md='9' xs='6' className='p-0'>
                  Şikayet-Talep
                  </Col>
                 </Row>
                    </Button>
                  </ListGroupItem>

              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col md='10'>
          <Outlet></Outlet>
        </Col>
      </Row>

    </Container>
  )
}

export default AdminDashboard