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
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility';
import {
  useParams,
  useHistory
} from "react-router-dom";

const Feedback = ({ method }) => {
  const [feedback, setFeedBack] = useState(null);
  const { id } = useParams();
  const readOnly = ["get", "delete"];
  const [showConfirm, setShowConfirm] = useState(false);
  let history = useHistory();

  const toggle = () => {
    setShowConfirm(!showConfirm);
  }

  const goBack = () => {
    history.push("/admin/feedbacks");
  }


  useEffect(async () => {
    let mounted = true;
    await AxiosClient.get("/Feedbacks/" + id).then(res => {
      // console.log('Get data successfully: ', res);
      // console.log("Data Header:", Object.keys(res));
      setFeedBack(res);
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
    return () => mounted = false;
  }, []);


  const onSubmit = async (event) => {
    var form = event.target;
    const data = {...feedback};
    data.response = form.response.value;
    // console.log(data);
    event.preventDefault();
    switch (method) {
      case "put":
        await AxiosClient.put("/Feedbacks" + "/" + id, JSON.stringify(data),
          {
            headers: { 'content-type': 'application/json' }
          }).then(res => {
            Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Feedback", "Replied a User Feedback", 1, id, "feedbacks");
            Utility.newNotification(Utility.CurrentUser().id, feedback.employeeId, "Feedback", "Your Feedback has been replied", 0, id, "");
          }).catch(err => {
            console.log(err);
          });
        goBack();
        break;

      case "delete":
        await AxiosClient.delete("/Feedbacks" + "/" + id,
          {}
        ).then(res => {
          setShowConfirm(false);
          Utility.newNotification(Utility.CurrentUser().id, Utility.CurrentUser().id, "Feedback", "Removed a User Feedback", 1, id, "feedbacks");
        }).catch(err => {
          console.log(err);
        });
        goBack()
        break;

      default:
        break;

    }
    return true
  }
  const Layout = () => {
    switch (method) {
      case "delete":
      case "put":
      case "get":
        return (
          <>
            <CForm onSubmit={onSubmit} width="100%" wasValidated className="form-horizontal">
              <CRow >
                <CCol xs="12">
                  <CCard>
                    <CCardHeader>
                      <h3>{"FEEDBACK"}</h3>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol xs="6">
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="title">Title</CLabel>
                                <CInput defaultValue={feedback?.title} readOnly className="form-control-warning" id="title" placeholder="Enter your name" required />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="date">Date</CLabel>
                                <CInput defaultValue={feedback?.date} readOnly className="form-control-warning" id="date" placeholder="Enter your name" required />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="fname">Firstname</CLabel>
                                <CInput readOnly defaultValue={feedback?.employee?.fName} id="fname" type="text" placeholder="First name" required />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="lname">Lastname</CLabel>
                                <CInput readOnly defaultValue={feedback?.employee?.lName} id="lname" type="text" placeholder="Last name" required />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="email">Email</CLabel>
                                <CInput readOnly defaultValue={feedback?.employee?.email} id="email" type="email" placeholder="Email address" required />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel htmlFor="phone">Phone</CLabel>
                                <CInput readOnly defaultValue={feedback?.employee?.phone} id="phone" type="text" placeholder="Email address" required />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCol>
                        <CCol xs="6">
                          <CRow>
                            <CCol xs="12">
                              <CFormGroup>
                                <CLabel htmlFor="content">Content</CLabel>
                                <CTextarea readOnly rows="5" id="content" value={feedback?.content}></CTextarea>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                              <CFormGroup>
                                <CLabel htmlFor="response">Reply</CLabel>
                                <CTextarea readOnly={readOnly.includes(method)} rows="5" id="response" defaultValue={feedback?.response}></CTextarea>
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CCardBody>
                    <CCardFooter>
                      <CButton hidden={readOnly.includes(method) ? "hidden" : ""} type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                      <CButton className="ml-2" hidden={readOnly.includes(method) ? "hidden" : ""} type="reset" size="sm" color="danger"><CIcon name="cil-ban" />Reset</CButton>
                      <CButton className="ml-2" onClick={toggle} hidden={method !== "delete"} type="reset" size="sm" color="danger"><CIcon name="cil-trash" />Delete</CButton>
                      <CButton className="ml-2" onClick={goBack} size="m" color="warning">Back</CButton>
                    </CCardFooter>
                  </CCard>
                </CCol>
              </CRow>
              <CModal show={showConfirm} onClose={toggle}>
                <CModalHeader closeButton>Delete Confirm</CModalHeader>
                <CModalBody>
                  Are you sure to delete ?
                        </CModalBody>
                <CModalFooter>
                  <CButton type="submit" color="primary">Yes</CButton>{' '}
                  <CButton
                    color="secondary"
                    onClick={toggle}
                  >Cancel</CButton>
                </CModalFooter>
              </CModal>
            </CForm>
          </>
        );


      default:
        break;
    }
  }

  return Layout();
}

export default Feedback;
