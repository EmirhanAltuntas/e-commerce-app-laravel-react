import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, Nav, NavItem, NavLink, Row, UncontrolledDropdown } from 'reactstrap'
import { getStoreById } from '../../Features/store/storeSlice';
import { useAppSelector } from '../../hooks';
import { UserStore } from '../../Models/UserStore';
import defaultCover from './default-cover.png';
function StoreHome() {



  const store: any = useAppSelector(state => state.storeReducer.store);
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useDispatch<any>();

  var [gelenImage, setGelenImage] = useState<string>("");



  async function name() {
  store&& store?.photos.forEach((element: any) => {
    //  console.log(element.image_path)
      gelenImage = element.image_path;
   //   console.log(gelenImage);
      //setGelenImage(element.image_path);
    });
  }

  const initFetch = useCallback(() => {

    dispatch(getStoreById(user?.store_id));

  }, [dispatch])
  useEffect(() => {
    initFetch()
  }, [initFetch])
  name();
  const navigate = useNavigate();
  const css =
    `
  $black: #071011;
  $white: #fff;
  $red: tomato;
  $standard: 10px;
 
  
  
  .inner-div {
    margin: 0 auto;
    border-radius: 5px;
    font-weight: 400;
    color: $black;
    font-size: 1rem;
    text-align: center;
    transition: all 0.6s cubic-bezier(0.8, -0.4, 0.2, 1.7);
    transform-style: preserve-3d; 
  }
  
  .front__bkg-photo {
    position: relative;
    height: 150px;
    width: $card-width;
    background-size: cover;
    backface-visibility: hidden;
    overflow: hidden;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  

  }
  
  .front__face-photo {
    position: relative;
    top: -60px;
    height: 120px;
    width: 120px;
    margin: 0 auto;
    border-radius: 50%;
    border: 5px solid $white;
    background-size: contain;
    overflow: hidden;
  }
  
  .front__text {
    position: relative;
    top: -55px;
    margin: 0 auto;
    font-family: "Montserrat";
    font-size: 18px;
    backface-visibility: hidden;
  
    .front__text-header {
      font-weight: 700;
      font-family: "Oswald";
      text-transform: uppercase;
      font-size: 20px;
    }
    .shadow{
      box-shadow:rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px !important;
     }
     .outer-div{
      background-color:rgb(245,245,245)
      height:35rem;
     }

  `
  return (
    <Container fluid={true}>
      <style>{css}</style>

    <Row className='mt-4'>
    <Col md="3"><Row className='cover-photo-main ' >
        <Col >
          <div className="outer-div shadow" >
            <div className="text-center d-flex justify-content-center">
              <div style={{borderRadius:"5px",backgroundColor:"rgb(245,245,245)"}} >
                <div className="front__bkg-photo"><img style={{ objectFit: "fill", width: "100%" }} src={"http://127.0.0.1:8000/product_images/" + gelenImage} alt="" /></div>
                <div className="front__face-photo"  ><img style={{ objectFit: "fill", width: "100%",height: "100%" }} src={"http://127.0.0.1:8000/product_images/" + gelenImage} alt="" /></div>
                <div className="front__text">
                  <h3 className="front__text-header">{store.store_name ? store.store_name + " " + "Mağazası" : ""}</h3>
                  <Row className='m-0'>
                    <Col >{store.tel_number ? "Telefon : " + " " + store.tel_number : ""}</Col> <Col>{store.tax_number ? "Vergi No : " + " " + store.tax_number : ""}</Col>
                  </Row>
                </div>
                {
                    user && user.user_level ==2 ?  <ListGroup>
                 
                    <ListGroupItem className='p-0 '><button onClick={()=>navigate('my-products')} className='btn w-100 ' style={{fontSize:'18px',border:'none',outline:'none'}}>Ürünlerim</button></ListGroupItem>
                    <ListGroupItem className='p-0 mb-2 mt-2 '><button onClick={()=>navigate('my-employees')} className='btn w-100 ' style={{fontSize:'18px',border:'none',outline:'none'}}>Çalışanlarım</button></ListGroupItem>
    
                  </ListGroup>
                  :<ListGroup>
                 
                  <ListGroupItem className='p-0 '><button onClick={()=>navigate('my-products')} className='btn w-100 ' style={{fontSize:'18px',border:'none',outline:'none'}}>Ürünlerim</button></ListGroupItem>
  
                </ListGroup>
                }
              
              </div>

            </div>
          </div>
        </Col>
      </Row>
    </Col>
    <Col md="9">
      
    <Row>

      </Row>
      <Row>
        <Col>
        <Outlet></Outlet>
        </Col>
      </Row>
    </Col>
    </Row>




      

    </Container>
  )
}

export default StoreHome