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
    CLabel,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility';
import { useReactToPrint } from 'react-to-print';
import {
    useParams,
    useHistory
} from "react-router-dom";

const ReportDetail = ({ method }) => {
    const [request, setRequest] = useState(null);
    const [employee, setEmployee] = useState(null);
    const componentRef = useRef();
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
        history.push("/admin/reports");
    }
    useEffect(async () => {
        if (method !== "post" && request == null) {
            await AxiosClient.get("/PolicyRequests/" + id).then(res => {
                const address = res.employee.address.street +
                    " ," + res.employee.address.district +
                    " ," + res.employee.address.city +
                    " ," + res.employee.address.country;
                const name = res.employee.fName + " " + res.employee.lName;
                res.employee.fName = name;
                res.employee.address = address;
                setEmployee(res.employee);
                setRequest(res);
            }).catch(err => {
                console.log('Failed to Get data: ', err);
            });
        }
        
    },[]);
    const onSubmit  = () => {
        handlePrint();
    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const Layout = () => {
        let action = Utility.ActionDisplayName(method);
        return (
            <>
                <CForm
                    onSubmit={onSubmit}
                    width="100%" className="form-horizontal"
                >
                    <CRow xl="12"  >
                        <CCol xs="12">
                            <CCard>
                                <CCardHeader>
                                    <h3>{action + "Report Employee"}</h3>
                                </CCardHeader>
                                <CCardBody>
                                    <fieldset disabled={readOnly.includes(method) ? "disable" : ""}>
                                        <CRow>
                                            <CCol xs="6">
                                                <h3>{action + "Employee"}</h3>
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
                                            </CCol>
                                            <CCol xs="6">
                                                <h3>{action + "Request Details"}</h3>
                                                <CCol xs="12">
                                                    <CFormGroup>
                                                        <CLabel>Request Id: {request?.requestId}</CLabel>
                                                        {/* <CInput defaultValue={request?.requestId} id="requestId" type="text" readOnly /> */}
                                                    </CFormGroup>
                                                </CCol>
                                                <CCol xs="12">
                                                    <CLabel>Request Date: {request?.requestDate}</CLabel>
                                                    {/* <CInput defaultValue={request?.requestDate} id="requestDate" type="text" readOnly /> */}
                                                </CCol>
                                                <CCol xs="12">
                                                    <CFormGroup>
                                                        <CLabel>Status: {request?.status}</CLabel>
                                                    </CFormGroup>
                                                </CCol>
                                                <CCol xs="12">
                                                    <CLabel>Note: {request?.note}</CLabel>
                                                </CCol>
                                                <CCol xs="12">
                                                    <CFormGroup>
                                                        <CLabel>Emi: {request?.emi}</CLabel>
                                                    </CFormGroup>
                                                </CCol>
                                                <CCol xs="12">
                                                    <CLabel>Amount: {request?.amount}</CLabel>
                                                </CCol>
                                            </CCol>
                                        </CRow>
                                    </fieldset>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol >
                        </CCol>
                    </CRow>
                    <CButton type="submit" hidden={readOnly.includes(method) ? "hidden" : ""} size="sm" color="primary" ><CIcon name="cil-print" /> Print</CButton>
                    <CButton className="ml-2" onClick={goBack} size="m" color="warning">Back</CButton>
                </CForm>
            </>
        );
    };
    return Layout();
}

export default ReportDetail;
