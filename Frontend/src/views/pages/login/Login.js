import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner,
  CToast,
  CToaster,
  CToastHeader,
  CToastBody,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient';
import Common from 'src/services/Common';
import {
  useHistory
} from "react-router-dom";
import login from "src/assets/bg/login.jpg";

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

const Login = () => {
  const [loading, setLoading] = useState(Common.getToken());
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const onLogin = (event) => {
    var form = event.target.form;
    setError(null);
    setLoading(true);
    let data = {
      username: username.value,
      password: password.value
    }

    AxiosClient.get("/Security?username=" + data.username + "&password=" + data.password, { header: "content-type: application/json; charset=utf-8" })
      .then(res => {
        setLoading(false);
        // console.log(res);     
        //history.push("/dashboard");
        if (res.role == 0) {
          Common.setUserSession(res.token, data.username);
          // history.push("/dashboard");
          form.action = "/dashboard";
          form.method = "get";
          form.onsubmit = true;
          form.submit();
        }
      }).catch(err => {
        setLoading(false);
        setError("Something went wrong. Please try again later.");
      });
  }


  return (
    <div style={{ 
      backgroundImage: "url('https://cutewallpaper.org/21/website-background-wallpaper/Background-patterns-web-dark-website-blogger-beautiful-image-.jpg')",
      backgroundRepeat: 'no-repeat',
      width:'100%' 
    }}>
      {/* <CImg width="100%" src="https://cutewallpaper.org/21/website-background-wallpaper/Background-patterns-web-dark-website-blogger-beautiful-image-.jpg"/> */}
      <div className="c-app c-default-layout flex-row align-items-center">
        
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm id="login-form">
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username" {...username} autoComplete="username" id="username" />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" {...password} autoComplete="current-password" id="password" />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton className="px-4" color="primary" onClick={onLogin} type="button" disabled={loading}>
                            Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">Forgot password?</CButton>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CToaster position="bottom-right">
                          <CToast color="danger" autohide={1000} fade={true} show={error != null}>
                            <CToastHeader >
                              Login Error
                          </CToastHeader>
                            <CToastBody>
                              Login Fail , wrong username or password !
                          </CToastBody>
                          </CToast>
                        </CToaster>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div >
      </div>
  )
}

export default Login
