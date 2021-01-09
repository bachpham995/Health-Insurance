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

const RequestEmployees = ({ tableName, tableQuery, color }) => {
  const [fields, setFields] = useState(Utility.TableHeader(tableQuery));
  const [tableData, setTableData] = useState([]);

  // const toggleDetails = (index) => {
  //   const position = details.indexOf(index)
  //   let newDetails = details.slice()
  //   if (position !== -1) {
  //     newDetails.splice(position, 1)
  //   } else {
  //     newDetails = [...details, index]
  //   }
  //   setDetails(newDetails)
  // }

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
                   {item.status ? "Active" : "Inactive"}
              </CBadge>
            </td>
          ),
          'button':
          (item) => (<>
            <CDropdown className="mt-1">
              <CLink to={Utility.Read(tableQuery,item)} >
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                  <CButton color={getBadge(item.status ? "Active": "Banned")} disabled={item.status?false:true}>
                    {item.status?"Approval":"Done"}
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
