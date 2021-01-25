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
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility';
import {
  useParams,
  useHistory
} from "react-router-dom";

const Company = ({ method }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [company, setCompany] = useState(null);
  const { id } = useParams();
  const readOnly = ["get", "delete"];
  const [showConfirm, setShowConfirm] = useState(false);
  let history = useHistory();

  const toggle = () => {
    setShowConfirm(!showConfirm);
  }

  const goBack = () => {
    history.push("/admin/companies");
  }

  const UploadImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    await AxiosClient.post("/InsuranceCompanies/UploadImage", formData,
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
    if (method !== "post" && company == null) {
      await AxiosClient.get("/InsuranceCompanies/" + id).then(res => {
        // console.log('Get data successfully: ', res);
        // console.log("Data Header:", Object.keys(res));
        setCompany(res);
        setImageSrc(res.img);
      }).catch(err => {
        console.log('Failed to Get data: ', err);
      });
    }
  }, [company]);


  const onSubmit = async (event) => {
    var form = event.target;
    const data = {
      "insCompanyName": form.insCompanyName.value,
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
    event.preventDefault();
    switch (method) {

      case "post":

        await AxiosClient.post("/InsuranceCompanies", JSON.stringify(data),
          {
            headers: { 'content-type': 'application/json' }
          }).then(res => {
            Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Company", "Added new Insurance Company", 1, res.insuranceCompanyId, "companies");
          }).catch(err => {
            console.log(err);
          });
          goBack();
          break;

      case "put":
        data.insuranceCompanyId = parseInt(id);
        await AxiosClient.put("/InsuranceCompanies" + "/" + id, JSON.stringify(data),
          {
            headers: { 'content-type': 'application/json' }
          }).then(res => {

            console.log(res)
             Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Company", "Modified an Insurance Company", 1, id, "companies" );
          }).catch(err => {
            console.log(err);
          });
        goBack();
        break;

      case "delete":
        data.insuranceCompanyId = parseInt(id);
        await AxiosClient.delete("/InsuranceCompanies" + "/" + id,
          {}
        ).then(res => {
          setShowConfirm(false);
          Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Company", "Removed an Insurance Company", 1,id, "companies" );
          goBack();
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
                      <h3>{"ADD NEW COMPANY"}</h3>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="insCompanyName">Company Name</CLabel>
                            <CInput className="form-control-warning" id="insCompanyName" placeholder="Enter your name" required />
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
                      <h3>{action + " COMPANY"}</h3>
                    </CCardHeader>
                    <CCardBody>
                      <fieldset disabled={readOnly.includes(method) ? "disable" : ""}>
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="insCompanyName">Company Name</CLabel>
                              <CInput defaultValue={company?.insCompanyName} className="form-control-warning" id="insCompanyName" placeholder="Enter your name" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="phone">Phone</CLabel>
                              <CInput defaultValue={company?.phone} id="phone" type="tele" placeholder="Phone Number" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="email">Email</CLabel>
                              <CInput defaultValue={company?.email} id="email" type="email" placeholder="Email address" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="url">Website</CLabel>
                              <CInput defaultValue={company?.url} id="url" type="text" placeholder="website Url" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="street">Street</CLabel>
                              <CInput defaultValue={company?.address?.street} id="street" type="text" placeholder="Street" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="district">District</CLabel>
                              <CInput defaultValue={company?.address?.district} id="district" type="text" placeholder="District" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">City</CLabel>
                              <CInput defaultValue={company?.address?.city} id="city" type="text" placeholder="City" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postalCode">Postal Code</CLabel>
                              <CInput defaultValue={company?.address?.postalCode} id="postalCode" type="text" placeholder="Postal" required />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="country">Country</CLabel>
                              <CInput defaultValue={company?.address?.country} id="country" type="text" placeholder="Country" required />
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

export default Company;
