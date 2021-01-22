import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CImg,
  CContainer,
  CButton,
  CInput,
  CForm,
  CFormGroup,
  CLabel
} from '@coreui/react'
import Common from 'src/services/Common';
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility';


const Profile = () => {
  // classNameName="pr-5 pl-5 mr-5 ml-5"
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [img, setImg] = useState(null);

  const toggle = () => {
    setIsEdit(!isEdit);
  }

  const action = (event) => {
    if (!isEdit) {
      toggle();
    } else {
      validate(event);
    }
  }

  const validate = (event) => {
    let form = event.target.form;
    if (form.passwordConfirm.value != form.password.value) {
      form.passwordConfirm.setCustomValidity("Password Confirm is not the same as Password !")
    } else {
      form.passwordConfirm.setCustomValidity("");
    }
  }

  const GetUser = async (mounted) => {
    let user = Common.getUser();
    await AxiosClient.get("/Employees/User/" + Common.getUser().userName, {
      headers: { "content-type": "text/plain" }
    }).then(res => {
      // console.log('Get data successfully: ', res);
      // console.log("Data Header:", Object.keys(res));
      if (mounted) {
        setUser(res);
        setImg(res.img);
      }
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  }

  const Cancel = () => {
    toggle();
    GetUser(true);
  }

  const UpdateUser = async (event) => {
    let form = event.target;
    event.preventDefault();
    const data = {
      "employeeId" : user.employeeId,
      "fName": form.fname.value,
      "lName": form.lname.value,
      "username": form.username.value,
      "password": form.password.value,
      "designation": form.designation.value,
      "doB": form.doB.value,
      "img": img,
      "email": form.email.value,
      "phone": form.phone.value,
      "joinDate" : user.joinDate,
      "role": Common.getUser().role,
      "address": {
        "street": form.street.value,
        "district": form.district.value,
        "city": form.city.value,
        "country": form.country.value,
        "postalCode": form.postalCode.value
      }
    }
    await AxiosClient.put("/Employees/" + user.employeeId, JSON.stringify(data),
      {
        headers: { 'content-type': 'application/json' }
      }).then(res => {
        // console.log(res.config.data);
        setUser(JSON.parse(res.config.data));
        toggle();
        //Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "User", "Updated Profile", 1, Utility.CurrentUser().id, "" );
      }).catch(err => {
        console.log(err);
      });
    return;
  }


  const changeImg = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    await AxiosClient.post("/Employees/UploadImage", formData,
      {
        headers: { 'content-type': 'application/json', 'accept': '*/*' }
      }).then(res => {
        // console.log(res);
        setImg(Utility.REACT_APP_SERVER_URL + res);
      }).catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    let mounted = true;
    GetUser(mounted);
    return () => mounted = false;
  }, []);

  return (
    <CContainer>
      <CForm onSubmit={UpdateUser}>
        <CRow gutters={true}>
          <CCol md='5' className="mb-1">
            <CCard>
              <CCardBody>
                <div className="d-flex flex-column align-items-center text-center">
                  <CRow className="image-upload">
                    <CImg src={img} thumbnail={true} />
                    <CInput id="img" className="image-brown btn" onChange={changeImg} hidden={!isEdit} disabled={!isEdit} type="file" />
                  </CRow>
                  <h4>{user?.lName} {user?.fName}</h4>
                  <p className="text-secondary mb-1">{user?.designation}</p>
                  <p className="text-muted font-size-sm">{user?.address?.city + ", "}{user?.address?.country}</p>
                  <CRow>
                    <CButton hidden={isEdit} className="mr-1" onClick={toggle} color="primary">Edit Profile</CButton>
                    <CButton hidden={!isEdit} className="mr-1" type="submit" onClick={validate} color="primary">Update Profile</CButton>
                    <CButton hidden={!isEdit} type="reset" onClick={Cancel} color="danger">Cancel</CButton>
                  </CRow>
                </div>
              </CCardBody>
            </CCard>
            <CCard>
              <CCardBody>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <CCol xs="12">
                      <CRow>
                        <CCol xs="6">
                          <h5 className="mt-1">User Name</h5>
                        </CCol>
                        <CCol xs="6">
                          <span hidden={isEdit}>{user?.username}</span>
                          <CInput hidden={!isEdit} id="username" type="text" readOnly defaultValue={user?.username} />
                        </CCol>
                      </CRow>
                    </CCol>

                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <CCol xs="12">
                      <CRow>
                        <CCol xs="6">
                          <h5 className="mt-1">Password</h5>
                        </CCol>
                        <CCol xs="6">
                          <span hidden={isEdit}>****************</span>
                          <CInput hidden={!isEdit} id="password" required type="password" defaultValue={user?.password} />
                        </CCol>
                      </CRow>
                      <CRow className="mt-2" hidden={!isEdit}>
                        <CCol xs="6">
                          <h5 className="mt-1">Confirm Password</h5>
                        </CCol>
                        <CCol xs="6">
                          <span hidden={isEdit}>****************</span>
                          <CInput hidden={!isEdit} id="passwordConfirm" required type="password" defaultValue={user?.password} />
                        </CCol>
                      </CRow>
                    </CCol>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <CCol xs="12">
                      <CRow>
                        <CCol xs="6">
                          <h5 className="mt-1">User ID</h5>
                        </CCol>
                        <CCol xs="6">
                          <span hidden={isEdit}>#{user?.employeeId}</span>
                          <CInput hidden={!isEdit} id="id" type="text" readOnly defaultValue={user?.employeeId} />
                        </CCol>
                      </CRow>
                    </CCol>
                  </li>
                </ul>
              </CCardBody>
            </CCard>
          </CCol>

          <CCol md='7'>
            <CCard className='mb-3'>
              <CCardBody>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>Designation</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput required readOnly={!isEdit} id="designation" defaultValue={user?.designation} /></CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>First Name</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput readOnly={!isEdit} id="fname" required defaultValue={user?.fName} /></CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>Last Name</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput readOnly={!isEdit} id="lname" defaultValue={user?.lName || ""} /></CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>Email</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput readOnly={!isEdit} id="email" required type="email" defaultValue={user?.email || ""} /></CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>Date of Birth</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput readOnly={!isEdit} id="doB" required type="datetime-local" defaultValue={user?.doB} /></CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>Join Date</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput id="joinDate" readOnly required type="text" defaultValue={user?.joinDate || ""} /></CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>Phone</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput readOnly={!isEdit} id="phone" defaultValue={user?.phone || ""} /></CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>Street</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput readOnly={!isEdit} id="street" defaultValue={user?.address?.street || ""} /></CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>District</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput readOnly={!isEdit} id="district" defaultValue={user?.address?.district || ""} /></CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>City</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput id="city" readOnly={!isEdit} defaultValue={user?.address?.city || ""} /></CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>Postal Code</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput id="postalCode" readOnly={!isEdit} defaultValue={user?.address?.postalCode || ""} /></CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <h6>Country</h6></CFormGroup>
                  </CCol>
                  <CCol xs="9">
                    <CFormGroup>
                      <CInput id="country" readOnly={!isEdit} defaultValue={user?.address?.country || ""} /></CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CForm>
    </CContainer >
  )
}

export default Profile
