import React, { useState, useEffect } from 'react';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownDivider,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AxiosClient from 'src/api/AxiosClient';

const TheHeaderDropdownNotif = () => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);

  const FetchNotification = async (mounted) => {
    await AxiosClient.get("/Notifications").then(res => {
      console.log('Get data successfully: ', res);
      // console.log("Data Header:", Object.keys(res));
      if (mounted) {
        setNotifications(res);
        //setCount(res.lenght);
        setCount(notifications.filter(n => !n.status && !n.isActivity).length);
      }
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  }

  useEffect(() => {
    let mounted = true;
    FetchNotification(mounted);
    return () => mounted = false;
  }, [count])

  const notifyTime = (date) => {
    let now = new Date(Date.now());
    const oneDay = 24 * 60 * 60 * 1000;
    const notifyDate = new Date(date);
    const diffDays = Math.abs((now - notifyDate) / oneDay);

    if(diffDays < 1){
      return notifyDate.getHours() + ":" + notifyDate.getMinutes();
    }else if(diffDays > 1 && diffDays < 7 ){
      return notifyDate.getDay()+ " " + notifyDate.getHours() + ":" + notifyDate.getMinutes();
    }else if(diffDays >= 7 && diffDays <= 30 ){
      return notifyDate.getDate() + " " + notifyDate.getDay()+ " " + notifyDate.getHours() + ":" + notifyDate.getMinutes();
    }else {
      return notifyDate.toDateString() + " " + notifyDate.getHours() + ":" + notifyDate.getMinutes();
    }
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        <CBadge shape="pill" color="danger">{count}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have {count} unchecked notifications</strong>
        </CDropdownItem>
        {/* cil-user-unfollow */}
        <div className="custom-scrollbar">
          {notifications.map(notify => <CDropdownItem key={notify.id} href="#">
            <div className="message message-notify">
              <div className="pt-3 mr-3 float-left">
                <div className="c-avatar">
                  <CImg
                    src={notify.employee?.img}
                    className="c-avatar-img"
                    alt="admin@bootstrapmaster.com"
                  />
                  <span className="c-avatar-status bg-warning"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">{notify?.employee?.fname}</small>
                <small className="text-muted float-right mt-1">{notifyTime(notify.date)}</small>
              </div>
              <div className="text-truncate font-weight-bold">{notify.title}</div>
              <div className="small text-muted text-truncate">{notify.description}
              </div>
            </div>
          </CDropdownItem>)}
        </div>


        {/* <CDropdownItem><CIcon name="cil-user-follow" className="mr-2 text-success" /> New user registered</CDropdownItem>
        <CDropdownItem><CIcon name="cil-user-unfollow" className="mr-2 text-danger" /> User deleted</CDropdownItem>
        <CDropdownItem><CIcon name="cil-chart-pie" className="mr-2 text-info" /> Sales report is ready</CDropdownItem>
        <CDropdownItem><CIcon name="cil-basket" className="mr-2 text-primary" /> New client</CDropdownItem>
        <CDropdownItem><CIcon name="cil-speedometer" className="mr-2 text-warning" /> Server overloaded</CDropdownItem> */}
        <CDropdownDivider></CDropdownDivider>
        <CDropdownItem>
          <strong>View All Notifications</strong>
        </CDropdownItem>





        {/* <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Server</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>CPU Usage</b></small>
          </div>
          <CProgress size="xs" color="info" value={25} />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>Memory Usage</b></small>
          </div>
          <CProgress size="xs" color="warning" value={70} />
          <small className="text-muted">11444GB/16384MB</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>SSD 1 Usage</b></small>
          </div>
          <CProgress size="xs" color="danger" value={90} />
          <small className="text-muted">243GB/256GB</small>
        </CDropdownItem>*/}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif
