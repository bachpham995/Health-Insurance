import React from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CImg,
    CContainer,
    CButton,
    CInput,
    CForm
} from '@coreui/react'


const profile = () => {
    // classNameName="pr-5 pl-5 mr-5 ml-5"
    return (
        <CContainer>
            <CForm>
                <CRow gutters={true}>
                    <CCol md='5' className="mb-1">
                        <CCard>
                            <CCardBody>
                                <div className="d-flex flex-column align-items-center text-center">
                                    <CImg src={'avatars/8.jpg'} thumbnail={true} width="220" />
                                    <h4>John Doe</h4>
                                    <p className="text-secondary mb-1">Full Stack Developer</p>
                                    <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                    <CButton variant="outline" color="primary">Edit Profile</CButton>
                                </div>
                            </CCardBody>
                        </CCard>
                        <CCard>
                            <CCardBody>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6>User Name</h6>
                                        <span>https://bootdey.com</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 >Password</h6>
                                        <span>bootdey</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6>User ID</h6>
                                        <span>@bootdey</span>
                                    </li>
                                </ul>
                            </CCardBody>
                        </CCard>
                    </CCol>

                    <CCol md='7'>
                        <CCard className='mb-3'>
                            <CCardBody>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">First Name</h6>
                                    </div>
                                    <div className="col-sm-9">
                                        <CInput />
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Last Name</h6>
                                    </div>
                                    <div className="col-sm-9">
                                        <CInput />
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9">
                                        <CInput type="email" />
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <div className="col-sm-9">
                                        <CInput />
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Mobile</h6>
                                    </div>
                                    <div className="col-sm-9">
                                        <CInput />
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9">
                                        <CInput />
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9">
                                        <CInput />
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9">
                                        <CInput />
                                    </div>
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CForm>
        </CContainer >
    )
}

export default profile
