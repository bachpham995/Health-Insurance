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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroupAppend,
  CTextarea,
  CDataTable,
  CBadge,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility';
import {
  useParams,
  useHistory
} from "react-router-dom";

const Policy = ({ method }) => {
  const [policy, setPolicy] = useState(null);
  const [listCompanies, setListCompanies] = useState([]);
  const [listHospital, setListHospital] = useState([]);
  const { id } = useParams();
  const readOnly = ["get", "delete"];
  const [showConfirm, setShowConfirm] = useState(false);

  let history = useHistory();

  const toggle = () => {
    setShowConfirm(!showConfirm);
  }

  const goBack = () => {
    history.push("/admin/policies");
  }


  useEffect(async () => {
    if (method !== "post" && policy == null) {
      await AxiosClient.get("/Policies/" + id).then(res => {
        // console.log('Get data successfully: ', res);
        // console.log("Data Header:", Object.keys(res));
        setPolicy(res);
      }).catch(err => {
        console.log('Failed to Get data: ', err);
      });
    }
  }, [policy]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await AxiosClient.get("/" + "InsuranceCompanies");
        console.log('Fetch data successfully: ', response);
        console.log("Data Header:", Object.keys(response[0]));
        setListCompanies(response);
      } catch (error) {
        console.log('Failed to fetch data list: ', error);
      }
    }

    const fetchHospitals = async () => {
      try {
        const response = await AxiosClient.get("/" + "Hospitals");
        console.log('Fetch data successfully: ', response);
        console.log("Data Header:", Object.keys(response[0]));
        setListHospital(response);
      } catch (error) {
        console.log('Failed to fetch data list: ', error);
      }
    }
    fetchCompanies();
    fetchHospitals();
  }, [])

  const onSubmit = async (event) => {
    var form = event.target;
    //var formData = new FormData(form);
    const data = {
      "policyName": form.policyName.value,
      "amount": parseInt(form.amount.value),
      "emi": parseInt(form.emi.value),
      "description": form.description.value,
      "benefit": form.benefit.value,
      "insCompanyId": parseInt(form.insCompanyId.value),
      "hospitalId": parseInt(form.hospitalId.value)
    }
    console.log(data);
    switch (method) {
      case "post":
        await AxiosClient.post("/Policies", JSON.stringify(data),
          {
            headers: { 'content-type': 'application/json' }
          }).then(res => {
            setPolicy(res);
            Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Policy", "Added new Policy", 1);
            goBack();
          }).catch(err => {
            console.log(err);
            goBack();
          });
        return false;

      case "put":
        data.policyId = parseInt(id);
        data.policyNumber = form.policyNumber.value;
        await AxiosClient.put("/Policies" + "/" + id, JSON.stringify(data),
          {
            headers: { 'content-type': 'application/json' }
          }).then(res => {
            Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Policy", "Modified a Policy", 1);
            goBack();
          }).catch(err => {
            console.log(err);
            goBack();
          });
        break;

      case "delete":
        await AxiosClient.delete("/Policies" + "/" + id,
          {}
        ).then(res => {
          setShowConfirm(false);
          Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Policy", "Removed new Policy", 1);
          goBack();
        }).catch(err => {
          console.log(err);
          goBack();
        });
        break;

      default:
        break;

    }
    return false;
  }
  const Layout = () => {
    let action = Utility.ActionDisplayName(method);
    switch (method) {
      case "post":
        return (
          <CRow>
            <CCol xs="12">
              <CForm onSubmit={onSubmit} width="100%" wasValidated className="form-horizontal">
                <CCard>
                  <CCardHeader>
                    <h3>{"ADD NEW POLICY"}</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol xs="6">
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="policyName">Policy Name</CLabel>
                              <CInput className="form-control-warning" id="policyName" placeholder="Enter Policy name" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="amount">Policy Amount</CLabel>
                              <CInput id="amount" required type="number" placeholder="Policy Amount" />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="emi">Policy Emi</CLabel>
                              <CInput id="emi" required type="number" placeholder="Policy EMI" />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="description">Description</CLabel>
                              <CTextarea rows="5" id="description" type="text" placeholder="Policy Description"></CTextarea>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol xs="6">
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup row>
                              <CCol md="12">
                                <CLabel htmlFor="insCompanyId">Company</CLabel>
                                <CInputGroup>
                                  <CSelect custom rows="2" id="insCompanyId">
                                    {
                                      listCompanies?.map(comp => (
                                        <option key={comp.insuranceCompanyId} value={comp.insuranceCompanyId}>{comp.insCompanyName}</option>
                                      ))
                                    }
                                  </CSelect>
                                  <CInputGroupAppend>
                                    <CButton size="sm" color="success">Details</CButton>
                                  </CInputGroupAppend>
                                </CInputGroup>
                              </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                              <CCol md="12">
                                <CLabel htmlFor="hospitalId">Hospital</CLabel>
                                <CInputGroup>
                                  <CSelect custom rows="2" id="hospitalId">
                                    {
                                      listHospital?.map(comp => (
                                        <option key={comp.hospitalId} value={comp.hospitalId}>{comp.hospitalName}</option>
                                      ))
                                    }
                                  </CSelect>
                                  <CInputGroupAppend>
                                    <CButton size="sm" color="success">Details</CButton>
                                  </CInputGroupAppend>
                                </CInputGroup>
                              </CCol>
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="benefit">Policy Benefit</CLabel>
                              <CTextarea rows="5" id="benefit" type="text" required placeholder="Policy Benefit"></CTextarea>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                  <CCardFooter>
                    <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                    <CButton className="ml-2" type="reset" size="sm" color="danger"><CIcon name="cil-ban" />Reset</CButton>
                    <CButton className="ml-2" onClick={goBack} size="m" color="warning">Back</CButton>
                  </CCardFooter>
                </CCard>
              </CForm>
            </CCol>
          </CRow >
        );

      case "delete":
      case "put":
      case "get":
        return (
          <>
            <CForm onSubmit={onSubmit} width="100%" wasValidated className="form-horizontal">
              <CRow >
                <CCol xs="12">
                  <CCard>
                    <CCardHeader>
                      <h3>{action + " POLICY"}</h3>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol xs="6">
                          <fieldset disabled={readOnly.includes(method) ? "disable" : ""}>
                            <CRow>
                              <CCol xs="12">
                                <CFormGroup>
                                  <CLabel htmlFor="policyNumber">Policy Number</CLabel>
                                  <CInput readOnly defaultValue={policy?.policyNumber} className="form-control-warning" id="policyNumber" placeholder="Enter Policy Number" required />
                                </CFormGroup>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol xs="12">
                                <CFormGroup>
                                  <CLabel htmlFor="policyName">Policy Name</CLabel>
                                  <CInput defaultValue={policy?.policyName} className="form-control-warning" id="policyName" placeholder="Enter Policy name" required />
                                </CFormGroup>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol xs="6">
                                <CFormGroup>
                                  <CLabel htmlFor="amount">Policy Amount</CLabel>
                                  <CInput defaultValue={policy?.amount} id="amount" required type="number" placeholder="Policy Amount" />
                                </CFormGroup>
                              </CCol>
                              <CCol xs="6">
                                <CFormGroup>
                                  <CLabel htmlFor="emi">Policy Emi</CLabel>
                                  <CInput defaultValue={policy?.emi} id="emi" required type="number" placeholder="Policy EMI" />
                                </CFormGroup>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol xs="12">
                                <CFormGroup>
                                  <CLabel htmlFor="description">Description</CLabel>
                                  <CTextarea defaultValue={policy?.description} rows="5" id="description" type="text" placeholder="Policy Description"></CTextarea>
                                </CFormGroup>
                              </CCol>
                            </CRow>
                          </fieldset>
                        </CCol>
                        <CCol xs="6">
                          <CRow>
                            <CCol xs="12">
                              <CFormGroup row>
                                <CCol md="12">
                                  <CLabel htmlFor="insCompanyId">Company</CLabel>
                                  <CInputGroup>
                                    <CSelect disabled={readOnly.includes(method) ? "disable" : ""} custom rows="2" id="insCompanyId" defaultValue={policy?.insCompanyId}>
                                      {
                                        listCompanies?.map(comp => (
                                          <option key={comp.insuranceCompanyId} value={comp.insuranceCompanyId}>{comp.insCompanyName}</option>
                                        ))
                                      }
                                    </CSelect>
                                    <CInputGroupAppend>
                                      <CButton size="sm" color="success">Details</CButton>
                                    </CInputGroupAppend>
                                  </CInputGroup>
                                </CCol>
                              </CFormGroup>
                              <CFormGroup row>
                                <CCol md="12">
                                  <CLabel htmlFor="hospitalId">Hospital</CLabel>
                                  <CInputGroup>
                                    <CSelect disabled={readOnly.includes(method) ? "disable" : ""} custom rows="2" id="hospitalId" defaultValue={policy?.hospitalId}>
                                      {
                                        listHospital?.map(comp => (
                                          <option key={comp.hospitalId} value={comp.hospitalId}>{comp.hospitalName}</option>
                                        ))
                                      }
                                    </CSelect>
                                    <CInputGroupAppend>
                                      <CButton size="sm" color="success">Details</CButton>
                                    </CInputGroupAppend>
                                  </CInputGroup>
                                </CCol>
                              </CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="benefit">Policy Benefit</CLabel>
                                <CTextarea disabled={readOnly.includes(method) ? "disable" : ""} defaultValue={policy?.benefit} rows="5" id="benefit" type="text" required placeholder="Policy Benefit"></CTextarea>
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CCardBody>
                    <CCardFooter>
                      <CButton hidden={readOnly.includes(method) ? "hidden" : ""} type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                      <CButton className="ml-2" hidden={readOnly.includes(method) ? "hidden" : ""} type="reset" size="sm" color="danger"><CIcon name="cil-ban" />Reset</CButton>
                      <CButton className="ml-2" onClick={toggle} hidden={method !== "delete"} type="reset" size="sm" color="danger"><CIcon name="cil-trash" />Delete</CButton>
                      <CButton className="ml-2" onClick={goBack} size="m" color="warning">Back</CButton>
                    </CCardFooter>
                  </CCard>
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
          </>)


      default:
        break;
    }
  }

  return Layout();

}

export default Policy;
