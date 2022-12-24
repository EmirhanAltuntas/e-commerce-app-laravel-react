import React from 'react'
import { Row,Col } from 'reactstrap'
import styles from './headerInDashboard.module.css';

function HeaderInDashboard({title}) {
  return (
    <Row className={`${styles.header} mb-2`}>
        <Col className='p-1'>
          {title}
        </Col>
      </Row>
  )
}

export default HeaderInDashboard