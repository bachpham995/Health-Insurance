import React, { useState, useEffect, useRef, forwardRef } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CRow,
    CImg,
    CAlert,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Common from 'src/services/Common';
import AxiosClient from 'src/api/AxiosClient';
import {
    useParams,
    useHistory
} from "react-router-dom";

const CreateFeedBack = ({ method }) => {
    const [checker, setCheck] = useState(true);
    let history = useHistory();


    const goBack = () => {
        history.push("/user/feedBacks");
    }


    useEffect(async () => {

    }, [checker]);


    const onSubmit = async (event) => {
        var form = event.target;
        let date = new Date();

        event.preventDefault();
        const data = {
            "content": form.Content.value,
            "date": date,
            "response": null,
            "title": checker ? "Good, i'm satisfied" : "Bad, i'm unsatisfied",
            "employeeId": Common.getUser().id
        }

        await AxiosClient.post("/Feedbacks", JSON.stringify(data),
            {
                headers: { 'content-type': 'application/json' }
            }).then(res => {
                goBack();
            }).catch(err => {
                console.log(err);
            });
    }

    const Layout = () => {
        return (
            <>
                <CForm onSubmit={onSubmit} width="100%" wasValidated className="form-horizontal">
                    <CRow xl="12">
                        <CCol xs="12">
                            <CCard>
                                <CCardHeader>
                                    <h5>How would you rate the support you received?</h5>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow xl="6">
                                        <CCol xs="3">
                                            <CButton onClick={() => setCheck(true)} color="success" variant={checker == true ? "" : "outline"}>
                                                <CIcon name="cil-lightbulb" /> Good, i'm satisfied
                                            </CButton>
                                        </CCol>
                                        <CCol xs="3">
                                            <CButton onClick={() => setCheck(false)} variant={checker == false ? "" : "outline"} color="danger"  >
                                                <CIcon name="cil-lightbulb" /> Bad, i'm unsatisfied
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                    <CRow style={{ marginTop: "5px" }} >
                                        <CCol>
                                            <h5>Add a comment about the quality of support you received (optional): </h5>
                                        </CCol>
                                    </CRow>
                                    <CRow style={{ marginTop: "10px" }} >
                                        <CCol>
                                            <CTextarea style={{ height: "150px" }} id="Content" required />
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                                <CCardFooter>
                                    <CRow xs="3">
                                        <CCol xs="1">
                                            <CButton color="primary" type="submit" >
                                                Submit
                                            </CButton>
                                        </CCol>
                                        <CCol xs="1">
                                            <CButton onClick={() => goBack()} color="danger" type="submit" >
                                                Cancel
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CCardFooter>
                            </CCard>
                        </CCol>
                        <CCol >
                        </CCol>
                    </CRow>
                </CForm>
            </>
        );
    }
    return Layout();
}

export default CreateFeedBack;
