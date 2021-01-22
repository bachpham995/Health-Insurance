import React, { useState, useEffect, useRef, forwardRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CImg,
  CAlert,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility';
import {
  useParams,
  useHistory
} from "react-router-dom";
import Common from 'src/services/Common';

const Employee = ({ method }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const readOnly = ["get", "delete"];
  const [showConfirm, setShowConfirm] = useState(false);
  let history = useHistory();

  const toggle = () => {
    setShowConfirm(!showConfirm);
  }

  const goBack = () => {
    history.push("/admin/employees");
  }

  const UploadImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    await AxiosClient.post("/Employees/UploadImage", formData,
      {
        headers: { 'content-type': 'application/json', 'accept': '*/*' }
      }).then(res => {
        // console.log(res);
        setImageSrc(Utility.REACT_APP_SERVER_URL + res);
        setUploadStatus(true);
      }).catch(err => {
        console.log(err);
      });
  }

  useEffect(async () => {
    if (method !== "post" && employee == null) {
      await AxiosClient.get("/Employees/" + id).then(res => {
        // console.log('Get data successfully: ', res);
        // console.log("Data Header:", Object.keys(res));
        setEmployee(res);
        setImageSrc(res.img);
      }).catch(err => {
        console.log('Failed to Get data: ', err);
      });
    }
  }, [employee]);


  const onSubmit = async (event) => {
    var form = event.target;
    const data = {
      "employeeId" : parseInt(Common.getUser().id),
      "fName": form.fname.value,
      "lName": form.lname.value,
      "username": form.username.value,
      "password": form.password.value,
      "joinDate": new Date(),
      "designation": form.designation.value,
      "doB": form.dob.value,
      "img": imageSrc,
      "email": form.email.value,
      "phone": form.phone.value,
      "role": 1,
      "address": {
        "street": form.street.value,
        "district": form.district.value,
        "city": form.city.value,
        "country": form.country.value,
        "postalCode": form.postalCode.value
      }
    }
    // console.log(data);
    event.preventDefault();
    switch (method) {
      case "post":
        await AxiosClient.post("/Employees", JSON.stringify(data),
          {
            headers: { 'content-type': 'application/json' }
          }).then(res => {
            Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Employee", "Added a new Employee(User)", 1);
          }).catch(err => {
            console.log(err);
          });
          goBack();
          break;

      case "put":
        data.employeeId = parseInt(id);
        data.status = form.status.checked != "";
        await AxiosClient.put("/Employees" + "/" + id, JSON.stringify(data),
          {
            headers: { 'content-type': 'application/json' }
          }).then(res => {
            setEmployee(res.config.data)
            Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Employee", "Modified an Employee(User)", 1);

          }).catch(err => {
            console.log(err);
          });
          goBack();
          break;

      case "delete":
        await AxiosClient.delete("/Employees" + "/" + id,
          {}
        ).then(res => {
          setShowConfirm(false);
          Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Employee", "Removed an Employee(User)", 1);
        }).catch(err => {
          console.log(err);
        });
        goBack();
        break;

      default:
        break;

    }
    return true
  }


  const Layout = () => {
    let action = Utility.ActionDisplayName(method);

    switch (method) {
      case "post":
        return (
          <>
            <CForm onSubmit={onSubmit} width="100%" wasValidated className="form-horizontal">
              <CRow>
                <CCol xs="12" sm="6">
                  <CCard>
                    <CCardHeader>
                      <h3>{"ADD NEW EMPLOYEE"}</h3>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="fname">First Name</CLabel>
                            <CInput className="form-control-warning" id="fname" placeholder="Enter first name" required />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="lname">Last Name</CLabel>
                            <CInput className="form-control-warning" id="lname" placeholder="Enter last name" required />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="username">Username</CLabel>
                            <CInput className="form-control-warning" id="username" placeholder="Enter Username" required />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="password">Password</CLabel>
                            <CInput type="password" className="form-control-warning" id="password" placeholder="Enter Password" required />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="phone">Phone</CLabel>
                            <CInput id="phone" type="tele" placeholder="Phone Number" required />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="email">Email</CLabel>
                            <CInput id="email" type="email" placeholder="Email address" required />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="dob">Date of Birth</CLabel>
                            <CInput id="dob" type="date" placeholder="Birthday of Employee" required />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="designation">Designation</CLabel>
                            <CInput id="designation" type="text" placeholder="Designation of Employee" required />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="address.street">Street</CLabel>
                            <CInput id="street" type="text" placeholder="Street" required />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="district">District</CLabel>
                            <CInput id="district" type="text" placeholder="District" required />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="city">City</CLabel>
                            <CInput id="city" type="text" placeholder="City" required />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="postalCode">Postal Code</CLabel>
                            <CInput id="postalCode" type="text" placeholder="Postal" required />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="country">Country</CLabel>
                            <CInput id="country" type="text" placeholder="Country" required />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCardBody>
                    <CCardFooter>
                      <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                      <CButton className="ml-2" onClick={(e) => setImageSrc(null)} type="reset" size="sm" color="danger"><CIcon name="cil-ban" />Reset</CButton>
                      <CButton className="ml-2" onClick={goBack} size="m" color="warning">Back</CButton>
                    </CCardFooter>
                  </CCard>
                </CCol>
                <CCol xs="12" sm="6">
                  <CCard>
                    <CCardHeader>
                      <CLabel htmlFor="img-input">Upload Image</CLabel>
                      <CInput id="img-input" type="file" onChange={UploadImage} placeholder="Company Image" />
                      <CAlert className="ml-1" color="success" closeButton show={uploadStatus * 5} id="alert">Upload Succesfully!</CAlert>
                      <CAlert className="ml-1" color="danger" closeButton show={(uploadStatus === false) * 5} id="alert">Upload Fail!</CAlert>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol xs="12">
                          <CImg id="demo_image" src={imageSrc} width="100%"></CImg>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CForm>
          </>
        );

      case "delete":
      case "put":
      case "get":
        return (
          <>
            <CForm onSubmit={onSubmit} width="100%" wasValidated className="form-horizontal">
              <CRow>
                <CCol xs="12" sm="6">
                  <CCard>
                    <CCardHeader>
                      <h3>{action + " EMPLOYEE"}</h3>
                    </CCardHeader>
                    <CCardBody>
                      <fieldset disabled={readOnly.includes(method) ? "disable" : ""}>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="fname">First Name</CLabel>
                              <CInput defaultValue={employee?.fName} className="form-control-warning" id="fname" placeholder="Enter first name" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="lname">Last Name</CLabel>
                              <CInput defaultValue={employee?.lName} className="form-control-warning" id="lname" placeholder="Enter last name" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="username">Username</CLabel>
                              <CInput defaultValue={employee?.username} className="form-control-warning" id="username" placeholder="Enter Username" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="password">Password</CLabel>
                              <CInput defaultValue={employee?.password} type="password" className="form-control-warning" id="password" placeholder="Enter Password" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="phone">Phone</CLabel>
                              <CInput defaultValue={employee?.phone} id="phone" type="tele" placeholder="Phone Number" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="email">Email</CLabel>
                              <CInput defaultValue={employee?.email} id="email" type="email" placeholder="Email address" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="dob">Date of Birth</CLabel>
                              <CInput defaultValue={employee?.doB} pattern="dd-mm-yyyy" id="dob" type="datetime-local" placeholder="Birthday of Employee" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="designation">Designation</CLabel>
                              <CInput defaultValue={employee?.designation} id="designation" type="text" placeholder="Designation of Employee" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="street">Street</CLabel>
                              <CInput defaultValue={employee?.address?.street} id="street" type="text" placeholder="Street" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="district">District</CLabel>
                              <CInput defaultValue={employee?.address?.district} id="district" type="text" placeholder="District" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">City</CLabel>
                              <CInput defaultValue={employee?.address?.city} id="city" type="text" placeholder="City" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postalCode">Postal Code</CLabel>
                              <CInput defaultValue={employee?.address?.postalCode} id="postalCode" type="text" placeholder="Postal" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="country">Country</CLabel>
                              <CInput defaultValue={employee?.address?.country} id="country" type="text" placeholder="Country" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="12">
                            <CRow className="ml-1">
                              Active
                            {employee?.status ? (<CSwitch id="status" className="ml-2" shape={'pill'} color={'primary'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />) : (<CSwitch id="status" className="ml-2" shape={'pill'} color={'primary'} labelOn={'\u2713'} labelOff={'\u2715'} />)}
                            </CRow>

                          </CCol>
                        </CRow>
                      </fieldset>
                    </CCardBody>
                    <CCardFooter>
                      <CButton hidden={readOnly.includes(method) ? "hidden" : ""} type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                      <CButton className="ml-2" hidden={readOnly.includes(method) ? "hidden" : ""} onClick={(e) => setImageSrc(null)} type="reset" size="sm" color="danger"><CIcon name="cil-ban" />Reset</CButton>
                      <CButton className="ml-2" onClick={toggle} hidden={method !== "delete"} type="reset" size="sm" color="danger"><CIcon name="cil-trash" />Delete</CButton>
                      <CButton className="ml-2" onClick={goBack} size="m" color="warning">Back</CButton>
                    </CCardFooter>
                  </CCard>
                </CCol>
                <CCol xs="12" sm="6">
                  <fieldset disabled={readOnly.includes(method) ? "disable" : ""}>
                    <CCard>
                      <CCardHeader>
                        <CLabel htmlFor="img-input">Upload Image</CLabel>
                        <CInput id="img-input" type="file" onChange={UploadImage} placeholder="Company Image" />
                        <CAlert className="ml-1" color="success" closeButton show={uploadStatus * 5} id="alert">Upload Succesfully!</CAlert>
                        <CAlert className="ml-1" color="danger" closeButton show={(uploadStatus === false) * 5} id="alert">Upload Fail!</CAlert>
                      </CCardHeader>
                      <CCardBody>
                        <CRow>
                          <CCol xs="12">
                            <CImg id="demo_image" src={imageSrc} width="100%"></CImg>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  </fieldset>
                </CCol>
              </CRow>
              <CModal show={showConfirm} onClose={toggle}>
                <CModalHeader closeButton>Delete Confirm</CModalHeader>
                <CModalBody>
                  Are you sure to delete ?
                        </CModalBody>
                <CModalFooter>
                  <CButton type="submit" color="primary">Yes</CButton>{' '}
                  <CButton
                    color="secondary"
                    onClick={toggle}
                  >Cancel</CButton>
                </CModalFooter>
              </CModal>
            </CForm>
          </>
        );


      default:
        break;
    }
  }

  return Layout();
}

export default Employee;
