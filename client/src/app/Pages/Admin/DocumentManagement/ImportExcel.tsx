import axios from 'axios';
import React,{useState} from 'react'
import {read, utils} from 'xlsx';
import alertify from 'alertifyjs';

function ImportExcel({end_point}) {

    const [importData,setImportData] = useState([]);
    const handleFile = async (e) =>{
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet);

        setImportData(jsonData)
        

    }
    const objData = Object.assign({},importData&&importData);
   // console.log(end_point);
    
    const importFileData= async() => {
        const token:any = localStorage.getItem('token');
        var jwt:any = JSON.parse(token) ;
      //  console.log(jwt)
        var endpoint = process.env.REACT_APP_BASE_URL_ENDPOINT;
        const response = await axios({
            url:`${endpoint}/${end_point}`,
            method:'post',
            headers:{
                'Authorization' : 'Bearer ' + jwt,
            },
            data:objData
        } )
        if(response.data.success===true){
            setImportData([]);

        }
        
        alertify.success(response.data.message);
     
    }

  return (
    <>
 <input type="file" onChange={(e)=>handleFile(e)} className="form-control w-50 mb-2"/>

    {
        importData && importData.length>0 ?
        <div style={{backgroundColor:'rgb(100, 255, 100)'}}>
        <pre >{JSON.stringify(importData, null, 2) }</pre>
        <button className='btn btn-primary' onClick={()=>importFileData()}>Yükle</button>
        <button className='btn btn-danger' onClick={()=>setImportData([])}>İptal</button>
        </div>
        :''
    }
    </>
   
  )
}

export default ImportExcel