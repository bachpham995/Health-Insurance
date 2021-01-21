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
  CImg
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { useState, useEffect } from "react";
import AxiosClient from 'src/api/AxiosClient';
import Common from "src/services/Common";


const PolicyRequest = () => {
  const [policies, setPolicies] = useState([]);
  const [policy, setPolicy] = useState(null);
  const [emi, setEmi] = useState(0);

  const getPolicies = async (mounted) => {
    await AxiosClient.get("/Policies").then(res => {
      //console.log('Policies: ', res);
      // console.log("Data Header:", Object.keys(response[0]));
      if (mounted) {
        setPolicies(res);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const requestPolicy = async (event) => {
    let form = event.target.form
    let data = {
      employeeId : Common.getUser(),
      policyId : form.r_policy.value,
      requestDate : Date.now(),
      amount : form.r_amount.value,
      emi : form.r_emi.value
    }
    await AxiosClient.post("/PolicyRequests", JSON.stringify(data),
    {
      headers: { 'content-type': 'application/json' }
    }).then(res => {
      //console.log('Policies: ', res);
      // console.log("Data Header:", Object.keys(response[0]));      
        //setPolicies(res);
      // }
    }).catch(err => {
      console.log(err);
    })  
  }

  useEffect(() => {
    let mounted = true;
    getPolicies(mounted);
    return () => mounted = false;
  }, []);

  const choosePolicy = (event) => {
    let value = policies.filter(p => p.policyId == parseInt(event.target.value))[0];

    // console.log(value)
    setPolicy(value);
  }

  const onChangeAmount = (event) => {
    let emi = parseFloat(event.target.value) / parseInt(event.target.form.r_duration.value);
    setEmi(emi);
  }

  const onChangeEmi = (event) => {
    let emi = parseFloat(event.target.form.r_amount.value) / parseFloat(event.target.value);
    setEmi(emi);
  }

  

  return (
    <CContainer>
      <CForm>
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
                          <CSelect id="r_policy" onChange={choosePolicy} >
                            <option value={0} key={0}></option>
                            {
                              policies?.map(policy => <option value={policy.policyId} key={policy.policyId}>
                                {policy.policyNumber + " " + policy.policyName}
                              </option>)
                            }
                          </CSelect>
                        </CFormGroup>

                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="r_amount">Request Amount</CLabel>
                          <CInputGroup>
                            <CInput defaultValue={0} id="r_amount" onChange={onChangeAmount} type="number" />
                            <CInputGroupAppend><CButton size="sm" color="dark"><CIcon name="cil-dollar" /></CButton></CInputGroupAppend>
                          </CInputGroup>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="2">
                        <CFormGroup>
                          <CLabel htmlFor="r_duration">Duration</CLabel>
                          <CSelect onChange={onChangeEmi} id="r_duration">
                            <option value="12">12 Months</option>
                            <option value="6">6 Months</option>
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
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
                          <CInput readOnly value={policy?.policyNumber || ''} className="form-control-warning" id="number" />
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="name">Policy Name</CLabel>
                          <CInput readOnly value={policy?.policyName || ''} className="form-control-warning" id="name" />
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="amount">Policy Emi</CLabel>
                          <CInputGroup>
                            <CInput readOnly value={policy?.emi || ''} id="amount" type="number" />
                            <CInputGroupAppend><CButton size="sm" color="dark"><CIcon name="cil-dollar" /></CButton></CInputGroupAppend>
                          </CInputGroup>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="amount">Policy Amount</CLabel>
                          <CInputGroup>
                            <CInput readOnly value={policy?.amount || ''} id="amount" type="number" />
                            <CInputGroupAppend><CButton size="sm" color="dark"><CIcon name="cil-dollar" /></CButton></CInputGroupAppend>
                          </CInputGroup>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel htmlFor="description">Description</CLabel>
                          <CTextarea readOnly value={policy?.description || ''} rows="5" id="description" type="text"></CTextarea>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="benefit">Benefit</CLabel>
                          <CTextarea readOnly value={policy?.benefit || ''} rows="5" id="benefit" type="text"></CTextarea>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CTabPane>
                  <CTabPane data-tab="company">
                    <CRow>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel htmlFor="company">Insurance Company</CLabel>
                          <CInput readOnly value={policy?.insCompany?.insCompanyName || ''} id="company" />
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="companyWeb">Website</CLabel>
                          <CInput readOnly value={policy?.insCompany?.url || ''} id="companyWeb" />
                        </CFormGroup>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="companyEmail">Email</CLabel>
                              <CInput readOnly value={policy?.insCompany?.email || ''} id="companyEmail" />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="companyPhone">Phone</CLabel>
                              <CInput readOnly value={policy?.insCompany?.phone || ''} id="companyPhone" />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CFormGroup>
                          <CLabel htmlFor="companyStr">Street</CLabel>
                          <CInput readOnly value={policy?.insCompany?.address?.street || ''} id="companyStr" />
                        </CFormGroup>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="companyDist">District</CLabel>
                              <CInput readOnly value={policy?.insCompany?.address?.district || ''} id="companyDist" />
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="companyPost">Postal Code</CLabel>
                              <CInput readOnly value={policy?.insCompany?.address?.postalCode || ''} id="companyPost" />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="companyCity">City</CLabel>
                              <CInput readOnly value={policy?.insCompany?.address?.city || ''} id="companyCity" />
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="companyCountry">Country</CLabel>
                              <CInput readOnly value={policy?.insCompany?.address?.country || ''} id="companyCountry" />
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
                            <CImg thumbnail id="companyPhoto" src={policy?.insCompany?.img} />
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
                          <CInput readOnly value={policy?.hospital?.hospitalName || ''} id="hospital" />
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="hospitalWeb">Website</CLabel>
                          <CInput readOnly value={policy?.hospital?.url || ''} id="hospitalWeb" />
                        </CFormGroup>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="hospitalEmail">Email</CLabel>
                              <CInput readOnly value={policy?.hospital?.email || ''} id="hospitalEmail" />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="hospitalPhone">Phone</CLabel>
                              <CInput readOnly value={policy?.hospital?.phone || ''} id="hospitalPhone" />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CFormGroup>
                          <CLabel htmlFor="hospitalStr">Street</CLabel>
                          <CInput readOnly value={policy?.hospital?.address?.street || ''} id="hospitalStr" />
                        </CFormGroup>
                        <CRow>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="hospitalDist">District</CLabel>
                              <CInput readOnly value={policy?.hospital?.address?.district || ''} id="hospitalDist" />
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="hospitalPost">Postal Code</CLabel>
                              <CInput readOnly value={policy?.hospital?.address?.postalCode || ''} id="hospitalPost" />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="hospitalCity">City</CLabel>
                              <CInput readOnly value={policy?.hospital?.address?.city || ''} id="hospitalCity" />
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="hospitalCountry">Country</CLabel>
                              <CInput readOnly value={policy?.hospital?.address?.country || ''} id="hospitalCountry" />
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
                            <CImg thumbnail id="hospitalPhoto" src={policy?.hospital?.img} />
                          </CFormGroup>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
            <CCardFooter>
              <CButton size="sm" onClick={requestPolicy} color="primary">Request</CButton>
              <CButton className="ml-2" type="reset" size="sm" color="danger">Cancel</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      </CForm>
    </CContainer>
  );
}

export default PolicyRequest;
