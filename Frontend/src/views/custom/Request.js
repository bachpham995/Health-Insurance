import React, { useEffect, useState } from 'react'
import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
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

const RequestEmployees = ({ tableName, tableQuery, color }) => {
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
              <CBadge color={getBadge(item.status == 0? "Pending":(item.status == 1? "Active" : "Banned"))}>
                {item.status == 0? "Requesting":(item.status == 1? "Approved" : "Rejected")}
              </CBadge>
            </td>
          ),
          'button':
          (item) => (<>
            <CDropdown className="mt-1">
              <CLink to={Utility.Read(tableQuery,item)} >
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                  <CButton color={getBadge(item.status == 0 ? "Active": "Banned")} disabled={item.status == 0?false:true}>
                    Check
                  </CButton>
                </CCol>
              </CLink>
            </CDropdown>
          </>
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

export default RequestEmployees
