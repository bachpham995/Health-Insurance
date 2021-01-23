import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CRow,
    CImg,
    CLabel
} from '@coreui/react'

const ForgetMail = () => {

    return (
        <CRow className="custom-container">
            <CImg className="custom-background" src="https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png" />
            <CContainer>
                <CRow className="justify-content-center custom-centered" >
                    <CCol md="12">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm id="login-form">
                                        <h1 className="text-muted">Forgot Password</h1>
                                        <p className="text-muted">Please enter email to change password</p>
                                        <CInputGroup className="mb-3">

                                            <CInput type="email" placeholder="Your Email" id="forgetemail" />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton className="dark-color" color="" type="button">Receive Email</CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </CRow>
    )
}

export default ForgetMail
