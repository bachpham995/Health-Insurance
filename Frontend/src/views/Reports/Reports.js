import React, { useEffect, useState } from 'react'
import {
    CButton,
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CDropdownToggle,
    CDropdownMenu,
    CDropdown,
    CCol,
    CDataTable,
    CRow,
    CLink,
    CInputGroupAppend,
    CInputGroup,
    CSelect,
    CLabel,
    CFormGroup

} from '@coreui/react'
import AxiosClient from "src/api/AxiosClient"
import Utility from 'src/api/Utility'

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}

const Reports = ({ tableName, tableQuery, color }) => {
    const fields = Utility.TableHeader(tableQuery);
    const [tableData, setTableData] = useState([]);
    const [listCompany, setListCompany] = useState([]);
    const [companySelect, setCompanySelect] = useState(null);

    useEffect(() => {
        const fetchDataList = async () => {
            try {
                if (companySelect = null) {
                    const response = await AxiosClient.get("/" + tableQuery);
                    console.log('Fetch data successfully: ', response);
                    console.log("Data Header:", Object.keys(response[0]));
                    setTableData(response);
                }
                const response = await AxiosClient.get("/Policiess");
                    console.log('Fetch data successfully: ', response);
                    console.log("Data Header:", Object.keys(response[0]));
                    setTableData(response);
            } catch (error) {
                console.log('Failed to fetch data list: ', error);
            }
        }
        const fetchCompanys = async () => {
            try {
                const response = await AxiosClient.get("/InsuranceCompanies");
                console.log('Fetch data successfully: ', response);
                console.log("Data Header:", Object.keys(response[0]));
                setListCompany(response);
            } catch (error) {
                console.log(error);
            }
        }

        fetchDataList();
        fetchCompanys();
    }, []);

    return (
        <>
            <CRow>
                <CCol >
                    <CCard>
                        <CCardHeader>
                            <h3>{tableName}</h3>
                        </CCardHeader>
                        <CCardHeader>
                            <CCol xl="3">
                                <CLabel htmlFor="insCompanyId">Choise Company</CLabel>
                                <CInputGroup>
                                    <CSelect
                                        // disabled={readOnly.includes("get") ? "disable" : ""}
                                        custom rows="2" id="insCompanyId"
                                    >
                                        {
                                            listCompany?.map(comp => (
                                                <option key={comp.insuranceCompanyId} value={comp.insuranceCompanyId}>{comp.insCompanyName}</option>
                                            ))
                                        }
                                    </CSelect>
                                    {/* <CInputGroupAppend>
                                            <CButton size="sm" color="success">Details</CButton>
                                        </CInputGroupAppend> */}
                                </CInputGroup>
                            </CCol>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={tableData}
                                fields={fields}
                                hover
                                bordered
                                responsive
                                dark={color !== "light"}
                                sorter
                                size="sm"
                                itemsPerPage={5}
                                pagination
                                columnFilter
                                scopedSlots={{
                                    'status':
                                        (item) => (
                                            <td>
                                                <CBadge color={getBadge(item.status ? "Active" : "Inactive")}>
                                                    {item.status ? "Active" : "Inactive"}
                                                </CBadge>
                                            </td>
                                        ),
                                    'show_details':
                                        (item) => (
                                            <td>
                                                <CDropdown className="">
                                                    <CDropdownToggle caret color="primary" size="sm">
                                                        Actions
                          </CDropdownToggle>
                                                    <CDropdownMenu placement='right'>
                                                        <CLink to={Utility.Read(tableQuery, item)}>
                                                            <CButton size="sm" variant="outline" color="info" className="ml-1">
                                                                Info
                              </CButton>
                                                        </CLink>
                                                        <CLink to={Utility.Edit(tableQuery, item)}>
                                                            <CButton size="sm" variant="outline" color="warning" className="ml-1">
                                                                Edit
                              </CButton>
                                                        </CLink>
                                                        <CLink to={Utility.Delete(tableQuery, item)}>
                                                            <CButton size="sm" variant="outline" color="danger" className="ml-1 mr-1">
                                                                Remove
                            </CButton>
                                                        </CLink>
                                                    </CDropdownMenu>
                                                </CDropdown>
                                            </td>
                                        )
                                }
                                }
                            ></CDataTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Reports
