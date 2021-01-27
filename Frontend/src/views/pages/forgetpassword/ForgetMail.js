import React, { useState } from 'react'
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
    CToaster,
    CToast,
    CToastHeader,
    CToastBody,
    CLink
} from '@coreui/react'
import AxiosClient from 'src/api/AxiosClient'


const ForgetMail = () => {
    const [showResult, setShowResult] = useState(false);
    const [valid, setValid] = useState(false);

    const getForm = () => {
        setShowResult(false);
        var a = document.getElementById('forgetEmail');
        AxiosClient.get("Security/ForgetEmail?email=" + a.value, { header: "content-type: application/json; charset=utf-8" })
            .then(function (response) {
                console.log(response);
                setValid(true);
                setShowResult(true);
            })
            .catch(function (error) {
                console.log(error);
                if (error.response.status == 404) {
                    setValid(false);
                    setShowResult(true);
                }
            });
    }
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

                                            <CInput type="email" placeholder="Your Email" id="forgetEmail" />
                                        </CInputGroup>
                                        <CRow>
                                            <CButton className="dark-color" color="" onClick={getForm} type="button">Receive Email</CButton>
                                            <CButton className="dark-outline-color" color="" to="/login" type="button">Cancel</CButton>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
                <CToaster position="bottom-right">
                    <CToast color={valid ? "success" : "danger"} autohide={1000} fade={true} show={showResult}>
                        <CToastHeader >
                            {valid ? "Success" : "Fail"}
                        </CToastHeader>
                        <CToastBody>
                            {valid ? "Send Success! Please Check email to change password." : "Wrong! Please try other email."}
                        </CToastBody>
                    </CToast>
                </CToaster>
            </CContainer >

        </CRow >
    )
}

export default ForgetMail
