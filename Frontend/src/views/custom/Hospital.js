import React, { useState, useEffect } from 'react'
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
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility';
import {
  useParams,
  useHistory
} from "react-router-dom";

const Hospital = ({ method }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [hospital, setHospital] = useState(null);
  const { id } = useParams();
  const readOnly = ["get", "delete"];
  const [showConfirm, setShowConfirm] = useState(false);
  let history = useHistory();

  const toggle = () => {
    setShowConfirm(!showConfirm);
  }

  const goBack = () => {
    history.push("/admin/hospitals");
  }

  const UploadImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    await AxiosClient.post("/Hospitals/UploadImage", formData,
      {
        headers: { 'content-type': 'application/json', 'accept': '*/*' }
      }).then(res => {
        // console.log(res);
        setImageSrc(Utility.REACT_APP_SERVER_URL + res);
        setUploadStatus(true);
      }).catch(err => {
        // console.log(err);
      });
  }

  useEffect(async () => {
    if (method !== "post" && hospital == null) {
      await AxiosClient.get("/Hospitals/" + id).then(res => {
        // console.log('Get data successfully: ', res);
        // console.log("Data Header:", Object.keys(res));
        setHospital(res);
        setImageSrc(res.img);
      }).catch(err => {
        console.log('Failed to Get data: ', err);
      });
    }
  }, [hospital]);


  const onSubmit = async (event) => {
    var form = event.target;
    const data = {
      "hospitalName": form.hospitalName.value,
      "phone": form.phone.value,
      "email": form.email.value,
      "url": form.url.value,
      "img": imageSrc,
      "address": {
        "street": form.street.value,
        "district": form.district.value,
        "city": form.city.value,
        "country": form.country.value,
        "postalCode": form.postalCode.value
      }
    }
    // console.log(data);
    switch (method) {
      case "post":
        await AxiosClient.post("/Hospitals", JSON.stringify(data),
          {
            headers: { 'content-type': 'application/json' }
          }).then(res => {
            Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Hospital", "Added new Hospital", 1);
          }).catch(err => {
            console.log(err);
          });
        goBack();
        return false;
      case "put":
        data.hospitalId = parseInt(id);
        await AxiosClient.put("/Hospitals" + "/" + id, JSON.stringify(data),
          {
            headers: { 'content-type': 'application/json' }
          }).then(res => {
            Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Hospital", "Modified a Hospital", 1);
          }).catch(err => {
            console.log(err);
          });
        goBack();
        return false;

      case "delete":
        await AxiosClient.delete("/Hospitals" + "/" + id,
          {}
        ).then(res => {
          setShowConfirm(false);
          Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Hospital", "Removed a Hospital", 1);     
          goBack();     
        }).catch(err => {
          console.log(err);
        });        
        return false;

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
                      <h3>{"ADD NEW HOSPITAL"}</h3>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="hospitalName">Hospital Name</CLabel>
                            <CInput className="form-control-warning" id="hospitalName" placeholder="Enter your name" required />
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
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="url">Website</CLabel>
                            <CInput id="url" type="text" placeholder="website Url" required />
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
              <CRow >
                <CCol xs="12" sm="6">
                  <CCard>
                    <CCardHeader>
                      <h3>{action + " HOSPITAL"}</h3>
                    </CCardHeader>
                    <CCardBody>
                      <fieldset disabled={readOnly.includes(method) ? "disable" : ""}>
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="hospitalName">Hospital Name</CLabel>
                              <CInput defaultValue={hospital?.hospitalName} className="form-control-warning" id="hospitalName" placeholder="Enter your name" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="phone">Phone</CLabel>
                              <CInput defaultValue={hospital?.phone} id="phone" type="tele" placeholder="Phone Number" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="email">Email</CLabel>
                              <CInput defaultValue={hospital?.email} id="email" type="email" placeholder="Email address" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="url">Website</CLabel>
                              <CInput defaultValue={hospital?.url} id="url" type="text" placeholder="website Url" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="street">Street</CLabel>
                              <CInput defaultValue={hospital?.address?.street} id="street" type="text" placeholder="Street" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="district">District</CLabel>
                              <CInput defaultValue={hospital?.address?.district} id="district" type="text" placeholder="District" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">City</CLabel>
                              <CInput defaultValue={hospital?.address?.city} id="city" type="text" placeholder="City" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postalCode">Postal Code</CLabel>
                              <CInput defaultValue={hospital?.address?.postalCode} id="postalCode" type="text" placeholder="Postal" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="country">Country</CLabel>
                              <CInput defaultValue={hospital?.address?.country} id="country" type="text" placeholder="Country" required />
                            </CFormGroup>
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
                        <CAlert color="success" closeButton show={uploadStatus * 5} id="alert">Upload Succesfully!</CAlert>
                        <CAlert color="danger" closeButton show={(uploadStatus === false) * 5} id="alert">Upload Fail!</CAlert>
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

export default Hospital;
