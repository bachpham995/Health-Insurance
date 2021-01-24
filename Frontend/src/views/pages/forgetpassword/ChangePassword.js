import React, { useEffect, useState, useLocation } from 'react'
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
    CToast,
    CToaster,
    CToastHeader,
    CToastBody
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import AxiosClient from 'src/api/AxiosClient';

const ChangePassword = () => {
    const { token } = useParams();

    const [valid, setValid] = useState(false);
    const [message, setMessage] = useState(null);

    const getData = () => {
        setMessage(null);
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPass').value;
        if (password == "" || confirmPassword == "") {
            setValid(false);
            setMessage("Please fill to change password");
            return;
        }
        if (password != confirmPassword) {
            setValid(false);
            setMessage("Password and Confirm Password are not the same! Please try again.");
        } else {
            const data = new FormData();
            data.append("password", password);
            data.append("token", token);
            AxiosClient.post("Security/ChangePassword", data, {
                headers: { 'content-type': 'application/json', 'accept': '*/*' }
            })
                .then(function (response) {
                    console.log(response);
                    setValid(true);
                    setMessage("Change Password successfully!");
                })
                .catch(function (error) {
                    console.log(error);
                    setValid(false);
                    setMessage("Fail!");
                });
        }
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
                                        <h1 className="text-muted">Change Password</h1>
                                        <p className="text-muted">Please change other password</p>
                                        <CInputGroup className="mb-3">
                                            <CInput type="password" placeholder="New Password" id="password" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInput type="password" placeholder="Confirm Password" id="confirmPass" />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton className="dark-color" color="" onClick={getData} type="button">Accept</CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
                <CToaster position="bottom-right">
                    <CToast color={valid ? "success" : "danger"} autohide={1000} fade={true} show={message != null}>
                        <CToastHeader >
                            {valid ? "Success" : "Fail"}
                        </CToastHeader>
                        <CToastBody>
                            {message}
                        </CToastBody>
                    </CToast>
                </CToaster>
            </CContainer>
        </CRow>
    )
}

export default ChangePassword
