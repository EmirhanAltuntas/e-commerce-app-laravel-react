import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Table } from 'reactstrap'
import { getStores } from '../Features/store/storeSlice';
import { getTempStore } from '../Features/tempStores/tempStoreSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import EmptyListMessage from './EmptyListMessage';

export default function StoreList() {

    const [tableColor,setTableColor]=useState("table-success");

    const stores = useAppSelector(state=>state.storeReducer.stores);
    const dispatch = useAppDispatch();

    //console.log(stores);

    const initFetch = useCallback(() => {
        dispatch(getStores());

      }, [dispatch])
      useEffect(() => {
        initFetch()
      }, [initFetch])

      const confirmStore = ()=>{
        alert("onay");
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
    `
  return (
    <div className='scroll-table-container' >
      <style>{css}</style>
  {
            stores && stores && stores.length>0 ?
            <table className='shadow table table-sm'>
                <thead>
                    <tr>
                        <th>
                            Mağaza İsmi
                        </th>
                        <th>
                            Vergi No
                        </th>
                        <th>
                            Tel No
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
                 stores && stores.map((store:any)=>(
                  <tr key={store.id}>
                    <td>{store.store_name}</td>
                    <td>{store.tax_number}</td>   
                    <td>{store.tel_number}</td>  
                    <td>{store.status==1?"Onaylandı":""}</td>              
                    <td><Button className='btn-sm' color='warning mx-2 '>Pasife Al</Button></td>
                  </tr>
                 ))
              }

                </tbody>
            </table>
            :  <EmptyListMessage text={'Liste boş. Ekleme yapın ya da sunucunuzu kontrol edin.'}/>
          }
            


    </div>
  )
}
