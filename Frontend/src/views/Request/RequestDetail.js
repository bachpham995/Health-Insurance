import React, { useState, useEffect, useRef, forwardRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CDropdown,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CTextarea,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility';
import {
  useParams,
  useHistory
} from "react-router-dom";
// import { from } from 'core-js/fn/array';

const RequestDetails = ({ method }) => {
  const [request, setRequest] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [checkApproval, setcheckApproval] = useState(null);
  const [resion, setResion] = useState(null);
  const [data, setData] = useState(null);

  var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const { id } = useParams();
  const readOnly = ["get"];
  const [showConfirm, setShowConfirm] = useState(false);
  let history = useHistory();

  const toggle = () => {
    setShowConfirm(!showConfirm);
  }
  const goBack = () => {
    history.push("/admin/requests");
  }

  useEffect(async () => {
    if (method !== "post" && request == null) {
      await AxiosClient.get("/PolicyRequests/" + id).then(res => {
        setData(res);
        const address = res.employee.address.street +
          " ," + res.employee.address.district +
          " ," + res.employee.address.city +
          " ," + res.employee.address.country;
        const name = res.employee.fName + " " + res.employee.lName;
        res.employee.fName = name;
        res.employee.address = address;
        setEmployee(res.employee);
        setPolicy(res.policy);
        setRequest(res);
      }).catch(err => {
        console.log('Failed to Get data: ', err);
      });
    }
  }, [checkApproval]);
  const onSubmit = async (event) => {
    const dataApproval = {
      "approvalDate": date,
      "status": checkApproval ? 0 : 1,
      "Reason": event.target.reasion.value,
      "requestId": id,
      "retired": 1
    }

    const dataRequest = {
      "requestId": data.requestId,
      "employeeId": data.employeeId,
      "policyId": data.policyId,
      "requestDate": data.requestDate,
      "status": 0,
      "note": data.note,
      "emi": data.emi,
      "amount": data.amount
    }
    console.log(dataRequest);
    await AxiosClient.post("/PolicyApprovals", JSON.stringify(dataApproval)).then(res => {
      setShowConfirm(false);
    }).catch(err => {
      console.log(err);
    });;
    await AxiosClient.put("/PolicyRequests" + "/" + id, JSON.stringify(dataRequest),
      {
        headers: { 'content-type': 'application/json' }
      }
    ).then(res => {
      setShowConfirm(false);
      goBack();
    }).catch(err => {
      console.log(err);
    });;;

  }
  const Layout = () => {
    let action = Utility.ActionDisplayName(method);

    return (
      <>
        <CForm
          onSubmit={onSubmit} width="100%" className="form-horizontal"
        >
          <CRow >
            <CCol >
              <CCard>
                <CCardHeader>
                  <h3>{action + "Employee and Policy details"}</h3>
                </CCardHeader>
                <CCardBody>
                  <fieldset disabled={readOnly.includes(method) ? "disable" : ""}>
                    <CRow>
                      <h5>Employee</h5>
                    </CRow>
                    <CRow>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel>Name</CLabel>
                          <CInput defaultValue={employee?.fName} type="text" id="fName" readOnly />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel>Username</CLabel>
                          <CInput defaultValue={employee?.username} id="username" type="text" readOnly />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel >Email</CLabel>
                          <CInput defaultValue={employee?.email} id="email" type="text" readOnly />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel >Phone</CLabel>
                          <CInput defaultValue={employee?.phone} id="phone" type="text" readOnly />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel >Address</CLabel>
                          <CInput defaultValue={employee?.address} id="address" type="text" readOnly />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel >Date of Birth</CLabel>
                          <CInput
                            // dateFormat="dd/mm/yyyy"
                            defaultValue={employee?.doB} id="doB" type="text" readOnly />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <h5>Policy</h5>
                    </CRow>
                    <CRow>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel >Policy Number</CLabel>
                          <CInput defaultValue={policy?.policyNumber} id="policyNumber" type="text" readOnly />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel>Policy Name</CLabel>
                          <CInput defaultValue={policy?.policyName} id="policyName" type="text" readOnly />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel>Amount</CLabel>
                          <CInput defaultValue={policy?.amount} id="amount" type="text" readOnly />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel>Emi</CLabel>
                          <CInput defaultValue={policy?.emi} id="emi" type="text" readOnly />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel>Benefit</CLabel>
                          <CInput defaultValue={policy?.benefit} id="benefit" type="text" readOnly />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </fieldset>
                </CCardBody>

              </CCard>
            </CCol>
            <CCol >
              <CCard>
                <CCardHeader>
                  <CLabel>
                    <h3>{action + "Request Details"}</h3>
                  </CLabel>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel>Request Id</CLabel>
                        <CInput defaultValue={request?.requestId} id="requestId" type="text" readOnly />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                      <CLabel>Request Date</CLabel>
                      <CInput defaultValue={request?.requestDate} id="requestDate" type="text" readOnly />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel>Status</CLabel>
                        <CInput defaultValue={request?.status} id="status" type="text" readOnly />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                      <CLabel>Note</CLabel>
                      <CInput defaultValue={request?.note} id="note" type="text" readOnly />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel>Emi</CLabel>
                        <CInput defaultValue={request?.emi} id="emi" type="text" readOnly />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                      <CLabel>Amount</CLabel>
                      <CInput defaultValue={request?.amount} id="amount" type="text" readOnly />
                    </CCol>
                  </CRow>
                </CCardBody>
                <CCardFooter>
                  <CButton hidden={readOnly.includes(method) ? "hidden" : ""} onClick={toggle} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                  {/* <CButton className="ml-2" hidden={readOnly.includes(method) ? "hidden" : ""} onClick={(e) => setImageSrc(null)} type="reset" size="sm" color="danger"><CIcon name="cil-ban" />Reset</CButton> */}
                  {/* <CButton className="ml-2" onClick={toggle} hidden={method !== "delete"} type="reset" size="sm" color="danger"><CIcon name="cil-trash" />Delete</CButton> */}
                  <CButton className="ml-2" onClick={goBack} size="m" color="warning">Back</CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
          <CModal show={showConfirm} onClose={toggle}>
            <CModalHeader closeButton>
              <h3>Approval Confirm</h3>
            </CModalHeader>
            <CModalBody>
              <CRow>
<<<<<<< Updated upstream:Frontend/src/views/Request/RequestDetail.js
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel>Resion</CLabel>
                    <CTextarea defaultValue="Write some resion......" id="reasion" type="text" required />
                  </CFormGroup>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton type="submit"
                onClick={() => setcheckApproval(true)}
                color="success">Approval</CButton>
              <CButton type="submit"
                onClick={() => setcheckApproval(false)}
                color="danger">Unaccep
                    </CButton>
=======
              <CCol xs="12">
                      <CFormGroup>
                        <CLabel>Resion</CLabel>
                        <CTextarea defaultValue={request?.emi} id="emi" type="text" />
                      </CFormGroup>
              </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton type="submit" color="primary">Approval</CButton>{' '}
              <CButton type="submit" color="primary"></CButton>{' '}
>>>>>>> Stashed changes:Frontend/src/views/base/Request/RequestDetail.js
              <CButton
                color="secondary"
                onClick={toggle}
              >Cancel</CButton>
            </CModalFooter>
          </CModal>

        </CForm>
      </>
    );
  }

  return Layout();
}

export default RequestDetails;
