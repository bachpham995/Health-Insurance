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

const DataTable = ({ tableName, tableQuery, color }) => {
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
              <h3>{tableName}</h3>
            </CCardHeader>
            <CCardHeader>
              <CButton size="m" color="success" className="ml-1">
                New
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={tableData}
                fields={fields}
                hover
                //striped
                bordered
                dark={color !== "light"}
                sorter
                size="sm"
                itemsPerPage={5}
                pagination
                columnFilter
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status ? "Active" : "Inactive")}>
                          {item.status ? "Active" : "Inactive"}
                        </CBadge>
                      </td>
                    ),
                  'show_details':
                    (item) => (<>
                      <CDropdown className="mt-2">
                        <CDropdownToggle caret color="primary" size="sm">
                          Actions
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem width="2%">Edit</CDropdownItem>
                          <CDropdownItem width="2%">Details</CDropdownItem>
                          <CDropdownItem width="2%">Remove</CDropdownItem>
                          {/* <CDropdownItem divider /> */}
                        </CDropdownMenu>
                      </CDropdown>
                    </>
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

export default DataTable
