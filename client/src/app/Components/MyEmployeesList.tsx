import React, { useCallback, useEffect } from 'react'
import { Alert, Col, Row, Table } from 'reactstrap';
import { getEmployeeById } from '../Features/employee/employeeSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import EmptyListMessage from './EmptyListMessage';

function MyEmployeesList() {
    const dispatch = useAppDispatch();
    const employees = useAppSelector((state)=>state.employeeReducer.myEmployess);
    const user = useAppSelector((state)=>state.auth.user);


    const initFetch = useCallback(() => {
        dispatch(getEmployeeById(user?.store_id));
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
    
    console.log(employees)
  return (
    <div>
        <Row>
            <Col className='text-center'>
            <h5>
                 Çalışanlarım
            </h5>
           
            </Col>
        </Row>
        <style>{css}</style>
             {
         employees && employees.length>0 ?
        
                 <Table className='shadow'>
               <thead>
                   <tr>

                       <th>
                           İsim
                       </th>
                       <th>
                           Email
                       </th>
                       <th>
                           Pozisyon
                       </th>
                    <th>Tarih</th>
                   </tr>
               </thead>
               <tbody>
             {
                employees && employees.map((employee:any)=>(

                 <tr key={employee.id} className={employee.user_level==2?"success":"info"} >
                  <td>{employee.name}</td>
                   <td>{employee.email}</td>
                   <td>{employee.user_level==2?"Yönetici":'Çalışan'}</td>
                   <td>{employee.created_at.substr(0,10) }</td>
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

export default MyEmployeesList