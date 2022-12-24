import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Container, ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap'
import { getCategories } from '../Features/category/categorySlice';
import { addProductDetail, getHomePageProducts } from '../Features/product/productSlice';
import { useAppDispatch, useAppSelector } from '../hooks'
import 'antd/dist/antd.css';

import { Tree, Checkbox } from 'antd';
import { Category } from '../Models/Category';
import EmptyListMessage from '../Components/EmptyListMessage';
import ImagesCarousel from '../Components/Carousel/ImagesCarousel';

function Home() {


  const categories = useAppSelector(state => state.categoryReducer.categories);
  const products = useAppSelector(state => state.productReducer.homeProducts);
  const links = useAppSelector(state => state.productReducer.links);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<any>(1)
  const newLinks = links.slice(1, -1);
  const [checkInput, setCheck] = useState<any>("");
  const dispatch = useAppDispatch();
  const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const [autoExpandParent, setAutoExpandParent] = useState(true);

  interface DataNode {
    title: string;
    key: string;
    children?: DataNode[];
  }
  var treeData: DataNode[] = []

  const onExpand = (expandedKeysValue) => {
    //    console.log('onExpand', expandedKeysValue); 

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
  //  console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };


  const onSelect = (selectedKeysValue, info) => {
    //   Message.info(selectedKeys);
  //  console.log(info);
  //  console.log(info.node.props.dataRef.app_id);
    setSelectedKeys(selectedKeysValue);
  };

  const onChange = () => { };
  const arr1 = categories ? categories : [];
  const newCategory = { id: '', key: '', title: "", children: [{ key: '', title: '', main_id: '' }] };
  const sub = { key: '', title: '', main_id: '' }
  const newSubs = []
  var newCategories = [];

  for (let i = 0; i < arr1.length; i++) {
    newCategory.id = arr1[i].id;
    newCategory.key = arr1[i].id.toString();
    newCategory.title = arr1[i].name;

    let filteredSubs = []
    for (let j = 0; j < arr1[i].get_sub_category.length; j++) {
      sub.key = arr1[i].id.toString() + '-' + arr1[i].get_sub_category[j].id.toString()
      sub.main_id = arr1[i].get_sub_category[j].main_category_id
      sub.title = arr1[i].get_sub_category[j].sub_name

      let copied = Object.assign({}, sub);
      // console.log(copied)

      if (copied.main_id === arr1[i].id) {
        filteredSubs.push(copied)
      }

      newSubs.push(copied);

    }
    newCategory.children = filteredSubs
    //console.log(filteredSubs)
    // console.log(newSubs)

    let copied = Object.assign({}, newCategory);
    newCategories.push(copied);
  }


  function filtered(){
    let params = new URLSearchParams(document.location.search);
    console.log(params)
 
    var subsArray = checkedKeys.toString()
    var chars = subsArray.replace(/[^0-9\.]+/g, ",")
    var subs = chars.split(',')
    const uniqueSubIds:any = [];
    subs.forEach((c) => {
        if (!uniqueSubIds.includes(c)) {
          uniqueSubIds.push(c);
        }
    });
  
    params.set('1&subs=',String(uniqueSubIds))
    navigate({
      search: '1&subs=' + String(uniqueSubIds),
    });
   // console.log(params)
    var newUrl= new URLSearchParams(document.location.search);
 //   console.log(newUrl.toString().replace(/['%C']/g,','))
    var gonder = newUrl.toString().replace(/['%C']/g,',')
    var gonder2 = gonder.replace('=','')

   dispatch(getHomePageProducts(gonder2))
    var subIdString = uniqueSubIds.toString()


 //   console.log(uniqueSubIds);

  }




  function changePage(item: number) {
    navigate({
      search: '?page=' + String(item),
    });
    const params = new URLSearchParams(document.location.search);
    const pageNo = params.get("page");



    setPageNumber(parseInt(pageNo))



  }

  const initFetch = useCallback(() => {
    // dispatch(getSubCategories());
    dispatch(getCategories());
    dispatch(getHomePageProducts(pageNumber));
  }, [dispatch, pageNumber])
  useEffect(() => {
    initFetch()
  }, [initFetch])



  return (
    <Container fluid={true}>
      <div className="row mt-2">
        <div className="col-md-6 offset-md-3">
          <ImagesCarousel/>
        </div>
      </div>
      <Row className='mt-4'>
        <Col>
          <Row>
            <Col md='3'>
              {
              categories&&  categories.lenght<=0 &&  <EmptyListMessage text={'Bağlantınızı kontrol edin'}/>
              }
              <Row><Col md='12'>   <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={newCategories}
                style={{border:'1px solid rgb(230,230,230)',fontSize:'16px'}}
              /></Col>
                <Col md='12' className='text-center mt-2'>
                  {
                    checkedKeys.length > 0 ? <Button color='primary' onClick={()=>filtered()}>Filtrele</Button> : ""
                  }
                </Col>
              </Row>

            </Col>

            <Col md="9">
              <div className="row">
                  {
                    products.length<=0 &&  <EmptyListMessage text={'Ürün Listesi Boş. Lütfen bağlantınızı kontrol edin'}/>
                  }
                {products && products.map((product) => (
                  product.storeproducts.length != 0 ? <div className="col-12 col-sm-6 col-xl-3 mt-1">
                    <div className="card text-center h-100">

                    <Link to={`/product-detail/${product.id}`} onClick={()=>dispatch(addProductDetail(product))}>
                    <div className="card-body" style={{cursor:'pointer'}}>
                        <Row>
                          <Col>

                            <div style={{ height: "150px" }}>
                              <img
                                alt="Card image"
                                src={"http://127.0.0.1:8000/product_images/" + product.photos[0].image_path}
                                className="img-fluid rounded"
                                style={{ height: "100%", objectFit: "fill" }}
                              />
                            </div>
                            <Row className='mt-2'>
                              <Col><h5>{product.product_name}</h5></Col>
                            </Row>
                            <Row className='mt-1'>
                              {
                                product.storeproducts.length > 0 ? <Col>
                               <h5> { product.storeproducts[0].pivot.price} $</h5>
                                </Col>:''
                              }

                            </Row>

                          </Col>
                        </Row>

                      </div>
                    </Link>
                      <div className="card-footer text-muted fst-italic">
                        <Button className="btnrenk" style={{ backgroundColor: "orange", border: "none" }}>Add To Cart</Button>
                      </div>
                    </div>
                  </div>
                    : <Alert>İlgili ürün bulunamadı.</Alert>
                ))

                }
              </div>
              <Row className='mt-5'>
                <Col className='d-flex justify-content-center'>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink
                        first

                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink

                        previous
                      />
                    </PaginationItem>

                    {
                      newLinks && newLinks.map((link, index) => (
                        <PaginationItem>
                          <PaginationLink onClick={() => changePage(index + 1)}>
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))
                    }


                    <PaginationItem>
                      <PaginationLink

                        next
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink

                        last
                      />
                    </PaginationItem>
                  </Pagination>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

    </Container>
  )
}

export default Home