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

const ReportDetail = ({ method }) => {
    const [request, setRequest] = useState(null);
    const [employee, setEmployee] = useState(null);
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
                // setData(res);
                const address = res.employee.address.street +
                    " ," + res.employee.address.district +
                    " ," + res.employee.address.city +
                    " ," + res.employee.address.country;
                const name = res.employee.fName + " " + res.employee.lName;
                res.employee.fName = name;
                res.employee.address = address;
                setEmployee(res.employee);
                // setPolicy(res.policy);
                setRequest(res);
            }).catch(err => {
                console.log('Failed to Get data: ', err);
            });
        }
    }, []);
    const onSubmit = async (event) => {
    }
    const Layout = () => {
        let action = Utility.ActionDisplayName(method);

        return (
            <>
                <CForm
                    onSubmit={onSubmit} width="100%" className="form-horizontal"
                >
                    <CRow xl="12" >
                        <CCol xs="12" >
                            <CCard>
                                <CCardHeader>
                                    <h3>{action + "Employee"}</h3>
                                </CCardHeader>
                                <CCardBody>
                                    <fieldset disabled={readOnly.includes(method) ? "disable" : ""}>
                                        <CRow>
                                            <CCol xs="12">
                                                <CFormGroup>
                                                    <CLabel>Name: {employee?.fName}</CLabel>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12">
                                                <CFormGroup>
                                                    <CLabel>Username: {employee?.username}</CLabel>
                                                    {/* <CInput defaultValue={employee?.username} id="username" type="text" readOnly /> */}
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12">
                                                <CFormGroup>
                                                    <CLabel >Email: {employee?.email}</CLabel>
                                                    {/* <CInput defaultValue={employee?.email} id="email" type="text" readOnly /> */}
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12">
                                                <CFormGroup>
                                                    <CLabel >Phone: {employee?.phone}</CLabel>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12">
                                                <CFormGroup>
                                                    <CLabel >Address: {employee?.address} </CLabel>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12">
                                            <CFormGroup>
                                                <CLabel >Date of Birth: {employee?.doB}</CLabel>
                                            </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </fieldset>
                                </CCardBody>
                            </CCard>
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
                                    <CButton className="ml-2" onClick={goBack} size="m" color="warning">Back</CButton>
                                </CCardFooter>
                            </CCard>
                        </CCol>
                        <CCol >
                        </CCol>
                    </CRow>
                    {/* <CModal show={showConfirm} onClose={toggle}>
                        <CModalHeader closeButton>
                            <h3>Approval Confirm</h3>
                        </CModalHeader>
                        <CModalBody>
                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel>Reasion</CLabel>
                                        <CTextarea defaultValue="Write some reasion......" id="reasion" type="text" required />
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
                            <CButton
                                color="secondary"
                                onClick={toggle}
                            >Cancel</CButton>
                        </CModalFooter>
                    </CModal> */}

                </CForm>
            </>
        );
    }

    return Layout();
}

export default ReportDetail;
