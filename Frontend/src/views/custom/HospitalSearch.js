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
    CDataTable
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import AxiosClient from 'src/api/AxiosClient';

const HospitalSearch = () => {
    const [result, setResult] = useState([]);
    // [HospitalId]
    //   ,[HospitalName]
    const resultHeader = [{
        key: "hospitalId",
        label: "#",
        _style: { width: '5%' }
    },
    {
        key: "hospitalName",
        label: "Hospital Name",
        _style: { width: '13%' , fontSize: '13px'}
    }
    ,"phone", "email", "street", "district", "city","country","postalCode"];
    useEffect(() => {
    }, [])

    const reset = () => {
        setResult([]);
    }
    const performSearch = async (event) => {
        let form = event.target.form;
        let formData = new FormData();
        formData.append("hospitalName",form.hospitalName.value.trim());
        formData.append("hospitalPhone", form.hospitalPhone.value.trim());
        formData.append("hospitalDistrict", form.hospitalDistrict.value.trim());
        formData.append("hospitalStreet", form.hospitalStreet.value.trim());
        formData.append("city", form.city.value.trim());
        formData.append("hospitalCountry", form.hospitalCountry.value.trim());
        formData.append("postalCode", form.postalCode.value.trim());
        formData.append("hospitalEmail", form.hospitalEmail.value.trim());
        await AxiosClient.post("/Hospitals/Search", formData,
            {
                headers: { 'content-type': 'Content-Type: multipart/form-data; charset=utf-8' }
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
                                            <CLabel htmlFor="hospitalName">Hospital Name</CLabel>
                                            <CInput className="form-control-warning" id="hospitalName" defaultValue="" type="search" placeholder="HospitalName" />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="hospitalPhone">Phone</CLabel>
                                            <CInput className="form-control-warning" id="hospitalPhone" type="search" defaultValue=""  placeholder="Phone" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs='3'>
                                        <CFormGroup>
                                            <CLabel htmlFor="hospitalDistrict">District</CLabel>
                                            <CInput className="form-control-warning" id="hospitalDistrict" defaultValue=""  type="search" placeholder="District" />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="hospitalStreet">Street</CLabel>
                                            <CInput className="form-control-warning" id="hospitalStreet"  defaultValue="" type="search" placeholder="Street" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs='3'>
                                        <CFormGroup>
                                            <CLabel htmlFor="city">City</CLabel>
                                            <CInput className="form-control-warning" id="city" defaultValue=""  type="search" placeholder="City" />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="hospitalCountry">Country</CLabel>
                                            <CInput className="form-control-warning" id="hospitalCountry" defaultValue="" type="search" placeholder="Country" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs='3'>
                                        <CFormGroup>
                                            <CLabel htmlFor="postalCode">Postal Code</CLabel>
                                            <CInput className="form-control-warning" id="postalCode"  defaultValue=""  type="search" placeholder="Postal Code" />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="hospitalEmail">Email</CLabel>
                                            <CInput className="form-control-warning" id="hospitalEmail" defaultValue=""  type="search" placeholder="Email" />
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

export default HospitalSearch;
