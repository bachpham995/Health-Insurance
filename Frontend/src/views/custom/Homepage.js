import React, { } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CLink,
    CCol,
    CRow,
    CContainer,
    CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Homepage = () => {

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CCard className="bg-info">
                        <CCardHeader>
                            <h2><strong>
                                <CIcon name="cil-search" size='xl' />&nbsp;
                                SEARCH
                                </strong></h2>
                        </CCardHeader>
                        <CCardBody>
                            <CRow height={300}>
                                <CCol className="text-center" >
                                    <CLink to="/user/hospitalSearch">
                                        <CCard className="bg-light text-info">
                                            <CCardBody>
                                                <blockquote>
                                                    <CIcon name="cil-hospital" size='xl' />
                                                    <p>Hospital</p>
                                                </blockquote>
                                            </CCardBody>
                                        </CCard>
                                    </CLink>
                                </CCol>
                                <CCol className="text-center" >
                                    <CLink to="/user/companySearch">
                                        <CCard className="bg-light text-info">
                                            <CCardBody>
                                                <blockquote>
                                                    <CIcon name="cil-building" size='xl' />
                                                    <p>Company</p>
                                                </blockquote>
                                            </CCardBody>
                                        </CCard>
                                    </CLink>
                                </CCol>
                                <CCol className="text-center" >
                                    <CLink to="/user/policySearch">
                                        <CCard className="bg-light text-info">
                                            <CCardBody>
                                                <blockquote>
                                                    <CIcon name="cil-list" size='xl' />
                                                    <p>Policy</p>
                                                </blockquote>
                                            </CCardBody>
                                        </CCard>
                                    </CLink>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol>
                    <CCard className="bg-info">
                        <CCardHeader>
                            <h2><strong>
                                <CIcon name="cil-list-rich" size='xl' />&nbsp;
                                POLICY
                                </strong></h2>
                        </CCardHeader>
                        <CCardBody>
                            <CRow height={300}>
                                <CCol className="text-center" >
                                    <CLink to="/user/policyEmployees">
                                        <CCard className="bg-light text-info">
                                            <CCardBody>
                                                <blockquote>
                                                    <CIcon name="cil-storage" size='xl' />
                                                    <p>View all policy</p>
                                                </blockquote>
                                            </CCardBody>
                                        </CCard>
                                    </CLink>
                                </CCol>
                                <CCol className="text-center" >
                                    <CLink to="/user/policyRequest">
                                        <CCard className="bg-light text-info">
                                            <CCardBody>
                                                <blockquote>
                                                    <CIcon name="cil-indent-increase" size='xl' />
                                                    <p>Request Policy</p>
                                                </blockquote>
                                            </CCardBody>
                                        </CCard>
                                    </CLink>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CCard className="text-center">
                                        <CCardBody>
                                            <blockquote>
                                                <CImg src="https://www.expatica.com/app/uploads/sites/6/2014/05/famins-1.jpg" width="100%" />
                                                <h4>All plans in one place</h4>
                                                <p>Whether you need health insurance for yourself, your business, or your family, Medical Care has a wide range of options. Let our experts help you find the health insurance you need.</p>
                                            </blockquote>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol>
                                    <CCard className="text-center">
                                        <CCardBody>
                                            <blockquote>
                                                <CImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwGzDE93boxLpLD--eq5Hbw731NwsJsL8MFQ&usqp=CAU" width="100%" />
                                                <h4>Benefit comparisons</h4>
                                                <p>See unbiased comparisons of plan costs and benefits across all major carriers. Get a quote & find the most affordable plan that's right for you.</p>
                                            </blockquote>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol>
                                    <CCard className="text-center">
                                        <CCardBody>
                                            <blockquote>
                                                <CImg src="https://asiky.com/files/images/Article/asiky-website-khach-san/Bi-quyet-tro-thanh-nhan-vien-customer-service-chuyen-nghiep2.jpg" width="100%" />
                                                <h4>Lifetime support</h4>
                                                <p>Our support continues even after you sign up. Talk to our licensed insurance agents to understand your plan benefits, premiums, and more.</p>
                                            </blockquote>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default Homepage
