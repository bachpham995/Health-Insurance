import React, { useCallback, useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CImg,
    CContainer,
    CButton,
    CInput,
    CForm,
    CFormGroup,
    CLabel
} from '@coreui/react'
import {
    useParams,
    useHistory
} from "react-router-dom";
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient';
import PrintingPortal from '../custom/PrintingPortal';
import ReportEmployeeSkeleton from './ReportEmployeeSkeleton';


const ReportEmployeeDetails = () => {
    const [user, setUser] = useState(null);
    const [img, setImg] = useState(null);
    const [policies, setPolicies] = useState([]);
    const { id } = useParams();


    const getUser = useCallback(async () => {
        const res = await AxiosClient.get("/Employees/" + id, {
                headers: { "content-type": "text/plain" }
            });
        var format = new Date(res.doB);
        const doB = format.getDate() + "/" + format.getUTCMonth() + "/" + format.getFullYear();
        res.doB = doB;
        if (res.policyEmployees.length != 0) {
            for(let i =0;i< res.policyEmployees.length; i++){
                    const ress = await AxiosClient.get("/Policies/" + res.policyEmployees[i].policyId,
                        {
                            headers: { "content-type": "text/plain" }
                        });
               setPolicies(p => [...p,ress]);   
            }
        }
        if (res != null) {
            setUser(res);
            if (res.img != null) {
                setImg(res.img);
            }
        }
    },[]);
    let history = useHistory();
    const goBack = () => {
        history.push("/admin/employees");
    }

    useEffect(() => {
        getUser();
    }, [getUser]);
    const [isPrinting, setIsPrinting] = useState(false);
    return (
        <CContainer>
            <ReportEmployeeSkeleton user={user} policies={policies} img={img} />
            <CButton onClick={() => {
                setIsPrinting(true)
            }} size="sm" color="primary" ><CIcon name="cil-print" /> Print</CButton>
            <CButton className="ml-2" onClick={goBack} size="m" color="warning">Back</CButton>
            {isPrinting && <PrintingPortal employee={user} requestData={policies} onPrintCancelled={() => setIsPrinting(false)} tableQuery="Employee" img={img} />}
        </CContainer >
    )
}

export default ReportEmployeeDetails
