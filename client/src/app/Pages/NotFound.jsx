import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container,Card,CardBody,CardTitle,CardText,Button,CardSubtitle, Row ,Col} from 'reactstrap';
import stop from '../static/stop.png'
function NotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center mt-5">
        <Card style={{width: '18rem',border:'none',borderRadius:'5px'}}>
  <img alt="Sample" src={stop} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
  <CardBody>
    <CardTitle tag="h5">
      Sayfa bulunamadı
    </CardTitle>

    <CardText>
  Lütfen giriş yapın.
    </CardText>
    <Button color='primary' onClick={()=>navigate('/login')}>
      Giriş yap
    </Button>
  </CardBody>
</Card>
        </Col>
      </Row>
    </Container>
    
  )
}

export default NotFound