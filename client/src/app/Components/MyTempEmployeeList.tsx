import React, { useCallback, useEffect } from 'react'
import { Alert, Col, Row, Table } from 'reactstrap';
import { getTempEmployeeByStoreId } from '../Features/tempEmployee/tempEmployeeSlice';
import { useAppDispatch, useAppSelector } from '../hooks'
import EmptyListMessage from './EmptyListMessage';

function MyTempEmployeeList() {
    const dispatch = useAppDispatch();
    const tempEmployees = useAppSelector((state)=>state.tempEmployeeReducer.tempEmployess);
    const user = useAppSelector((state)=>state.auth.user);


    const initFetch = useCallback(() => {
        dispatch(getTempEmployeeByStoreId(user?.store_id));
      }, [dispatch])
      useEffect(() => {
        initFetch()
      }, [initFetch])
      const css = 
   `
   tr{
    text-align:center;
  }
  .scroll-table-container {
    overflow-y: auto;
    overflow-x:hidden;
    }
    .scroll-table, td, th {

    vertical-align:middle;

  }
  .scroll-table, th,td {

    border:1px solid rgb(210,210,210); 


  }
  .success{
    background-color:rgb(197, 248, 79)!important;
  }
  .info{
    background-color:rgb(226, 248, 174)!important;
  }
   `
    
    console.log(tempEmployees)
  return (
    <div>
          <Row>
            <Col className='text-center'>
            <h5>
                 Bekleyen İstekler
            </h5>
           
            </Col>
        </Row>
        {
         tempEmployees && tempEmployees.length>0 ?
        
                 <Table className='shadow'>
               <thead>
                   <tr>
                    <th>
                      #
                    </th>
                       <th>
                           Mağaza İsmi
                       </th>
                       <th>
                           Email
                       </th>
                       <th>
                           Gönderim Tarihi
                       </th>

                   </tr>
               </thead>
               <tbody>
             {
                tempEmployees && tempEmployees.map((temp:any)=>(

                 <tr key={temp.id} className={temp.status!=0?"success":"info"} >
                  <td>{temp.store_id}</td>
                   <td>{temp.store_name}</td>
                   <td>{temp.email}</td>
                   <td>{ temp.created_at.substr(0,10) }</td>
                 </tr>
                ))
             }

               </tbody>
           </Table>

            : <EmptyListMessage text={'Liste boş. Ekleme yapın ya da sunucunuzu kontrol edin.'}/>
        }
    </div>
  )
}

export default MyTempEmployeeList