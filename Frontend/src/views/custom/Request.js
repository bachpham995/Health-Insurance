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
  CRow,
  CCardTitle,
  CDropdownToggle,
  CDropdownMenu
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
        setTableData(response.sort(function(x,y){
          return (x === y)? 0 : x? -1 : 1;
        }));
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
              <CCardTitle>{tableName}</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={tableData}
                fields={fields}
                striped
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status == 0 ? "Pending" : (item.status == 1 ? "Active" : "Banned"))}>
                          {item.status == 0 ? "Requesting" : (item.status == 1 ? "Approved" : "Rejected")}
                        </CBadge>
                      </td>
                    ),
                  'button':
                    (item) => (<td>
                      <CLink className="mr-1" to={Utility.Edit(tableQuery, item)} >
                        <CButton color={getBadge(item.status == 0 ? "Active" : "Banned")} disabled={item.status == 0 ? false : true}>
                          Check
                        </CButton>
                      </CLink>
                      <CLink to={Utility.Read(tableQuery, item)} >
                        <CButton color="primary">
                          Detail
                        </CButton>
                      </CLink>
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

export default RequestEmployees
