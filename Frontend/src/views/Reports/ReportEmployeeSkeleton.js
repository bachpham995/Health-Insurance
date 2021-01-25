import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CImg,
    CForm,
    CFormGroup,
    CDataTable
} from '@coreui/react'
// import Table from '@coreui/react';
const ReportEmployeeSkeleton = ({ user, policies, img }) => {
    return (
        <CForm >
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol md='5'>
                            <div className="d-flex flex-column align-items-center text-center">
                                <CRow >
                                    <CImg style={{width:'300px',height:'350px'}} src={img} thumbnail={true} />
                                </CRow>
                            </div>
                        </CCol>
                        <CCol md='7'>
                            <CRow style={{ display: 'flex', marginLeft: '5px' }} >
                                <h4>Address</h4>
                            </CRow>
                            <hr />
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <h6>Address:</h6></CFormGroup>
                                </CCol>
                                <CCol xs="9">
                                    <CFormGroup>
                                        <p>{user?.address?.street || "null"},{user?.address?.district || "null"}</p>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <h6>Location:</h6></CFormGroup>
                                </CCol>
                                <CCol xs="9">
                                    <CFormGroup>
                                        <p>{user?.address?.city || "null"},{user?.address?.country || ""} </p>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            
                            <CRow style={{ display: 'flex', marginLeft: '5px',marginTop:'10px' }} >
                                <h4>Information</h4>
                            </CRow>
                            <hr/>
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <h6>Name:</h6></CFormGroup>
                                </CCol>
                                <CCol xs="9">
                                    <CFormGroup>
                                        <p>{user?.fName || "null" } {user?.lName || "null" }</p>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <h6>Designation:</h6></CFormGroup>
                                </CCol>
                                <CCol xs="9">
                                    <CFormGroup>
                                    <p>{user?.designation || "null"}</p>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <h6>Email:</h6></CFormGroup>
                                </CCol>
                                <CCol xs="9">
                                    <CFormGroup>
                                    <p>{user?.email || "null"}</p>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <h6>Date of Birth:</h6></CFormGroup>
                                </CCol>
                                <CCol xs="9">
                                    <CFormGroup>
                                    <p>{user?.doB || "null"}</p>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </CCol>
                       

                    </CRow>
                    <hr hidden={!policies?.length != 0 ? true : false} />
                    <CRow xs="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h5 hidden={policies?.length != 0 ? true : false} >Employee don't have a Policy yet!</h5>
                    </CRow>
                    <CRow>
                        <CCol>
                            <h4 className="text-center" >POLICY</h4>
                            <div  hidden={policies?.length != 0 ? false : true}>
                                {console.log(policies)}
                                <table className="table table-bordered ">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Policy Name</th>
                                            <th>Policy Number</th>
                                            <th>Amount</th>
                                            <th>Emi</th>
                                            <th>Hospital</th>
                                            <th>InsCompany</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {policies?.map((policy, index) => {
                                            return (
                                                <tr key={policy.policyId}>
                                                    <th>{index + 1}</th>
                                                    <td>{policy.policyName}</td>
                                                    <td>{policy.policyNumber}</td>
                                                    <td>{policy.amount}</td>
                                                    <td>{policy.emi}</td>
                                                    <td>{policy.hospital.hospitalName}</td>
                                                    <td>{policy.insCompany.insCompanyName}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </CCol>

                    </CRow>
                </CCardBody>
            </CCard>
        </CForm>
    )
}
export default ReportEmployeeSkeleton
