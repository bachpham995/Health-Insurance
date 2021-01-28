import React, { useState, useEffect, useRef, forwardRef, lazy } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility';
import {
  useParams,
  useHistory
} from "react-router-dom";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))



const Dashboard = () => {
  //Count
  const [countEmplopyee, setCountEmployee] = useState(null);
  const [countApproval, setCountApproval] = useState(null);
  const [countFeedback, setCountFeedback] = useState(null);
  const [countRequest, setCountRequest] = useState(null);

  // Get new in date 
  const [newEmpInDates, setNewEmpInDates] = useState([]);
  const [newApInDates, setApInDates] = useState([]);
  const [newFbInDates, setFbInDates] = useState([]);
  const [newRqInDates, setRqInDates] = useState([]);

  const date = new Date().getTime();

  const history = useHistory();

  const check = (minus) => {
    const check = Math.floor(minus / (1000 * 60 * 60 * 24));
    return check
  }

  const getEmployees = async (mounted) => {
    await AxiosClient.get("/Employees").then(res => {
      console.log('Get data successfully: ', res);
     if(mounted){
      setNewEmpInDates(res);
     }
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  }

  const getApprovals = async (mounted) => {
    await AxiosClient.get("/PolicyApprovals").then(res => {
      // console.log('Get data successfully: ', res);
      if (mounted = true) {
        setApInDates(res);
      }
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  }
  const getFeedbacks = async (mounted) => {
    await AxiosClient.get("/Feedbacks").then(res => {
      // console.log('Get data successfully: ', res);
      // console.log("Data Header:", Object.keys(res));

      if (mounted = true) {
        setFbInDates(res);
      }
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  }
  const getRequests = async (mounted) => {
    await AxiosClient.get("/PolicyRequests").then(res => {
      // console.log('Get data successfully: ', res);
      // console.log("Data Header:", Object.keys(res));
      if (mounted = true) {
        setRqInDates(res)
      }
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  }

  const onClickHandel = (e, string) => {
    console.log(string);
    switch (string) {
      case "Feedback": return history.push(`/admin/feedbacks/read/${e}`);
      case "Request": return history.push(`/admin/requests/read/${e}`);
      case "Employee": return history.push(`/admin/employees/read/${e}`);
    }

  }

  useEffect(() => {
    let mounted = true;
    getEmployees(mounted);
    getApprovals(mounted);
    getFeedbacks(mounted);
    getRequests(mounted);
    return () => mounted = false;
  }, []);

  return (
    <>
      <WidgetsDropdown employeeNumber={newEmpInDates.length}
        approvalNumber={newApInDates.length}
        feedbackNumber={newFbInDates.length}
        requestNumber={newRqInDates.length} />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              New Information
            </CCardHeader>
            <CCardBody>
              <h6>Employees join in date</h6>
              <CRow xs="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h5 hidden={newEmpInDates?.filter(e => (check(date - new Date(e.joinDate).getTime()) == 0)).length != 0 ? true : false} > Don't have a Employee join to date</h5>
              </CRow>
              <div hidden={newEmpInDates?.filter(e => (check(date - new Date(e.joinDate).getTime()) == 0)).length != 0 ? false : true}>
                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center"><CIcon name="cil-people" /></th>
                      <th>User Name</th>
                      <th  >Designation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newEmpInDates?.filter(e => (check(date - new Date(e.joinDate).getTime()) == 0)).map((emp, index) => {
                      return (
                        <tr key={index}
                          onClick={() => onClickHandel(emp?.employeeId, "Employee")
                          }
                        >
                          <td className="text-center">
                            <div className="c-avatar">
                              <img src={emp?.img || ''} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                              <span className="c-avatar-status bg-success"></span>
                            </div>
                          </td>
                          <td>
                            <div>{`${emp?.lName || ''} ${emp?.fName || ''}`}</div>
                            <div className="small text-muted">
                              Registered: {`${emp.joinDate}`}
                            </div>
                          </td>
                          <td>
                            <div>{`${emp?.designation || ''}`}</div>
                          </td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                </table>
              </div>
              <br />
              <h6>New FeedBack</h6>
              <CRow xs="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h5 hidden={newFbInDates?.filter(fb => (check(date - new Date(fb.date).getTime()) == 0)).length != 0 ? true : false} > Don't have a new Feedback</h5>
              </CRow>
              <div hidden={newFbInDates?.filter(fb => (check(date - new Date(fb.date).getTime()) == 0)).length != 0 ? false : true} >
                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center"><CIcon name="cil-people" /></th>
                      <th>User Name</th>
                      <th  >Title</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newFbInDates?.filter(fb => (check(date - new Date(fb.date).getTime()) == 0)).map((fb, index) => {
                      return (

                        <tr key={index}
                          onClick={() => onClickHandel(fb?.feedbackId, "Feedback")

                          }
                        >
                          <td className="text-center">
                            <div className="c-avatar">
                              <img src={fb?.employee?.img || ''} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                              <span className="c-avatar-status bg-success"></span>
                            </div>
                          </td>
                          <td>
                            <div>{`${fb?.employee?.lName || ''} ${fb?.employee?.fName || ''}`}</div>
                            <div className="small text-muted">
                              Registered: {`${fb.date}`}
                            </div>
                          </td>
                          <td>
                            <div>{`${fb?.title || ''}`}</div>
                          </td>
                          <td>
                            <div className="text-center" >
                              <CButton
                                disabled={true}
                                color={fb?.response != null ? "success" : "warning"}
                              >
                                {fb?.response != null ? "Feedback" : "Waiting"}
                              </CButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                </table>
              </div>
              <br />
              <h6>New Request</h6>
              <CRow xs="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h5 hidden={newRqInDates?.filter(res => (check(date - new Date(res.requestDate).getTime()) == 0)).length != 0 ? true : false} > Don't have a new Request</h5>
              </CRow>
              <div hidden={newRqInDates?.filter(res => (check(date - new Date(res.requestDate).getTime()) == 0)).length != 0 ? false : true}>
                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center"><CIcon name="cil-people" /></th>
                      <th>User Name</th>
                      <th  >Note</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newRqInDates?.filter(res => (check(date - new Date(res.requestDate).getTime()) == 0)).map((rq, index) => {
                      return (

                        <tr key={index}
                          onClick={() => onClickHandel(rq?.requestId, "Request")
                          }
                        >
                          <td className="text-center">
                            <div className="c-avatar">
                              <img src={rq?.employee?.img || ''} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                              <span className="c-avatar-status bg-success"></span>
                            </div>
                          </td>
                          <td>
                            <div>{`${rq?.employee?.lName || ''} ${rq?.employee?.fName || ''}`}</div>
                            <div className="small text-muted">
                              Request Date: {`${rq.requestDate}`}
                            </div>
                          </td>
                          <td>
                            <div>{`${rq?.note || 'Employees do not leave a message'}`}</div>
                          </td>
                          <td>
                            <div className="text-center" >
                              <CButton
                                disabled={true}
                                color={rq?.status == 0
                                  ? "warning" : rq?.status == 1
                                    ? "success" : "danger"}
                              >
                                {rq?.status == 0
                                  ? "Waiting" : rq?.status == 1
                                    ? "Approval" : "Reject"}
                              </CButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                </table>
              </div>
              <br />
              <h6>New Approvals</h6>
              <CRow xs="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h5 hidden={newApInDates?.filter(a => (check(date - new Date(a.approvalDate).getTime()) == 0)).length != 0 ? true : false} > Don't have a new Approval</h5>
              </CRow>
              <div hidden={newApInDates?.filter(a => (check(date - new Date(a.approvalDate).getTime()) == 0)).length != 0 ? false : true}>
                <table className="table  table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center"><CIcon name="cil-people" /></th>
                      <th>User Name</th>
                      <th  >Approval Date</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newApInDates?.filter(a => (check(date - new Date(a.approvalDate).getTime()) == 0)).map((arv, index) => {
                      return (
                        <tr key={index}
                          onClick={() => onClickHandel(arv?.approvalId, "Approval")
                          }
                        >
                          <td className="text-center">
                            <div className="c-avatar">
                              <img src={arv?.policyRequest?.employee.img || ''} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                              <span className="c-avatar-status bg-success"></span>
                            </div>
                          </td>
                          <td>
                            <div>{`${arv?.policyRequest?.employee?.lName || ''} ${arv?.policyRequest?.employee?.fName || ''}`}</div>
                            <div className="small text-muted">
                              Request Date: {`${arv.policyRequest?.requestDate}`}
                            </div>
                          </td>
                          <td>
                            <div>{`${arv?.approvalDate || ''}`}</div>
                          </td>
                          <td>
                            <div className="text-center" >
                              <CButton
                                disabled={true}
                                color={arv?.status ? "success" : "danger"}
                              >
                                {arv?.status ? "Approval" : "Reject"}
                              </CButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                </table>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
