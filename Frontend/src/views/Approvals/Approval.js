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
  CLink,
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

const Approvals = ({ tableName, tableQuery, color }) => {
  const [fields, setFields] = useState(Utility.TableHeader(tableQuery));
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchDataList = async () => {
      try {
        const params = {};
        const response = await AxiosClient.get("/" + tableQuery, params);
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
                   {item.status ? "Approval" : "Unaccep"}
              </CBadge>
            </td>
          ),
          'none': ()=>(
            <td>
            </td>
          )
      }
    }
    />
    </CCardBody>
  </CCard>
</CCol>
</CRow>
    </>
  )
}

export default Approvals;
