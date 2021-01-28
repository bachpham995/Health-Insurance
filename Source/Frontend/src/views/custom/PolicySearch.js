import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CFormGroup,
  CLabel, CInput,
  CInputGroupAppend,
  CButton,
  CInputGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CForm,
  CInputGroupPrepend,
  CDropdownHeader,
  CDataTable,
  CLink,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CTextarea,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CImg
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility';
import { useHistory } from 'react-router-dom';

const PolicySearch = () => {
  const [listCompanies, setListCompanies] = useState([]);
  const [listHospital, setListHospital] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [result, setResult] = useState([]);
  const [selectRecord, setSelectRecord] = useState({});
  const [show, setShow] = useState(false);
  const resultHeader = [{
    key: 'show_details',
    label: 'Actions',
    _style: { width: '5%' },
    sorter: false,
    filter: false
  }, {
    key: "policyId",
    label: '#',
    _style: { width: '5%' }
  }, "policyNumber", "policyName", "emi", "amount"];
  const [confirm, setConfirm] = useState(false);
  const history = useHistory();

  const fetchCompanies = async (mounted) => {
    try {
      const response = await AxiosClient.get("/" + "InsuranceCompanies");
      // console.log('Fetch data successfully: ', response);
      // console.log("Data Header:", Object.keys(response[0]));
      if (mounted) {
        setListCompanies(response);
      }
    } catch (error) {
      console.log('Failed to fetch data list: ', error);
    }
  }

  const fetchHospitals = async (mounted) => {
    try {
      const response = await AxiosClient.get("/" + "Hospitals");
      // console.log('Fetch data successfully: ', response);
      // console.log("Data Header:", Object.keys(response[0]));
      if (mounted) {
        setListHospital(response);
      }
    } catch (error) {
      console.log('Failed to fetch data list: ', error);
    }
  }

  useEffect(() => {
    let mounted = true;
    fetchCompanies(mounted);
    fetchHospitals(mounted);
    return () => mounted = false;
  }, [])

  const onChangeCompany = (event) => {
    setCompanyName(event.target.value);
  }

  const chooseCompany = (value) => {
    setCompanyName(value);
  }

  const onChangeHospital = (event) => {
    setHospitalName(event.target.value)
  }

  const chooseHistory = (value) => {
    setHospitalName(value);
  }

  const reset = () => {
    setCompanyName("");
    setHospitalName("");
    setSelectRecord(null);
    setResult([]);
  }

  const closePopup = () => {
    setSelectRecord(null);
    toggle();
  }

  const performSearch = async (event) => {
    let form = event.target.form;
    let formData = new FormData();
    formData.append("policyNumber", form.policyNumber.value);
    formData.append("policyName", form.policyName.value);
    formData.append("companyName", form.company.value);
    formData.append("hospitalName", form.hospital.value);
    formData.append("minEmi", form.minEmi.value ? parseFloat(form.minEmi.value) : 0);
    formData.append("maxEmi", form.maxEmi.value ? parseFloat(form.maxEmi.value) : 0);
    formData.append("maxAmount", form.maxAmount.value ? parseFloat(form.maxAmount.value) : 0);
    formData.append("minAmount", form.minAmount.value ? parseFloat(form.minAmount.value) : 0);

    await AxiosClient.post("/Policies/Search", formData,
      {
        headers: { 'content-type': 'Content-Type: multipart/form-data' }
      }).then(res => {
        // console.log(res)
        setResult(res);
      }).catch(err => {
        console.log(err);
        setResult([]);
      });
  }

  const viewRecord = (event, policy) => {
    toggle();
    setSelectRecord(policy);
  }

  const toggle = () => {
    setShow(!show);
  }

  const toggleConfirm = () => {
    setConfirm(!confirm);
  }

  const getFullAddress = (obj) => {
    let street = obj?.address?.street != null ? obj.address.street + ", " : "";
    let country = obj?.address?.country != null ? obj.address.country : "";
    let district = obj?.address?.district != null ? obj.address.district + ", " : "";
    let city = obj?.address?.city != null ? obj.address.city + ", " : "";
    return street + district + city + country;
  }

  const finish = () => {
    history.push("/user/policyRequest/"+selectRecord.policyId);
  }

  return (
    <CContainer>
      <CRow>
        <CCol xs='12'>
          <CCard>
            <CForm>
              <CCardBody>
                <CRow>
                  <CCol xs='2'>
                    <CFormGroup>
                      <CLabel htmlFor="policyNumber">Policy Number</CLabel>
                      <CInput className="form-control-warning" id="policyNumber" type="search" placeholder="Policy Number" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="policyName">Policy Name</CLabel>
                      <CInput className="form-control-warning" id="policyName" type="search" placeholder="Policy Name" />
                    </CFormGroup>
                  </CCol>
                  <CCol xs='2'>
                    <CFormGroup>
                      <CLabel htmlFor="maxEmi">Max Emi</CLabel>
                      <CInput type="number" className="form-control-warning" id="maxEmi" placeholder="Max EMI" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="minEmi">Min Emi</CLabel>
                      <CInput type="number" className="form-control-warning" id="minEmi" placeholder="Min EMI" />
                    </CFormGroup>
                  </CCol>
                  <CCol xs='2'>
                    <CFormGroup>
                      <CLabel htmlFor="maxAmount">Max Amount</CLabel>
                      <CInput type="number" className="form-control-warning" id="maxAmount" placeholder="Max Amount" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="minAmount">Min Amount</CLabel>
                      <CInput type="number" className="form-control-warning" id="minAmount" placeholder="Min Amount" />
                    </CFormGroup>
                  </CCol>
                  <CCol xs='6'>
                    <CFormGroup>
                      <CLabel htmlFor="company">Insurance Company</CLabel>
                      <CInputGroup>
                        <CDropdown>
                          <CDropdownToggle caret={false} size="sm" color="success">
                            <CIcon name="cil-search"></CIcon>
                          </CDropdownToggle>
                          <CDropdownMenu className="custom-scrollbar" placement='bottom-start'>
                            {listCompanies?.map(comp => <CDropdownItem onClick={(event) => chooseCompany(comp.insCompanyName)} key={comp.insuranceCompanyId}>
                              {comp.insCompanyName}
                            </CDropdownItem>)}
                          </CDropdownMenu>
                        </CDropdown>
                        <CInput type="search" id="company" autoComplete="off" value={companyName} onChange={(event) => onChangeCompany(event)} placeholder="Company Name" />
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="hospital">Hospital</CLabel>
                      <CInputGroup>
                        <CDropdown>
                          <CDropdownToggle caret={false} size="sm" color="success">
                            <CIcon name="cil-search"></CIcon>
                          </CDropdownToggle>
                          <CDropdownMenu className="custom-scrollbar" placement='bottom-start'>
                            {listHospital?.map(hos => <CDropdownItem onClick={(event) => chooseHistory(hos.hospitalName)} key={hos.hospitalId}>
                              {hos.hospitalName}
                            </CDropdownItem>)}
                          </CDropdownMenu>
                        </CDropdown>
                        <CInput type="search" id="hospital" autoComplete="off" value={hospitalName} onChange={(event) => onChangeHospital(event)} placeholder="Hospital Name" />
                      </CInputGroup>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter>
                <CButton size="sm" color="primary" onClick={(event) => performSearch(event)}><CIcon name="cil-scrubber" />Search</CButton>
                <CButton className="ml-2" type="reset" onClick={(e) => reset()} size="sm" color="danger"><CIcon name="cil-ban" />Reset</CButton>
              </CCardFooter>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs='12'>
          <CCard>
            <CCardBody>
              <CDataTable
                items={result}
                fields={resultHeader}
                hover
                bordered
                sorter
                size="sm"
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  'show_details':
                    (item) => (
                      <td>
                        <CButton size='sm' color='warning' onClick={(event) => viewRecord(event, item)}>
                          View
                          </CButton>
                      </td>
                    )
                }
                }
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs='12'>
          <CModal closeOnBackdrop={false} backdrop={false} show={show} size='lg' onClose={closePopup}>
            <CForm>
              <CModalHeader>
                <CModalTitle>Details</CModalTitle>
              </CModalHeader>
              <CModalBody>
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
                            <CInput readOnly value={selectRecord?.policyNumber || ''} className="form-control-warning" id="number" />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">Policy Name</CLabel>
                            <CInput readOnly value={selectRecord?.policyName || ''} className="form-control-warning" id="name" />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="amount">Policy Emi</CLabel>
                            <CInputGroup>
                              <CInput readOnly value={selectRecord?.emi || ''} id="amount" type="number" />
                              <CInputGroupAppend><CButton size="sm" color="dark"><CIcon name="cil-dollar" /></CButton></CInputGroupAppend>
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="amount">Policy Amount</CLabel>
                            <CInputGroup>
                              <CInput readOnly value={selectRecord?.amount || ''} id="amount" type="number" />
                              <CInputGroupAppend><CButton size="sm" color="dark"><CIcon name="cil-dollar" /></CButton></CInputGroupAppend>
                            </CInputGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="description">Description</CLabel>
                            <CTextarea readOnly value={selectRecord?.description || ''} rows="5" id="description" type="text"></CTextarea>
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="benefit">Benefit</CLabel>
                            <CTextarea readOnly value={selectRecord?.benefit || ''} rows="5" id="benefit" type="text"></CTextarea>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane data-tab="company">
                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="company">Insurance Company</CLabel>
                            <CInput readOnly value={selectRecord?.insCompany?.insCompanyName || ''} id="company" />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="companyWeb">Website</CLabel>
                            <CInput readOnly value={selectRecord?.insCompany?.url || ''} id="companyWeb" />
                          </CFormGroup>
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="companyEmail">Email</CLabel>
                                <CInput readOnly value={selectRecord?.insCompany?.email || ''} id="companyEmail" />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="companyPhone">Phone</CLabel>
                                <CInput readOnly value={selectRecord?.insCompany?.phone || ''} id="companyPhone" />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                          <CFormGroup>
                            <CLabel htmlFor="companyStr">Street</CLabel>
                            <CInput readOnly value={selectRecord?.insCompany?.address?.street || ''} id="companyStr" />
                          </CFormGroup>
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="companyDist">District</CLabel>
                                <CInput readOnly value={selectRecord?.insCompany?.address?.district || ''} id="companyDist" />
                              </CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="companyPost">Postal Code</CLabel>
                                <CInput readOnly value={selectRecord?.insCompany?.address?.postalCode || ''} id="companyPost" />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="companyCity">City</CLabel>
                                <CInput readOnly value={selectRecord?.insCompany?.address?.city || ''} id="companyCity" />
                              </CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="companyCountry">Country</CLabel>
                                <CInput readOnly value={selectRecord?.insCompany?.address?.country || ''} id="companyCountry" />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCol>
                        <CCol xs="6">
                          <CRow>
                            <CFormGroup>
                              <CLabel >Photo</CLabel>
                            </CFormGroup>
                            <CFormGroup>
                              <CImg className="mt-4" thumbnail id="companyPhoto" src={selectRecord?.insCompany?.img} />
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
                            <CInput readOnly value={selectRecord?.hospital?.hospitalName || ''} id="hospital" />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="hospitalWeb">Website</CLabel>
                            <CInput readOnly value={selectRecord?.hospital?.url || ''} id="hospitalWeb" />
                          </CFormGroup>
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="hospitalEmail">Email</CLabel>
                                <CInput readOnly value={selectRecord?.hospital?.email || ''} id="hospitalEmail" />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="hospitalPhone">Phone</CLabel>
                                <CInput readOnly value={selectRecord?.hospital?.phone || ''} id="hospitalPhone" />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                          <CFormGroup>
                            <CLabel htmlFor="hospitalStr">Street</CLabel>
                            <CInput readOnly value={selectRecord?.hospital?.address?.street || ''} id="hospitalStr" />
                          </CFormGroup>
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="hospitalDist">District</CLabel>
                                <CInput readOnly value={selectRecord?.hospital?.address?.district || ''} id="hospitalDist" />
                              </CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="hospitalPost">Postal Code</CLabel>
                                <CInput readOnly value={selectRecord?.hospital?.address?.postalCode || ''} id="hospitalPost" />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="hospitalCity">City</CLabel>
                                <CInput readOnly value={selectRecord?.hospital?.address?.city || ''} id="hospitalCity" />
                              </CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="hospitalCountry">Country</CLabel>
                                <CInput readOnly value={selectRecord?.hospital?.address?.country || ''} id="hospitalCountry" />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCol>
                        <CCol xs="6">
                          <CRow>
                            <CFormGroup>
                              <CLabel >Photo</CLabel>
                            </CFormGroup>
                            <CFormGroup>
                              <CImg className="mt-4" thumbnail id="hospitalPhoto" src={selectRecord?.hospital?.img} />
                            </CFormGroup>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              </CModalBody>
              <CModalFooter>
                <CButton onClick={toggleConfirm} size="sm" color="primary">Request</CButton>
                <CButton className="ml-2" type="reset" onClick={closePopup} size="sm" color="danger">Cancel</CButton>
              </CModalFooter>
            </CForm>
          </CModal>
          <CModal show={confirm}  onClose={toggleConfirm} closeOnBackdrop={false} backdrop={false}>
                <CModalHeader>Confirm</CModalHeader>
                  <CModalBody>
                    Are you sure to request this Policy ?
                  </CModalBody>
                <CModalFooter>
                  <CButton className="mr-1" onClick={finish} color="primary">Yes</CButton>
                  <CButton
                    color="secondary"
                    onClick={toggleConfirm}
                  >Cancel</CButton>
                </CModalFooter>
              </CModal>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default PolicySearch;
