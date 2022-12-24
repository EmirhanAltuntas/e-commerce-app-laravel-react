import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Table } from 'reactstrap'
import { addStore } from '../Features/store/storeSlice';
import { addTempStore, deleteTempStore, getTempStore } from '../Features/tempStores/tempStoreSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { AddStore } from '../Models/AddStore';
import EmptyListMessage from './EmptyListMessage';

export default function TempStoreList() {

    const [tableColor,setTableColor]=useState("table-success");

    const tempStores = useAppSelector(state=>state.tempStore.tempStores);
    const dispatch = useAppDispatch();

    const [store,setStore] = useState<AddStore>(
      { store_name:"",
      tax_number:"",
      tel_number:"",
      status:"1",
      user_id:""});

   // console.log(tempStores);

    const initFetch = useCallback(() => {
      dispatch(getTempStore());
      
    }, [dispatch,getTempStore])
    useEffect(() => {
      initFetch()
    }, [initFetch])


    function saveStore(item:any) {

    const newStore:AddStore = {
      store_name:item.store_name,
       tax_number: item.tax_number,
       tel_number: item.tel_number,
       status: "1",
       user_id:item.user_id
    }

      //console.log(newStore)
     dispatch(addStore(item)).then(r=>{
      dispatch(deleteTempStore(item.id)).then(re=>{
       // console.log(re)
      })
     })
    }
     
function removeTempStore(item:any){
  dispatch(deleteTempStore(item.id)).then(re=>{
  //  console.log(re)
  })

}
 

    const css = 
    `
    .scroll-table-container {
      height: 400px;
      overflow-y: scroll;
      overflow-x:auto !impotant;
      }


      tr{
        text-align:center;
      }
    `
  return (
    <div className='scroll-table-container'>
      <style>{css}</style>
  {
            tempStores && tempStores && tempStores.length>0 ?
            <table className='shadow table table-sm' >
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
                 tempStores && tempStores.map((temp:any)=>(
                  <tr key={temp.id} >
                    <td>{temp.store_name}</td>
                    <td>{temp.tax_number}</td>   
                    <td>{temp.tel_number}</td>  
                    <td>{temp.status==0?"Onay Bekleniyor":""}</td>              
                    <td><Button onClick={()=>saveStore(temp)} color='primary' className='btn-sm mb-2'>Onayla</Button><Button onClick={()=>removeTempStore(temp)} className='btn-sm' color='warning mx-2'>Reddet</Button></td>
                  </tr>
                 ))
              }

                </tbody>
            </table>
            :
              <EmptyListMessage text={'Liste boş. Ekleme yapın ya da sunucunuzu kontrol edin.'}/>
          
          }
            


    </div>
  )
}
