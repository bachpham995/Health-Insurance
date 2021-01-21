import {
    CBadge,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCardTitle,
    CCol,
    CContainer,
    CDataTable,
    CPagination,
    CRow,
    CTabs,
    CInput,
    CFormGroup,
    CLabel,
    CTabPane,
    CImg,
    CTextarea,
    CInputGroupAppend,
    CInputGroup,
    CNavItem,
    CNavLink,
    CTabContent,
    CButton,
    CNav
} from "@coreui/react";
import { useState, useEffect } from "react";
import AxiosClient from 'src/api/AxiosClient';
import CIcon from '@coreui/icons-react';
import Tabs from "../base/tabs/Tabs";


const PolicyEmployee = () => {
    const [userPolicies, setUserPolicies] = useState([]);
    const [record, setRecord] = useState(null)
    const fields = [
        {
            key: "id",
            label: "#",
            _style: { width: "5%" }
        },
        {
            key: "duration",
            label: "Duration",
            _style: { width: "5%" }
        },
        {
            key: "effectiveDate",
            label: "Effective Date",
            _style: { width: "10%" }
        },
        {
            key: "expiredDate",
            label: "Expired Date",
            _style: { width: "10%" }
        },
        {
            key: "amount",
            label: "Amount",
            _style: { width: "15%" }
        },
        {
            key: "emi",
            label: "Emi",
            _style: { width: "15%" }
        },
        {
            key: "status",
            label: "Status",
            _style: { width: "10%" }
        }];

    const getBadge = (status) => {
        switch (status) {
            case 'Active': return 'success'
            case 'Inactive': return 'secondary'
            case 'Pending': return 'warning'
            case 'Banned': return 'danger'
            default: return 'primary'
        }
    }

    const getUserPolicies = async (mounted) => {
        await AxiosClient.get("/PolicyEmployees").then(res => {
            if (mounted) {
                // console.log(Object.keys(res[0]));
                setUserPolicies(res);
                if (res.length > 0) {
                    setRecord(res[0]);
                }
            }
        }).catch(err => {
            console.log(err.response);
        });
    }

    useEffect(() => {
        let mounted = true;
        getUserPolicies(mounted);
        return () => mounted = false;
    }, []);

    const selectRecord = (item) => {
        setRecord(item);
    }

    return (
        <CContainer>
            <CRow>
                <CCol md="12">
                    <CCard>
                        <CCardHeader>
                            <CCardTitle>My Policies</CCardTitle>
                        </CCardHeader>
                        <CCardBody>
                            <br></br>
                            <CDataTable
                                items={userPolicies}
                                fields={fields}
                                outlined                                
                                hover
                                size="sm"
                                clickableRows
                                onRowClick={selectRecord}
                                pagination
                                itemsPerPage={4}
                                scopedSlots={{
                                    'effectiveDate':
                                        (item) => (<td>
                                            {new Date(item.effectiveDate).toDateString()}
                                        </td>),
                                    'expiredDate':
                                        (item) => (<td>
                                            {new Date(item.expiredDate).toDateString()}
                                        </td>),
                                    'duration':
                                        (item) => (<td>
                                            {item.duration} Months
                                        </td>),
                                    'amount':
                                        (item) => (<td>
                                            {item.amount} $
                                        </td>),
                                    'emi':
                                        (item) => (<td>
                                            {item.emi} $
                                        </td>),
                                    'status':
                                        (item) => (<td>
                                            <CBadge color={getBadge(item.status ? "Active" : "Banned")}>
                                                {item.status ? "In Term" : "Expired"}
                                            </CBadge>
                                        </td>),
                                }} />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <CCard hidden={record == null}>
                        <CCardBody>
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
                                                    <CInput readOnly value={record?.policy?.policyNumber || ''} className="form-control-warning" id="number" />
                                                </CFormGroup>
                                                <CFormGroup>
                                                    <CLabel htmlFor="name">Policy Name</CLabel>
                                                    <CInput readOnly value={record?.policy?.policyName || ''} className="form-control-warning" id="name" />
                                                </CFormGroup>
                                                <CFormGroup>
                                                    <CLabel htmlFor="amount">Policy Emi</CLabel>
                                                    <CInputGroup>
                                                        <CInput readOnly value={record?.policy?.emi || ''} id="amount" type="number" />
                                                        <CInputGroupAppend><CButton size="sm" color="dark"><CIcon name="cil-dollar" /></CButton></CInputGroupAppend>
                                                    </CInputGroup>
                                                </CFormGroup>
                                                <CFormGroup>
                                                    <CLabel htmlFor="amount">Policy Amount</CLabel>
                                                    <CInputGroup>
                                                        <CInput readOnly value={record?.policy?.amount || ''} id="amount" type="number" />
                                                        <CInputGroupAppend><CButton size="sm" color="dark"><CIcon name="cil-dollar" /></CButton></CInputGroupAppend>
                                                    </CInputGroup>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="description">Description</CLabel>
                                                    <CTextarea readOnly value={record?.policy?.description || ''} rows="5" id="description" type="text"></CTextarea>
                                                </CFormGroup>
                                                <CFormGroup>
                                                    <CLabel htmlFor="benefit">Benefit</CLabel>
                                                    <CTextarea readOnly value={record?.policy?.benefit || ''} rows="5" id="benefit" type="text"></CTextarea>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CTabPane>
                                    <CTabPane data-tab="company">
                                        <CRow>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="company">Insurance Company</CLabel>
                                                    <CInput readOnly value={record?.policy?.insCompany?.insCompanyName || ''} id="company" />
                                                </CFormGroup>
                                                <CFormGroup>
                                                    <CLabel htmlFor="companyWeb">Website</CLabel>
                                                    <CInput readOnly value={record?.policy?.insCompany?.url || ''} id="companyWeb" />
                                                </CFormGroup>
                                                <CRow>
                                                    <CCol xs="6">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="companyEmail">Email</CLabel>
                                                            <CInput readOnly value={record?.policy?.insCompany?.email || ''} id="companyEmail" />
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="6">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="companyPhone">Phone</CLabel>
                                                            <CInput readOnly value={record?.policy?.insCompany?.phone || ''} id="companyPhone" />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CFormGroup>
                                                    <CLabel htmlFor="companyStr">Street</CLabel>
                                                    <CInput readOnly value={record?.policy?.insCompany?.address?.street || ''} id="companyStr" />
                                                </CFormGroup>
                                                <CRow>
                                                    <CCol xs="6">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="companyDist">District</CLabel>
                                                            <CInput readOnly value={record?.policy?.insCompany?.address?.district || ''} id="companyDist" />
                                                        </CFormGroup>
                                                        <CFormGroup>
                                                            <CLabel htmlFor="companyPost">Postal Code</CLabel>
                                                            <CInput readOnly value={record?.policy?.insCompany?.address?.postalCode || ''} id="companyPost" />
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="6">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="companyCity">City</CLabel>
                                                            <CInput readOnly value={record?.policy?.insCompany?.address?.city || ''} id="companyCity" />
                                                        </CFormGroup>
                                                        <CFormGroup>
                                                            <CLabel htmlFor="companyCountry">Country</CLabel>
                                                            <CInput readOnly value={record?.policy?.insCompany?.address?.country || ''} id="companyCountry" />
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
                                                        <CImg thumbnail id="companyPhoto" src={record?.policy?.insCompany?.img} />
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
                                                    <CInput readOnly value={record?.policy?.hospital?.hospitalName || ''} id="hospital" />
                                                </CFormGroup>
                                                <CFormGroup>
                                                    <CLabel htmlFor="hospitalWeb">Website</CLabel>
                                                    <CInput readOnly value={record?.policy?.hospital?.url || ''} id="hospitalWeb" />
                                                </CFormGroup>
                                                <CRow>
                                                    <CCol xs="6">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="hospitalEmail">Email</CLabel>
                                                            <CInput readOnly value={record?.policy?.hospital?.email || ''} id="hospitalEmail" />
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="6">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="hospitalPhone">Phone</CLabel>
                                                            <CInput readOnly value={record?.policy?.hospital?.phone || ''} id="hospitalPhone" />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CFormGroup>
                                                    <CLabel htmlFor="hospitalStr">Street</CLabel>
                                                    <CInput readOnly value={record?.policy?.hospital?.address?.street || ''} id="hospitalStr" />
                                                </CFormGroup>
                                                <CRow>
                                                    <CCol xs="6">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="hospitalDist">District</CLabel>
                                                            <CInput readOnly value={record?.policy?.hospital?.address?.district || ''} id="hospitalDist" />
                                                        </CFormGroup>
                                                        <CFormGroup>
                                                            <CLabel htmlFor="hospitalPost">Postal Code</CLabel>
                                                            <CInput readOnly value={record?.policy?.hospital?.address?.postalCode || ''} id="hospitalPost" />
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="6">
                                                        <CFormGroup>
                                                            <CLabel htmlFor="hospitalCity">City</CLabel>
                                                            <CInput readOnly value={record?.policy?.hospital?.address?.city || ''} id="hospitalCity" />
                                                        </CFormGroup>
                                                        <CFormGroup>
                                                            <CLabel htmlFor="hospitalCountry">Country</CLabel>
                                                            <CInput readOnly value={record?.policy?.hospital?.address?.country || ''} id="hospitalCountry" />
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
                                                        <CImg thumbnail id="hospitalPhoto" src={record?.policy?.hospital?.img} />
                                                    </CFormGroup>
                                                </CRow>
                                            </CCol>
                                        </CRow>
                                    </CTabPane>
                                </CTabContent>
                            </CTabs>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );

}

export default PolicyEmployee;