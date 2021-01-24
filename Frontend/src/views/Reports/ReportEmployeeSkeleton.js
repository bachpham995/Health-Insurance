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
                                <CRow className="image-upload">
                                    <CImg src={img} thumbnail={true} />
                                    {/* <CInput id="img" className="image-brown btn" onChange={changeImg} hidden={!isEdit} disabled={!isEdit} type="file" /> */}
                                </CRow>
                                {/* <h4>{user?.lName} {user?.fName}</h4>
                                    <p className="text-secondary mb-1">{user?.designation}</p>
                                    <p className="text-muted font-size-sm">{user?.address?.city + ", "}{user?.address?.country}</p> */}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <CCol xs="12">
                                        <CRow>
                                            <CCol xs="6">
                                                <h5 className="mt-1">Name</h5>
                                            </CCol>
                                            <CCol xs="6">
                                                <p>{user?.fName} {user?.lName}</p>
                                                {/* <CInput hidden={!isEdit} id="username" type="text" readOnly defaultValue={user?.username} /> */}
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <CCol xs="12">
                                        <CRow className="mt-1">
                                            <CCol xs="6">
                                                <h5 >Designation</h5>
                                            </CCol>
                                            <CCol xs="6">
                                                <p>{user?.designation}</p>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mt-1">
                                            <CCol xs="6">
                                                <h5>Email</h5>
                                            </CCol>
                                            <CCol xs="6">
                                                <p>{user?.email}</p>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mt-1" >
                                            <CCol xs="6">
                                                <h5 className="mt-1">Date of Birth</h5>
                                            </CCol>
                                            <CCol xs="6">
                                                <p>{user?.doB}</p>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </li>
                            </ul>
                        </CCol>
                        <CCol md='7'>
                            <CRow style={{ display: 'flex', marginLeft: '5px' }} >
                                <h4>Address</h4>
                            </CRow>
                            <hr />
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <h6>Street</h6></CFormGroup>
                                </CCol>
                                <CCol xs="9">
                                    <CFormGroup>
                                        <p>{user?.address?.street || "null"}</p>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <h6>District</h6>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="9">
                                    <CFormGroup>
                                        {/* <CInput readOnly={!isEdit} id="district" defaultValue={user?.address?.district || ""} /> */}
                                        <p>{user?.address?.district || "null"} </p>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <h6>City</h6></CFormGroup>
                                </CCol>
                                <CCol xs="9">
                                    <CFormGroup>
                                        <p>{user?.address?.city || "null"} </p>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <h6>Postal Code</h6></CFormGroup>
                                </CCol>
                                <CCol xs="9">
                                    <CFormGroup>
                                        <p>{user?.address?.postalCode || "null"}</p>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <h6>Country</h6></CFormGroup>
                                </CCol>
                                <CCol xs="9">
                                    <CFormGroup>
                                        <p>{user?.address?.country || ""}</p>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <hr hidden={!policies?.length != 0 ? true : false} />
                            <CRow style={{ display: 'flex', marginLeft: '5px' }} >
                                <h4>Policy</h4>
                            </CRow>
                            <hr hidden={policies?.length != 0 ? true : false} />
                            <CRow xs="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h5 hidden={policies?.length != 0 ? true : false} >Employee don't have a Policy yet!</h5>
                            </CRow>
                                <div hidden={policies?.length != 0 ? false : true}>
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
