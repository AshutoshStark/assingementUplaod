import React, { useState } from 'react'
import styled from 'styled-components'
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { API_URL, White_theme, Yellow_theme } from '../constants/constants';
import Swal from "sweetalert2"
import axios from 'axios'
import { Input } from '../../shared/UI/InputField';
import { Option, Select } from '../../shared/UI/Select';

const UploadPdf = ({user}:{user:any}) => {

  const options = {
    apiKey: `${process.env.REACT_APP_DATABASE_KEY}`,
    maxFileCount: 1,
    showFinishButton: true,
    styles: {
      colors: {
        primary: `${Yellow_theme}`
        
      }
    }
  };

  const [fileTitle,setFileTitle] = useState<any>("") 
  const [subject,setSubject] = useState<any>("") 

  const UploadFile=async(fileUrl:any)=>{
    if(fileUrl) {
      return await axios.post(`${API_URL}/file/addFile`,{
        fileURL:fileUrl,
        fileTitle:fileTitle,
        uploaderName:user?.user?.firstName,
        uploaderMail:user?.user?.primaryEmailAddress?.emailAddress,
        subject:subject,
      })
    }
  }

  return (
    <MainDiv>
       <Input type='text' placeholder='title of assignment' onChange={(e)=>{setFileTitle(e.target.value)}}/>
       <Select name='subject' onChange={(e)=>setSubject(e.target.value)}>
        <Option value={''} hidden> Subject </Option>
        <Option value={"DBMS"}>
          DBMS
        </Option>
        <Option value={"DAA"}>
          DAA
        </Option>
        <Option value={"DSA"}>
          DSA
        </Option>
        <Option value={"Microprocessor"}>
        Microprocessor
        </Option>
        <Option value={"Javascript"}>
          Javascript
        </Option>
       </Select>
      {(fileTitle !== "" && subject !== "") ? <UploadDropzone options={options}
                  onUpdate={({ uploadedFiles }) => UploadFile(uploadedFiles.map(x => x.fileUrl).join("\n"))}
                  onComplete={file=>
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'The assignment is Uploaded successfully',
                      color:`${Yellow_theme}`,
                      showConfirmButton: false,
                      timer: 1500
                  })}
                  width="40vw"
                  height="40vh" /> : "Fill the Title and the Subject to Upload the file"}
    </MainDiv>
  )
}

const MainDiv = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${White_theme};
`

export default UploadPdf
