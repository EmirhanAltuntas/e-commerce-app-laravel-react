import React, { useState,useEffect } from 'react'
import {Container, Row,Col} from 'reactstrap'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,AreaChart,Area,Pie,PieChart } from 'recharts';
import HeaderInDashboard from '../../../Components/DashBoardHeader/HeaderInDashboard';
import { getProducts } from '../../../Features/product/productSlice';
import { getStores } from '../../../Features/store/storeSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import styles from './statistic.module.css';
function AdminAppStatistics() {

  const {productsCount} = useAppSelector(state=>state.productReducer);
  const {storesCount} = useAppSelector(state=>state.storeReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getStores())
    //console.log('useEfect çalışı');
    
  }, [productsCount,storesCount])
  
  
  const data = [
    {
      name: 'Ürün',
      total: productsCount&&productsCount
    },
    {
      name: 'Mağaza',
      total: storesCount&&storesCount,

    },
    {
      name: 'Çalışan',
      total: 45,
    },
    {
      name: 'Kullanıcı',
      total: 300,

    }
   
  ]
  const data01 = [
    { name: 'Group A', value:  productsCount&&productsCount },
    { name: 'Group B', value:  storesCount&&storesCount },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];
  
  const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 },
  ];
  
  return (
    
    <Container>

        <HeaderInDashboard title={'Uygulama İstatistikleri'}/>
      <Row>
        <Col md="12">
        <Row>
          <Col className={`${styles.bgOne} ${styles.radius} ${styles.textColor} m-1 p-3 text-center`} >Toplam Ürün - {productsCount&&productsCount} </Col>
          <Col className={`${styles.bgTwo} ${styles.radius} ${styles.textColor} m-1 p-3 text-center`}>Toplam Mağaza - {storesCount&&storesCount}</Col>
          <Col className={`${styles.bgThree} ${styles.radius} ${styles.textColor} m-1 p-3 text-center`}>Toplam Çalışan - 45</Col>
          <Col className={`${styles.bgFour} ${styles.radius} ${styles.textColor} m-1 p-3 text-center`}>Toplam Üye - 300</Col>
          
        </Row>
        </Col>
      </Row>
      <div className="row mt-2">
        <div className="col-md-12">
          <h5>Seni tekrar görmek güzel.</h5>
        </div>
      </div>
      <div className="row p-2 mt-2   " >
          <div className="col-md-3 border p-2">
          <BarChart width={250} height={250} data={data}>
            <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="rgb(132, 0, 255)" />
          </BarChart>
          </div>
          <div className="col-md-3 border mx-2 p-2">
          <AreaChart
            width={250}
            height={250}
            data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="total" stackId="1" stroke="#8884d8" fill="rgb(132, 0, 255)" />
           </AreaChart>
          </div>
          <div className="col-md-5 border p-2  d-flex justify-content-center">
          <PieChart width={300} height={200}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
          <Tooltip />
        </PieChart>
          </div>
      </div>
    </Container>
  )
}

export default AdminAppStatistics

