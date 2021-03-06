import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CContainer,
  CButton,
  CCardTitle,
  CRow,
  CCol,
  CForm,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CInputGroup,
  CInputGroupAppend,
  CTextarea,
  CImg, CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { useState, useEffect } from "react";
import AxiosClient from 'src/api/AxiosClient';
import Common from "src/services/Common";
import { useHistory, useParams } from "react-router-dom";
import Utility from "src/api/Utility";


const PolicyRequest = () => {
  const [policies, setPolicies] = useState([]);
  const [policy, setPolicy] = useState(null);
  const [emi, setEmi] = useState(0);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  // const { id } = useParams();



  const getPolicies = async (mounted) => {
    await AxiosClient.get("/Policies").then(res => {
      //console.log('Policies: ', res);
      // console.log("Data Header:", Object.keys(response[0]));
      if (mounted) {
        setPolicies(res);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  const getPolicyById = async (mounted) => {
    await AxiosClient.get("/Policies/" + id).then(res => {
      console.log('Policies: ', res);
      // console.log("Data Header:", Object.keys(response[0]));
      if (mounted) {
        setPolicies(res);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  const validate = (event) => {
    let form = event.target.form;
    let amount_err = "";
    let policy_err = ""
    if (parseFloat(form.r_amount.value) <= 0) {
      amount_err = "Request Amount must be higher than 0 !";
    }
    form.r_amount.setCustomValidity(amount_err);
    if (parseFloat(form.r_policy.value) == 0) {
      policy_err = "Please choose a Policy to make a request !";
    }
    form.r_policy.setCustomValidity(policy_err);
  }

  const requestPolicy = async (event) => {
    let form = event.target
    let requestUser = Common.getUser().id;
    let policyRequest = {
      employeeId: parseInt(requestUser),
      policyId: parseInt(form.r_policy.value),
      requestDate: new Date(Date.now()).toDateString(),
      amount:parseFloat(form.r_amount.value),
      emi: parseFloat(form.r_emi.value),
      employee: null,
      policy: null,
      status: 0,
      note: "",
      retired: false
    }
    // console.log(policyRequest)
    event.preventDefault();

    await AxiosClient.post("/PolicyRequests", JSON.stringify(policyRequest),
      {
        headers: { "content-type": "application/json; charset=utf-8" }
      }).then(res => {
        setSuccess(true);
        setShow(true);
        Utility.newNotification(requestUser, requestUser, "Request A new Policy","You 'd requested a new policy", 1, res.policyId, "");
        Utility.newNotification(requestUser, -1, "New Policy Request","A User has submitted a new Policy Request", 0, res.policyId, "policies");
      }).catch(err => {
        setSuccess(false);
        setShow(true);
        console.log(err);
      })
    return;
  }

  useEffect(() => {
    let mounted = true;
    if (id != null) {
      getPolicyById(mounted);
    } else {
      getPolicies(mounted);
    }
    return () => mounted = false;
  }, []);

  // useEffect(()=>{
  //   if( id!= null && policies != null){
  //     let value = policies.filter(p => p.policyId == parseInt(id))[0];
  //     setPolicy(value);
  //     console.log("set poilcy");
  //   }
  // },[policies]);

  const choosePolicy = (event) => {
    if(id != null){
      setPolicy(event);
    }else{
      let value = policies.filter(p => p.policyId == parseInt(event.target.value))[0];
      setPolicy(value);
    }
    
    
  }




  const onChangeAmount = (event) => {
    let emi = parseFloat(event.target.value) / parseInt(event.target.form.r_duration.value);
    setEmi(emi);
  }

  const onChangeEmi = (event) => {
    let emi = parseFloat(event.target.form.r_amount.value) / parseFloat(event.target.value);
    setEmi(emi);
  }

  const toggle = () => {
    setShow(!show);
  }

  const finish = () => {
    history.push("/user/policyRequestList");
  }

  return (
    <CContainer>
      <CForm onSubmit={requestPolicy} >
        <CRow>
          <CCol xs="8">
            <CCard>
              <CCardHeader>
                <CCardTitle>
                  Request Info
              </CCardTitle>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs="12">
                    <CRow>
                      <CCol xs="4">
                        <CFormGroup>
                          <CLabel htmlFor="r_policy">Select Policy</CLabel>
                          <CInput type="text" hidden={id != null?false:true} value= {policies?.policyNumber + " " + policies?.policyName} readOnly />
                          <CSelect hidden={id != null?true:false} id="r_policy" onChange={choosePolicy}>
                            <option value={0} key={0}></option>
                            {
                              id == null?
                              policies?.map(policy => <option value={policy.policyId} key={policy.policyId}>
                              {policy.policyNumber + " " + policy.policyName}
                              </option>)
                              :""
                            }
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3" hidden={id != null?true:false}>
                        <CFormGroup>
                          <CLabel htmlFor="r_amount">Request Amount</CLabel>
                          <CInputGroup>
                            <CInput defaultValue={0} id="r_amount" onChange={onChangeAmount} type="number" />
                            <CInputGroupAppend><CButton size="sm" color="dark"><CIcon name="cil-dollar" /></CButton></CInputGroupAppend>
                          </CInputGroup>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="2" hidden={id != null?true:false}>
                        <CFormGroup >
                          <CLabel htmlFor="r_duration">Duration</CLabel>
                          <CSelect onChange={onChangeEmi} id="r_duration">
                            <option value="12">12 Months</option>
                            <option value="6">6 Months</option>
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3" hidden={id != null?true:false}>
                        <CFormGroup>
                          <CLabel htmlFor="r_emi">Request Emi</CLabel>
                          <CInputGroup>
                            <CInput value={emi} readOnly id="r_emi" type="number" />
                            <CInputGroupAppend><CButton size="sm" color="dark"><CIcon name="cil-dollar" /></CButton></CInputGroupAppend>
                          </CInputGroup>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <CTabs activeTab="policy">
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink data-tab="policy">
                        Policy
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="company">
                        Company
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="hospital">
                        Hospital
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent>
                    <CTabPane data-tab="policy">
                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="number">Policy Number</CLabel>
                            <CInput readOnly value={id == null ?policy?.policyNumber || '':policies?.policyNumber || ''} className="form-control-warning" id="number" />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">Policy Name</CLabel>
                            <CInput readOnly value={id == null ?policy?.policyName || '':policies?.policyName || ''} className="form-control-warning" id="name" />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="amount">Policy Emi</CLabel>
                            <CInputGroup>
                              <CInput readOnly value={id == null ?policy?.emi || '':policies?.emi || ''} id="amount" type="number" />
                              <CInputGroupAppend><CButton size="sm" color="dark"><CIcon name="cil-dollar" /></CButton></CInputGroupAppend>
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="amount">Policy Amount</CLabel>
                            <CInputGroup>
                              <CInput readOnly value={id == null?policy?.amount || '':policies?.amount || ''} id="amount" type="number" />
                              <CInputGroupAppend><CButton size="sm" color="dark"><CIcon name="cil-dollar" /></CButton></CInputGroupAppend>
                            </CInputGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="description">Description</CLabel>
                            <CTextarea readOnly value={id == null ?policy?.description || '':policies?.description || ''} rows="5" id="description" type="text"></CTextarea>
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="benefit">Benefit</CLabel>
                            <CTextarea readOnly value={id == null?policy?.benefit || '':policies.benefit || ''} rows="5" id="benefit" type="text"></CTextarea>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane data-tab="company">
                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="company">Insurance Company</CLabel>
                            <CInput readOnly value={id == null ?policy?.insCompany?.insCompanyName || '':policies?.insCompany?.insCompanyName || ''} id="company" />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="companyWeb">Website</CLabel>
                            <CInput readOnly value={id == null ?policy?.insCompany?.url || '':policies?.insCompany?.url || ''} id="companyWeb" />
                          </CFormGroup>
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="companyEmail">Email</CLabel>
                                <CInput readOnly value={id == null?policy?.insCompany?.email || '':policies?.insCompany?.email || ''} id="companyEmail" />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="companyPhone">Phone</CLabel>
                                <CInput readOnly value={id == null?policy?.insCompany?.phone || '':policies?.insCompany?.phone || ''} id="companyPhone" />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                          <CFormGroup>
                            <CLabel htmlFor="companyStr">Street</CLabel>
                            <CInput readOnly value={id == null?policy?.insCompany?.address?.street || '':policies?.insCompany?.address?.street || ''} id="companyStr" />
                          </CFormGroup>
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="companyDist">District</CLabel>
                                <CInput readOnly value={id == null?policy?.insCompany?.address?.district || '':policies?.insCompany?.address?.district || ''} id="companyDist" />
                              </CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="companyPost">Postal Code</CLabel>
                                <CInput readOnly value={id == null?policy?.insCompany?.address?.postalCode || '':policies?.insCompany?.address?.postalCode || ''} id="companyPost" />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="companyCity">City</CLabel>
                                <CInput readOnly value={id == null?policy?.insCompany?.address?.city || '':policies?.insCompany?.address?.city || ''} id="companyCity" />
                              </CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="companyCountry">Country</CLabel>
                                <CInput readOnly value={id == null?policy?.insCompany?.address?.country || '':policies?.insCompany?.address?.country || ''} id="companyCountry" />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCol>
                        <CCol xs="6">
                          <CRow>
                            <CLabel >Photo</CLabel>
                          </CRow>
                          <CRow>
                            <CFormGroup>
                              <CImg thumbnail id="companyPhoto" src={id == null?policy?.insCompany?.img || '':policies?.insCompany?.img || ''}  />
                            </CFormGroup>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane data-tab="hospital">
                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="hospital">Hospital</CLabel>
                            <CInput readOnly value={id == null?policy?.hospital?.hospitalName || '':policies?.hospital?.hospitalName || ''} id="hospital" />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="hospitalWeb">Website</CLabel>
                            <CInput readOnly value={id == null?policy?.hospital?.url || '':policies?.hospital?.url || ''} id="hospitalWeb" />
                          </CFormGroup>
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="hospitalEmail">Email</CLabel>
                                <CInput readOnly value={id == null?policy?.hospital?.email || '':policies?.hospital?.email || ''} id="hospitalEmail" />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="hospitalPhone">Phone</CLabel>
                                <CInput readOnly value={id == null?policy?.hospital?.phone || '':policies?.hospital?.phone  || '' } id="hospitalPhone" />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                          <CFormGroup>
                            <CLabel htmlFor="hospitalStr">Street</CLabel>
                            <CInput readOnly value={id == null?policy?.hospital?.address?.street || '':policies?.hospital?.address?.street  || ''} id="hospitalStr" />
                          </CFormGroup>
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="hospitalDist">District</CLabel>
                                <CInput readOnly value={id == null?policy?.hospital?.address?.district || '':policies?.hospital?.address?.district  || ''} id="hospitalDist" />
                              </CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="hospitalPost">Postal Code</CLabel>
                                <CInput readOnly value={id == null?policy?.hospital?.address?.postalCode || '':policies?.hospital?.address?.postalCode  || ''}id="hospitalPost" />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="hospitalCity">City</CLabel>
                                <CInput readOnly value={id == null?policy?.hospital?.address?.city || '':policies?.hospital?.address?.city  || ''} id="hospitalCity" />
                              </CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="hospitalCountry">Country</CLabel>
                                <CInput readOnly value={id == null?policy?.hospital?.address?.country || '':policies?.hospital?.address?.country  || ''} id="hospitalCountry" />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCol>
                        <CCol xs="6">
                          <CRow>
                            <CLabel >Photo</CLabel>
                          </CRow>
                          <CRow>
                            <CFormGroup>
                              <CImg thumbnail id="hospitalPhoto" src={id == null?policy?.hospital?.img || '':policies?.hospital?.img  || ''} />
                            </CFormGroup>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              </CCardBody>
              <CCardFooter>
                <CButton hidden={id != null?true:false} size="sm" onClick={validate} type="submit" color="primary">Request</CButton>
                <CButton className="ml-2" onClick={()=> finish()}type="reset" size="sm" color="danger">Cancel</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CForm>
      <CModal show={show} color={success ? "success" : "danger"} onClose={toggle} size='sm' closeOnBackdrop={false}>
        <CModalHeader>{success ? (<CIcon name="cil-check-circle" />) : (<CIcon name="cil-x-circle" />)}Result</CModalHeader>
        <CModalBody>
          {success ? (<p>Request was submitted successfully.<br />Please wait for Admin to approval.</p>) : <p>Something went wrong :( <br />Please contact your admin for the details.</p>}
        </CModalBody>
        <CModalFooter>
          <CButton className="mr-1" onClick={finish} color={success ? "success" : "danger"}>OK</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
}

export default PolicyRequest;
