import React from 'react'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CCollapse,
    CFade,
    CSwitch,
    CLink,
    CImg,
    CContainer,
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'


const profile = () => {
    // classNameName="pr-5 pl-5 mr-5 ml-5"
    return (
        <CContainer>
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
                                    Kenneth Valdez
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Last Name</h6>
                                </div>
                                <div className="col-sm-9">
                                    Kenneth Valdez
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-9">
                                    fip@jukmuh.al
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Phone</h6>
                                </div>
                                <div className="col-sm-9">
                                    (239) 816-9029
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Mobile</h6>
                                </div>
                                <div className="col-sm-9">
                                    (320) 380-4539
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9">
                                    Bay Area, San Francisco, CA
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9">
                                    Bay Area, San Francisco, CA
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9">
                                    Bay Area, San Francisco, CA
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                    <CRow gutters={true}>
                        <CCol sm='6'>
                            <CCard>
                                <CCardBody>
                                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>

                                    {/* <small>Web Design</small>
                                    <div className="progress mb-3" style="height: 5px">
                                        <div className="progress-bar bg-primary" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div> */}
                                    {/* <small>Website Markup</small>
                                    <div className="progress mb-3" style="height: 5px">
                                        <div className="progress-bar bg-primary" role="progressbar" style="width: 72%" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <small>One Page</small>
                                    <div className="progress mb-3" style="height: 5px">
                                        <div className="progress-bar bg-primary" role="progressbar" style="width: 89%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <small>Mobile Template</small>
                                    <div className="progress mb-3" style="height: 5px">
                                        <div className="progress-bar bg-primary" role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <small>Backend API</small>
                                    <div className="progress mb-3" style="height: 5px">
                                        <div className="progress-bar bg-primary" role="progressbar" style="width: 66%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div> */}
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </CContainer >
    )
}

export default profile