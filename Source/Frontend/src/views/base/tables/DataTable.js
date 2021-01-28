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
  CLink,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CLabel,
  CTextarea
} from '@coreui/react'
import AxiosClient from "src/api/AxiosClient";
import Utility from 'src/api/Utility';
import Common from 'src/services/Common';
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

  const [showConfirm, setShowConfirm] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const chooseItem = (item) => {
    setShowConfirm(!showConfirm);
    setItemSelect(item);
  }

  const toggle = () => {
    setShowConfirm(!showConfirm);
  }

  useEffect(() => {
    const fetchDataList = async () => {
      try {
        const response = tableQuery != "FeedBackUser" ? await AxiosClient.get("/" + tableQuery)
          : await AxiosClient.get("/Feedbacks/User/" + Common.getUser().id);
        // console.log('Fetch data successfully: ', response);
        // console.log("Data Header:", Object.keys(response[0]));
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
                size="xl"
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

                            <CLink to={Utility.Read("ReportEmployee", item)} hidden={tableQuery == "Employees" ? false : true} >
                              <CButton size="sm" variant="outline" color="primary" className="ml-1 mr-1">
                                Print
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
                  'showReplyButton':
                    (item) => (
                      <td>
                        <CButton onClick={() => chooseItem(item)} size="sm" variant="outline" disabled={item.response != null ? false : true} color={getBadge(item.response != null ? "Active" : "Inactive")} className="ml-1">
                          {item.response != null ? "Feedback" : "Waiting"}
                        </CButton>
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
        <CModal centered show={showConfirm} onClose={toggle} backdrop={false} closeOnBackdrop={false}>
          <CModalHeader>
            <h3>Reply from Admin</h3>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CLabel>Content</CLabel>
                  <CTextarea defaultValue={itemSelect?.response} style={{ height: "150px", marginTop: "20px", resize: "none" }} type="text" readOnly />
                </CFormGroup>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="primary"
              onClick={toggle}
            >OK</CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    </>
  )
}

export default DataTable
