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
  CRow,
  CWidgetIcon
} from '@coreui/react'
import AxiosClient from "src/api/AxiosClient"
import Utility from 'src/api/Utility'
import CIcon from '@coreui/icons-react'

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
              <CLink >
                <CButton size="lg" variant="outline"  color="success" className="ml-1">
                  Add
                </CButton>
              </CLink>

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
                size="lg"
                itemsPerPage={4}
                pagination
                columnFilter
                cleaner
                itemsPerPageSelect
                clickableRows
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
                        <CDropdownToggle variant="outline" color="primary" size="sm">
                          Actions
                        </CDropdownToggle>
                        <CDropdownMenu placement='right'>
                        <CButton size="sm" variant="outline"  color="info" className="ml-1">
                          Info
                        </CButton>
                        <CButton size="sm" variant="outline"  color="warning" className="ml-1">
                          Edit
                        </CButton>
                        <CButton size="sm" variant="outline"  color="danger" className="ml-1 mr-1">
                          Remove
                        </CButton>
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
