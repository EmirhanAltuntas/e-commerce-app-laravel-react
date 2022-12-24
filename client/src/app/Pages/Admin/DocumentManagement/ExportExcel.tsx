import React from 'react'
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { useAppDispatch } from '../../../hooks';
import style from './documentManagement.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload} from '@fortawesome/free-solid-svg-icons'

function ExportExcel({excelData,fileName,request}) {
    
    const dispatch = useAppDispatch();

    const downloadIcon = <FontAwesomeIcon icon={faDownload} />
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension= '.xlsx';
    const exportToExcel = async () => {
       await  request && dispatch(request);
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = {Sheets:{data:ws},SheetNames:['data']};
        const excelBuffer = XLSX.write(wb,{bookType:'xlsx',type:'array'})
        const data = new Blob([excelBuffer],{type:fileType});
        FileSaver.saveAs(data,fileName+fileExtension);
    }

  return (
      <button onClick={(e)=>exportToExcel()} className={`${style.btnColor} btn btn-sm w-100`} style={{outline:'none'}}>{downloadIcon} {fileName} (.xlsx)</button>
  )
}

export default ExportExcel