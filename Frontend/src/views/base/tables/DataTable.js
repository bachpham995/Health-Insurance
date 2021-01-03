import React, { useEffect, useState } from 'react'
import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
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
                    (item, index) => (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => { toggleDetails(index) }}
                        >
                          {details.includes(index) ? 'Hide' : 'Show'}
                        </CButton>
                      </td>
                    ),
                  'details':
                    (item, index) => (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <h4>
                            {item.username}
                          </h4>
                          {/* <p className="text-muted">User since: {item.registered}</p> */}
                          <CButton size="sm" color="warning" className="ml-1">
                            Details
                          </CButton>
                          <CButton size="sm" color="info" className="ml-1">
                            Edit
                          </CButton>
                          <CButton size="sm" color="danger" className="ml-1">
                            Delete
                            </CButton>
                        </CCardBody>
                      </CCollapse>
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
