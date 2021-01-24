import {
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CContainer,
    CRow,
    CFormGroup,
    CLabel, CInput,
    CButton,
    CForm,
    CDataTable,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import AxiosClient from 'src/api/AxiosClient';

const CompanySearch = () => {
    const [result, setResult] = useState([]);
    const resultHeader = [{
        key: "insuranceCompanyId",
        label: "#",
        _style: { width: '5%' }
    },
    {
        key: "insCompanyName",
        label: "Company Name",
        _style: { width: '13%' , fontSize: '13px'}
    }
    ,"phone", "email", "street", "district", "city", "country", "postalCode"];
    const reset = () => {
        setResult([]);
    }
    const performSearch = async (event) => {
        let form = event.target.form;
        let formData = new FormData();
        formData.append("companyInsCompanyName",form.companyInsCompanyName.value.trim());
        formData.append("companyPhone", form.companyPhone.value.trim());
        formData.append("companyDistrict", form.companyDistrict.value.trim());
        formData.append("companyStreet", form.companyStreet.value.trim());
        formData.append("city", form.city.value.trim());
        formData.append("companyCountry", form.companyCountry.value.trim());
        formData.append("postalCode", form.postalCode.value.trim());
        formData.append("companyEmail", form.companyEmail.value.trim());
        await AxiosClient.post("/InsuranceCompanies/Search", formData,
            {
                headers: { 'content-type': 'Content-Type: multipart/form-data' }
            }).then(res => {
                console.log(res)
                setResult(res);
            }).catch(err => {
                console.log(err);
                setResult([]);
            });
    }
    return (
        <CContainer>
            <CRow>
                <CCol xs='12'>
                    <CCard>
                        <CForm>
                            <CCardBody>
                                <CRow>
                                    <CCol xs='3'>
                                        <CFormGroup>
                                            <CLabel htmlFor="companyInsCompanyName">Company Name</CLabel>
                                            <CInput className="form-control-warning" id="companyInsCompanyName" defaultValue="" type="search" placeholder="Company Name" />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="companyPhone">Phone</CLabel>
                                            <CInput className="form-control-warning" id="companyPhone" type="search" defaultValue=""  placeholder="Phone" />
                                        </CFormGroup>

                                    </CCol>
                                    <CCol xs='3'>
                                        <CFormGroup>
                                            <CLabel htmlFor="companyDistrict">District</CLabel>
                                            <CInput className="form-control-warning" id="companyDistrict" defaultValue=""  type="search" placeholder="District" />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="companyStreet">Street</CLabel>
                                            <CInput className="form-control-warning" id="companyStreet"  defaultValue="" type="search" placeholder="Street" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs='3'>
                                        <CFormGroup>
                                            <CLabel htmlFor="city">City</CLabel>
                                            <CInput className="form-control-warning" id="city" defaultValue=""  type="search" placeholder="City" />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="companyCountry">Country</CLabel>
                                            <CInput className="form-control-warning" id="companyCountry" defaultValue="" type="search" placeholder="Country" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs='3'>
                                        <CFormGroup>
                                            <CLabel htmlFor="postalCode">Postal Code</CLabel>
                                            <CInput className="form-control-warning" id="postalCode"  defaultValue=""  type="search" placeholder="Postal Code" />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="companyEmail">Email</CLabel>
                                            <CInput className="form-control-warning" id="companyEmail" defaultValue=""  type="search" placeholder="Email" />
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
                                    'street':
                                    (item) => (
                                      <td>
                                        {item.address.street} 
                                      </td>
                                    ),
                                    'district':
                                    (item) => (
                                      <td>
                                        {item.address.district} 
                                      </td>
                                    ),
                                    'city':
                                    (item) => (
                                      <td>
                                        {item.address.city} 
                                      </td>
                                    ),
                                    'country':
                                    (item) => (
                                      <td>
                                        {item.address.country} 
                                      </td>
                                    ),
                                    'postalCode':
                                    (item) => (
                                      <td>
                                        {item.address.postalCode} 
                                      </td>
                                    )
                                }
                                }
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
}

export default CompanySearch;
