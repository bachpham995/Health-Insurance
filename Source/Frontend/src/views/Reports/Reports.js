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
    CInput,
    CForm
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from "src/api/AxiosClient"
import Utility from 'src/api/Utility'
import DatePicker from 'react-date-picker'
// import Moment from 'react-moment';


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
    }

    useEffect(() => {
        const fetchDataList = async () => {
            try {
                const request = [];
                const datasSearchCompany = [];
                const response = await AxiosClient.get("/Policies");
                response.map((item) => {
                    item.policyRequests.map((requestItem) => {
                        console.log(requestItem);
                        request.push(requestItem);

                    })
                });
                if (companySelect == null) {
                    setTableData(request);
                    console.log(tableData);
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


    // 1 Requesting , 2 Approval , 3 Recheck
    const checkInput = (statusCode) => {
        console.log(statusCode);
        var outPutString = "";
        if (statusCode == 0) {
            outPutString = "Requesting";
        }
        if (statusCode == 1) {
            outPutString = "Approval";
        }
        if (statusCode == 2) {
            outPutString = "Recheck";
        }
        return outPutString;
    }
    const getBadge = (status) => {
        switch (status) {
            case 0: return 'warning'
            case 1: return 'success'
            case 2: return 'danger'
        }
    }

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
                                                <CBadge color={getBadge(item.status)}>
                                                    {checkInput(item.status)}
                                                </CBadge>
                                            </td>
                                        ),
                                    'button':
                                        (item) => (<>
                                            <CDropdown className="mt-1">
                                                <CLink to={Utility.Read(tableQuery, item)} >
                                                    <CButton color={"primary"} disabled={item.status ? false : true}>
                                                        <CIcon name="cil-print" />
                                                    </CButton>
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
                                                <CBadge color={getBadge(item.status)}>
                                                    {checkInput(item.status)}
                                                </CBadge>
                                            </td>
                                        ),
                                    'button':
                                        (item) => (<>
                                            <CDropdown className="mt-1">
                                                <CLink to={Utility.Read(tableQuery, item)} >
                                                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                                        <CButton color={"primary"} disabled={item.status ? false : true}>
                                                            <CIcon name="cil-print" />
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
