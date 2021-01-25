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
  CRow,
  CCardTitle,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import AxiosClient from "src/api/AxiosClient"
import Utility from 'src/api/Utility'
import Common from 'src/services/Common'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import {
  useHistory
} from "react-router-dom";

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const UserPolicyRequests = () => {
  const fields = Utility.TableHeader("PolicyRequests");
  const [tableData, setTableData] = useState([]);
  const [show, setShow] = useState(false);
  const [item,setItemData] = useState(null);
  let history = useHistory();


  const toggle = (item) => {
    setShow(!show);
    setItemData(item);
    console.log(item);
  }

  const finish = () => {
    history.push("/user/policyEmployees");
  }
  const updateRequest =  () =>{
    
    const data = item;
    data.retired = true;
    console.log(data);
     AxiosClient.put("/PolicyRequests/" + data.requestId, JSON.stringify(data),
     {
       headers: { 'content-type': 'application/json' }
     }).catch(err => {
      console.log(err);
    });
    finish();
  }
  

  useEffect(() => {
    const fetchDataList = async () => {
      const params = {};
      await AxiosClient.get("/PolicyRequests/UserRequests/" + Common.getUser().id, params).then(res => {
        setTableData(res);
      }).catch(err => {
        console.log(err);
      });
    }
    fetchDataList();
  }, []);
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>My Requests</CCardTitle>
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
                    (item) => (
                      <td>
                        <CRow xs="6">
                          <CCol xs="4">
                            <CButton size="sm"  onClick={() => toggle(item)} color={getBadge("Banned")} disabled={item.status == 0 ? false : true}>
                              Cancel
                            </CButton>
                          </CCol>
                          <CCol xs="4">
                            <Link to={Utility.Read('PolicyRequestUser', item)}>
                              <CButton size="sm" color="primary" >
                                Details
                            </CButton>
                            </Link>
                          </CCol>
                        </CRow>
                      </td>)
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CModal show={show} color={getBadge("Banned")} onClose={toggle} size='sm' closeOnBackdrop={false}>
          <CModalHeader>Notification</CModalHeader>
          <CModalBody>
                <p>Do you want to cancel this request ?</p>
          </CModalBody>
          <CModalFooter>
            <CButton className="mr-1" onClick={() => updateRequest()} color={getBadge("Pending")}>OK</CButton>
            <CButton className="mr-1" onClick={toggle} color={getBadge("Banned")}>Cancel</CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    </>
  )
}

export default UserPolicyRequests;
