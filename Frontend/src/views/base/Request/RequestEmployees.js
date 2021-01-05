import React, { useEffect, useState } from 'react'
import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import AxiosClient from "src/api/AxiosClient"
import Utility from 'src/api/Utility'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const ReuqestEmployees = ({ tableName, tableQuery, color }) => {
  const [fields, setFields] = useState(Utility.TableHeader(tableQuery));
  const [tableData, setTableData] = useState([]);
  const [details, setDetails] = useState([])

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  useEffect(() => {
    const fetchDataList = async () => {
      try {
        const params = {};
        const response = await AxiosClient.get('/api/' + tableQuery, params);
        console.log('Fetch data successfully: ', response);
        console.log("Data Header:", Object.keys(response[0]));
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
     {tableName}
    </CCardHeader>
    <CCardBody>
    <CDataTable
      items={tableData}
      fields={fields}
      striped
      itemsPerPage={5}
      pagination
      scopedSlots = {{
        'status':
          (item)=>(
            <td>
               <CBadge color={getBadge(item.status ? "Active" : "Inactive")}>
                   {item.status ? "Active" : "Inactive"}
                 </CBadge>
            </td>
          )
      }}
    />
    </CCardBody>
  </CCard>
</CCol>
</CRow>
    </>
  )
}

export default ReuqestEmployees
