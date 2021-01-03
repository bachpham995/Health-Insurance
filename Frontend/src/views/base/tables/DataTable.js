import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import AxiosClient from "src/api/AxiosClient"
import Utility from 'src/api/Utility'

const DataTable = ({tableName, color}) => {
  const [fields, setFields] = useState(Utility.TableHeader(tableName));
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchDataList = async () => {
      try {
        const params = {};
        const response = await AxiosClient.get("/" + tableName, params);
        console.log('Fetch data successfully: ', response);
        setTableData(response);
      } catch (error) {
        console.log('Failed to fetch data list: ', error);
      }
    }
    fetchDataList();
  }, []);
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Combined All Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={tableData}
              fields={fields}
              //hover
              //striped
              //bordered 
              dark={color !== "light"}
              sorter             
              size="sm"
              itemsPerPage={5}
              pagination
              columnFilter
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DataTable
