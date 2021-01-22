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
  CImg,
  CLabel
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

  const onEnterKey = (event) => {
    if(event.keyCode === 13) {
      onLogin(event);
    }
  }

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
        Common.setUserSession(res.token, {id : res.id, role : res.role,userName : res.userName});
        // history.push("/dashboard");
        form.action = "/dashboard";
        form.method = "get";
        form.onsubmit = true;
        form.submit();
      }).catch(err => {
        setLoading(false);
        setError("Something went wrong. Please try again later.");
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
                    <h1 className="text-muted">Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" {...username} autoComplete="username" id="username" onKeyUp={onEnterKey}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" {...password} autoComplete="current-password" id="password" onKeyUp={onEnterKey}/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton className="dark-color px-4" onClick={onLogin} type="button" disabled={loading}>
                          Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
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
  )
}

export default Login
