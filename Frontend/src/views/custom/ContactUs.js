import React, { useState, useEffect } from 'react'
import {
    useHistory
} from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
    CTextarea,
    CCol,
    CContainer,
    CForm,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient'
import Utility from 'src/api/Utility'
import Common from 'src/services/Common';


const ContactUs = ({ method }) => {
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
                Utility.newNotification(Common.getUser().id, -1, "Feedback", "A user has submitted a feedback.", 0, res.feedbackId, "feedbacks");
                Utility.newNotification(Common.getUser().id, Common.getUser().id, "Feedback", "Submitted a Feedback", 1, res.feedbackId, "");
                goBack();
            }).catch(err => {
                console.log(err);
                goBack();
            });
        return;
    }
    return (
        <CContainer>
            <CCard className="bg-gradient-dark text-white">
                <CCardBody>
                    <CRow >
                        <CCol className='text-center'>
                            <h1 ><strong>CONTACT US</strong></h1>
                        </CCol>
                    </CRow>
                    <hr />
                    <CRow>
                        <CCol xl="5">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3192813592523!2d106.66408561488363!3d10.786840061950782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed2392c44df%3A0xd2ecb62e0d050fe9!2sFPT-Aptech%20Computer%20Education%20HCM!5e0!3m2!1svi!2s!4v1611595316540!5m2!1svi!2s" width="100%" height='300'></iframe>
                            <CRow className="text-center">
                                <CCol sm="5">
                                    <h4>
                                        <CIcon size="xl" name="cil-location-pin" />
                                        <p className="mt-2">ADDRESS</p>
                                    </h4>
                                    <p>590 Cách Mạng Tháng Tám, Phường 11, Quận 3, Thành phố Hồ Chí Minh, Việt Nam</p>
                                </CCol>
                                <CCol sm="3">
                                    <h4>
                                        <CIcon size="xl" name="cil-phone" />
                                        <p className="mt-2">PHONE</p>
                                    </h4>
                                    <p>0123456789</p>
                                </CCol>
                                <CCol sm="4">
                                    <h4>
                                        <CIcon size="xl" name="cil-envelope-closed" />
                                        <p className="mt-2">EMAIL</p>
                                    </h4>
                                    <p>APTECH.medical.care.group3@gmail.com</p>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol xl="7">
                            <h4 className="text-center">Feedback for us</h4>
                            <CForm onSubmit={onSubmit} wasValidated className="form-horizontal">
                                <CCard className="bg-gradient-light text-dark">
                                    <CCardBody>
                                        <h5>How would you rate the support you received?</h5>
                                        <hr />
                                        <CRow>
                                            <CCol>
                                                <CButton onClick={() => setCheck(true)} color="success" variant={checker == true ? "" : "outline"}>
                                                    <CIcon name="cil-lightbulb" /> Good, i'm satisfied
                                                </CButton>
                                            </CCol>
                                            <CCol>
                                                <CButton onClick={() => setCheck(false)} variant={checker == false ? "" : "outline"} color="danger"  >
                                                    <CIcon name="cil-lightbulb" /> Bad, i'm unsatisfied
                                            </CButton>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mt-4">
                                            <CCol>
                                                <h5>Add a comment about the quality of support you received (optional): </h5>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mt-4">
                                            <CCol>
                                                <CTextarea style={{ height: "150px" }} id="Content" required />
                                            </CCol>
                                        </CRow>
                                        <CRow className='mt-4'>
                                            <CCol>
                                                <CButton color="primary" type="submit" >
                                                    Submit
                                                </CButton>&ensp;
                                                <CButton onClick={() => goBack()} color="danger" type="submit" >
                                                    Cancel
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CForm>
                        </CCol>
                    </CRow >
                </CCardBody >
            </CCard >
        </CContainer >
    )
}

export default ContactUs
