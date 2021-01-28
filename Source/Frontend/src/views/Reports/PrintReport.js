import React, { useState, useEffect} from 'react'
import {
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient';
import {
    useParams,
    useHistory
} from "react-router-dom";
import PrintingPortal from '../custom/PrintingPortal';
import ReportSkeleton from './ReportSkeleton';

const ReportDetail = ({ method }) => {
    const [request, setRequest] = useState(null);
    const [employee, setEmployee] = useState(null);
    const { id } = useParams();
    const readOnly = ["get"];
    let history = useHistory();
    const goBack = () => {
        history.push("/admin/reports");
    }
    useEffect(async () => {
        if (method !== "post" && request == null) {
            await AxiosClient.get("/PolicyRequests/" + id).then(res => {
                const address = res.employee.address.street +
                    " ," + res.employee.address.district +
                    " ," + res.employee.address.city +
                    " ," + res.employee.address.country;
                const name = res.employee.fName + " " + res.employee.lName;
                res.employee.fName = name;
                res.employee.address = address;
                setEmployee(res.employee);
                setRequest(res);
            }).catch(err => {
                console.log('Failed to Get data: ', err);
            });
        }

    }, []);
    const [isPrinting, setIsPrinting] = useState(false);
    return (
        <>
            <ReportSkeleton data={employee} requestData={request} />
            <CButton onClick={() => {
                setIsPrinting(true)
            }} hidden={readOnly.includes(method) ? "hidden" : ""} size="sm" color="primary" ><CIcon name="cil-print" /> Print</CButton>
            <CButton className="ml-2" onClick={goBack} size="m" color="warning">Back</CButton>
            {isPrinting && <PrintingPortal employee={employee} requestData={request} onPrintCancelled={() => setIsPrinting(false)} tableQuery="Report" />}
        </>
    );
};
export default ReportDetail;
