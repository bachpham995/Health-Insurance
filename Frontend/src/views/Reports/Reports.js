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
    CIcon,
    CInput,
    CForm
} from '@coreui/react'
import AxiosClient from "src/api/AxiosClient"
import Utility from 'src/api/Utility'
import DatePicker from 'react-date-picker'
// import Moment from 'react-moment';
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
    const [tableSetDateDate, setTableSetDateData] = useState([]);
    const [companySelect, setCompanySelect] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const setDate = (e) => {
        const datasSearchDate = [];
        if (startDate != null && endDate != null) {
            tableSetDateDate.map((item) => {
                let date = new Date(item.requestDate);
                let startDateCV = new Date(startDate);
                let endDateCV = new Date(endDate);
                const oneDay = 24 * 60 * 60 * 1000;
                const diffDays1 = Math.abs((date - startDateCV) / oneDay);
                const diffDays2 = Math.abs((date - endDateCV) / oneDay);
                if (diffDays1 > 0 && diffDays2 < 1) {

                    datasSearchDate.push(item);
                }
            });
            setTableSetDateData(datasSearchDate);
        }
        // setStartDate(0);
        // setEndDate(0);
    }

    useEffect(() => {
        const fetchDataList = async () => {
            // console.log(tableName)
            // console.log(tableQuery)
            try {
                const request = [];
                const datasSearchCompany = [];
                const response = await (await AxiosClient.get("/Policies"));
                console.log(response)
                response.map((item) => {
                    item.policyRequests.map((requestItem) => {
                        request.push(requestItem);
                    })
                });
                if (companySelect == null) {
                    setTableData(request);
                } else {
                    response.map((item) => {
                        if (item.insCompanyId == companySelect) {
                            item.policyRequests.map((requestItem) => {
                                datasSearchCompany.push(requestItem);
                            })
                        }
                    });
                    setTableData(datasSearchCompany);
                }
                if (startDate == null && endDate == null) {
                    setTableSetDateData(request);
                }
            } catch (error) {
                console.log('Failed to fetch data list: ', error);
            }
        }
        const fetchCompanys = async () => {
            try {
                const response = await AxiosClient.get("/InsuranceCompanies");
                console.log(response);
                setListCompany(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDataList();
        fetchCompanys();
    }, [companySelect], [startDate], [endDate]);

    return (
        <>
            <CRow>
                <CCol >
                    <CCard>
                        <CCardHeader>
                            <h3>{tableName} by Company</h3>
                        </CCardHeader>
                        <CCardHeader>
                            <CCol xl="5">
                                <CLabel htmlFor="insCompanyId">Choise Company</CLabel>
                                <CInputGroup>
                                    <CSelect
                                        onChange={(e) => setCompanySelect(e.target.value)}
                                        custom rows="2" id="insCompanyId"
                                    >
                                        {
                                            listCompany?.map(comp => (
                                                <option key={comp.insuranceCompanyId} value={comp.insuranceCompanyId} >{comp.insCompanyName}</option>
                                            ))
                                        }
                                    </CSelect>
                                    <CInputGroupAppend>
                                        <CButton size="sm" color="primary" onClick={() => setCompanySelect(null)}>Reset</CButton>
                                    </CInputGroupAppend>
                                </CInputGroup>
                            </CCol>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={tableData}
                                fields={fields}
                                striped
                                itemsPerPage={5}
                                pagination
                                scopedSlots={{
                                    'status':
                                        (item) => (
                                            <td>
                                                <CBadge color={getBadge(item.status ? "Active" : "Inactive")}>
                                                    {item.status ? "Active" : "Inactive"}
                                                </CBadge>
                                            </td>
                                        ),
                                    'button':
                                        (item) => (<>
                                            <CDropdown className="mt-1">
                                                <CLink to={Utility.Read(tableQuery, item)} >
                                                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                                        <CButton color={getBadge(item.status ? "Active" : "Banned")} disabled={item.status ? false : true}>
                                                            {"Print"}
                                                        </CButton>
                                                    </CCol>
                                                </CLink>
                                            </CDropdown>
                                        </>
                                        )
                                }}
                            >
                            </CDataTable>
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader>
                            <h3>{tableName} by Date </h3>
                        </CCardHeader>
                        <CCardHeader>
                            <CCol xl="5">
                                <CLabel>Choose the time period</CLabel>
                                <CInputGroup>
                                    <DatePicker
                                        isClearable
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="dd-MM-yyyy H:mm"
                                        autoComplete="Off"
                                        maxDate={new Date()}
                                        onChange={setStartDate}
                                        value={startDate} required
                                    />
                                    <CLabel>To</CLabel>
                                    <DatePicker
                                        isClearable
                                        showTimeSelect
                                        maxDate={new Date()}
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="dd-MM-yyyy H:mm"
                                        autoComplete="Off"
                                        onChange={setEndDate}
                                        value={endDate} required
                                    />
                                    <CInputGroupAppend>
                                        <CButton size="sm" color="success" onClick={(e) => setDate(null)}>Select</CButton>
                                    </CInputGroupAppend>
                                </CInputGroup>
                            </CCol>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={tableSetDateDate}
                                fields={fields}
                                striped
                                itemsPerPage={5}
                                pagination
                                scopedSlots={{
                                    'status':
                                        (item) => (
                                            <td>
                                                <CBadge color={getBadge(item.status ? "Active" : "Inactive")}>
                                                    {item.status ? "Active" : "Inactive"}
                                                </CBadge>
                                            </td>
                                        ),
                                    'button':
                                        (item) => (<>
                                            <CDropdown className="mt-1">
                                                <CLink to={Utility.Read(tableQuery, item)} >
                                                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                                        <CButton color={getBadge(item.status ? "Active" : "Banned")} disabled={item.status ? false : true}>
                                                            {"Print"}
                                                        </CButton>
                                                    </CCol>
                                                </CLink>
                                            </CDropdown>
                                        </>
                                        )
                                }}
                            >
                            </CDataTable>
                        </CCardBody>
                    </CCard>
                </CCol>

            </CRow>
        </>
    )
}

export default Reports
