import React, { useCallback, useEffect } from 'react'
import { Table, Button, Alert } from 'reactstrap';
import { addEmployee } from '../Features/employee/employeeSlice';
import { getTempEmployee, removeTempEmployee } from '../Features/tempEmployee/tempEmployeeSlice';
import { useAppDispatch, useAppSelector } from '../hooks'
import { TempEmployee } from '../Models/TempEmployee';
import EmptyListMessage from './EmptyListMessage';

function TempEmployeeList() {

   const tempEmployees = useAppSelector(state=>state.tempEmployeeReducer.tempEmployess);
  const dispatch = useAppDispatch();

   const initFetch = useCallback(() => {
    dispatch(getTempEmployee());
    
  }, [dispatch,getTempEmployee])
  useEffect(() => {
    initFetch()
  }, [initFetch])


   function saveEmployee(item:any){
    const employee:TempEmployee = {store_id:item.store_id,store_name:item.store_name,email:item.email};
    
    dispatch(addEmployee(employee)).then(r=>{
      dispatch(removeTempEmployee(item.id))
    })
   }

   function removeTempEmploye(id:number){
    dispatch(removeTempEmployee(id))
   }
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
 return (
   <div className='scroll-table-container'>
     <style>{css}</style>
 {
           tempEmployees  && tempEmployees.length>0 ?
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
                       <th>
                           Durum
                       </th>
                       <th>
                           İşlem
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
                   <td>{temp.status==0?"Kayıtsız Kullanıcı":"Kayıtlı Kullanıcı"}</td>              
                   <td><Button onClick={()=>saveEmployee(temp)} color='primary'>Onayla</Button><Button onClick={()=>removeTempEmploye(temp.id)} color='warning mx-2'>Reddet</Button></td>
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

export default TempEmployeeList