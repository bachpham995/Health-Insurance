import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CLabel,
    CRow
} from '@coreui/react'

const ReportSkeleton = ({data, requestData}) => {
    return (
        <CForm
        // onSubmit={onSubmit}
        width="100%" className="form-horizontal"
    >
        <CRow xl="12"  >
            <CCol xs="12">
                <CCard>
                    <CCardHeader>
                        <h3>{"Report Employee"}</h3>
                    </CCardHeader>
                    <CCardBody>
                            <CRow>
                                <CCol xs="6">
                                    <h3>{"Employee"}</h3>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel>Name: {data?.fName}</CLabel>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel>Username: {data?.username}</CLabel>
                                            {/* <CInput defaultValue={data?.username} id="username" type="text" readOnly /> */}
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel >Email: {data?.email}</CLabel>
                                            {/* <CInput defaultValue={data?.email} id="email" type="text" readOnly /> */}
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel >Phone: {data?.phone}</CLabel>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel >Address: {data?.address} </CLabel>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel >Date of Birth: {data?.doB}</CLabel>
                                        </CFormGroup>
                                    </CCol>
                                </CCol>
                                <CCol xs="6">
                                    <h3>{"Request Details"}</h3>
                                    <CCol xs="12">
                                        <CLabel>Request Date: {requestData?.requestDate}</CLabel>
                                    </CCol>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel>Status: {requestData?.status}</CLabel>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12">
                                        <CLabel>Note: {requestData?.note}</CLabel>
                                    </CCol>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel>Emi: {requestData?.emi}</CLabel>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12">
                                        <CLabel>Amount: {requestData?.amount}</CLabel>
                                    </CCol>
                                </CCol>
                            </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol >
            </CCol>
        </CRow>
    </CForm>
    );
}
export default ReportSkeleton;