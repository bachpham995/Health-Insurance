import React, { useEffect, useState } from 'react'
import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDropdownToggle,
  CDropdownMenu,
  CDropdown,
  CCol,
  CDataTable,
  CRow,
  CLink
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
  const fields = Utility.TableHeader(tableQuery);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchDataList = async () => {
      try {
        const response = await AxiosClient.get("/" + tableQuery);
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
        <CCol >
          <CCard>
            <CCardHeader>
              <h3>{tableName}</h3>
            </CCardHeader>
            <CCardHeader hidden={!Utility.shouldShowAddBtn(tableQuery)}>
              <CLink to={Utility.Create(tableQuery)}>
                <CButton size="lg" color="success" className="ml-1">
                  Add
                </CButton>
              </CLink>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={tableData}
                fields={fields}
                hover
                bordered
                responsive
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
                    (item) => (
                      <td>
                        <CDropdown className="">
                          <CDropdownToggle caret color="primary" size="sm">
                            Actions
                          </CDropdownToggle>
                          <CDropdownMenu placement='right'>
                            <CLink to={Utility.Read(tableQuery, item)}>
                              <CButton size="sm" variant="outline" color="info" className="ml-1">
                                Info
                              </CButton>
                            </CLink>
                            <CLink to={Utility.Edit(tableQuery, item)}>
                              <CButton size="sm" variant="outline" color="warning" className="ml-1">
                                Edit
                              </CButton>
                            </CLink>
                            <CLink to={Utility.Delete(tableQuery, item)}>
                              <CButton size="sm" variant="outline" color="danger" className="ml-1 mr-1">
                                Remove
                            </CButton>
                            </CLink>
                          </CDropdownMenu>
                        </CDropdown>
                      </td>
                    ),
                  'feedBackReply':
                    (item) => (
                      <td>
                        <CDropdown>
                          <CDropdownToggle caret color="primary" size="sm">
                            Actions
                          </CDropdownToggle>
                          <CDropdownMenu placement='right'>
                            <CLink to={Utility.Read(tableQuery, item)}>
                              <CButton size="sm" variant="outline" color="info" className="ml-1">
                                Info
                            </CButton>
                            </CLink>
                            <CLink hidden={item.response != null} to={Utility.Edit(tableQuery, item)}>
                              <CButton size="sm" variant="outline" color="warning" className="ml-1">
                                Reply
                            </CButton>
                            </CLink>
                            <CLink to={Utility.Delete(tableQuery, item)}>
                              <CButton size="sm" variant="outline" color="danger" className="ml-1 mr-1">
                                Remove
                          </CButton>
                            </CLink>
                          </CDropdownMenu>
                        </CDropdown>
                      </td>
                    ),
                  'feedbackUser':
                    (item) => (
                      <td>
                        {item.employee.lName + " " + item.employee.fName}
                      </td>
                    ),
                  'feedbackEmail':
                    (item) => (
                      <td>
                        {item.employee.email}
                      </td>
                    ),

                }
                }
              ></CDataTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DataTable
