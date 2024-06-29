import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../shared/UI/Button'
import { MdRefresh } from "react-icons/md";
import axios from 'axios';
import { API_URL, White_theme } from '../constants/constants';


const Checked = ({user}:{user:any}) => {

  const [details,setDetails] = useState<any>();

  const getAssignment =async()=>{
    return await axios.get(`${API_URL}/file/getFilesByName?userId=${user?.user?.primaryEmailAddress?.emailAddress}`).then((response)=>{
      setDetails(response?.data?.fileUpload)
    })
  }

  useEffect(()=>{
    getAssignment()
  },[])

  return (
   <MainDiv>
      <table className='fixed_header'>
        <thead>
          <tr>
            <th>
              Subject              
            </th>
            <th>
              Title
            </th>
            <th>
              Status
            </th>
            <th>
              Marks
            </th>
            <th>
              <Button onClick={()=>getAssignment()}>
              <MdRefresh/> Refresh
              </Button>
            </th>
          </tr>
        </thead>
        {details?.map((item:any,index:any)=>(
          <tbody>
          <tr>
              <td>
                {item?.subject}
              </td>
              <td>
                {item?.fileTitle}
              </td>
              <td>
                { item.checked === true ?"checked" : "unchecked" }
              </td>
              <td>
                {item.marks ? item.marks : "not assigned yet"}
              </td>
              </tr>
        </tbody>
            ))
        }
      </table>
   </MainDiv>
  )
}

const MainDiv = styled.div`
overflow-y: scroll;
overflow-x: hidden;
  .fixed_header {
        width: 51.1vw;
        table-layout: fixed;
        border-collapse: collapse;
        @media screen and (max-width: 900px) {
          width: 91.5vw;
          font-size: 15px;
      }
      }
      .fixed_header tbody {
        display: block;
        width: 50vw;
        overflow: auto;
        background: #282920;
        box-shadow: 0 8px 32px 0 #2829207d;
        backdrop-filter: blur( 9px );
        -webkit-backdrop-filter: blur( 9px );
        border-radius: 0 0 10px 10px;
        border: 1px solid #282920;
        padding: .5rem;
        overflow-x: hidden;
        @media screen and (max-width: 900px) {
          width: 87vw;
      }
      }
      .fixed_header thead tr {
        display: block;
      }
      .fixed_header thead {
        color: ${White_theme};
        background: #4a5e13;
        box-shadow:  2px 2px 6px #3a5010,-2px -2px 6px #4e6c16;
        border-radius: 10px;
      }
      .fixed_header th{
        padding: 1rem;
        text-align: left;
        width: 200px;
        color: ${White_theme};
        @media screen and (max-width: 900px) {
          padding: 5px;
      }
    }
    .fixed_header td {
      padding: 1rem;
      text-align: left;
      width: 120px;
      color: ${White_theme};
      @media screen and (max-width: 900px) {
        padding: 5px;
        width: 10px;
    }
      }
`

export default Checked
