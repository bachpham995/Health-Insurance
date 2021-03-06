import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import logos from "../assets/logoFinal2.png";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes';
import { _user_routes } from '../routes';
import { _admin_routes } from '../routes';

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownTasks
} from './index'

import Notification from 'src/views/custom/Notification';
import TheHeaderDropdownNotif from './TheHeaderDropdownNotif';
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility'
import Common from 'src/services/Common';

const TheHeader = ({ user }) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow);
  const [delay, setDelay] = useState(0);
  const [notifications_0, setNotifications_0] = useState([]);
  const [notifications_1, setNotifications_1] = useState([]);
  const [notifications_2, setNotifications_2] = useState([]);
  const [count_0, setCount_0] = useState(0);
  const [count_1, setCount_1] = useState(0);
  const [count_2, setCount_2] = useState(0);

  const getRoute = () => {
    if (Common.getToken() != null) {
      if (Common.getUser().role === 0) {
        return _admin_routes;
      } else {
        return _user_routes;
      }
    }
    return routes;
  }

  const FetchNotification = async (mounted) => {
    await AxiosClient.get("/Notifications").then(res => {
      if (mounted) {
        let notifications = res?.filter(n => n.toUserId == Common.getUser().id);
        let activities = res?.filter(n => n.fromUserId == Common.getUser().id);
        let feedbacks = res?.filter(n => n.toUserId == Common.getUser().id);
        setNotifications_0(GetNotificationsByType(notifications, 0));
        setNotifications_1(GetNotificationsByType(activities, 1));
        setNotifications_2(GetNotificationsByType(feedbacks, 2));
        setCount_0(CountNotificationsByType(notifications, 0));
        setCount_1(CountNotificationsByType(activities, 1));
        setCount_2(CountNotificationsByType(feedbacks?.filter(f => f.response == null || f.response == ""), 2));
      }
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  }

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const GetNotificationsByType = (data, type) => {
    return data?.filter(n => n.type == type).sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB - dateA;
    });
  }

  const CountNotificationsByType = (data, type) => {
    return data?.filter(n => !n.status && n.type == type).length;
  }

  useEffect(() => {
    let mounted = true;
    setNotifications_0(GetNotificationsByType(user?.toNotifications, 0));
    setNotifications_1(GetNotificationsByType(user?.fromNotifications, 1));
    setNotifications_2(GetNotificationsByType(user?.toNotifications, 2));
    setCount_0(CountNotificationsByType(user?.toNotifications, 0));
    setCount_1(CountNotificationsByType(user?.fromNotifications, 1));
    setCount_2(CountNotificationsByType(user?.toNotifications?.filter(f => f.response == null || f.response == ""), 2));
    let interval = setInterval(() => {
      FetchNotification(mounted);
    }, 3000);

    return () => { clearInterval(interval); mounted = false };
  }, []);

  return (
    <CHeader withSubheader colorScheme="dark">
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" src={logos} height="60" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          {user?.role == 0 ? (<CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>) : (<CHeaderNavLink to="/user/home">Homepage</CHeaderNavLink>)}
        </CHeaderNavItem>
        {user?.role == 1 ? (<CHeaderNavItem className="px-3" ><CHeaderNavLink to="/user/contactus">Contact Us</CHeaderNavLink></CHeaderNavItem>) : ""}
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <Notification onClick={(e) => console.log("aaaaaaa")} user={user} ntfType="0" notifications={notifications_0} count={count_0} />
        <Notification user={user} ntfType="1" notifications={notifications_1} count={count_1} />
        {/* {user?.role == 0 && <Notification user={user} ntfType="2" notifications={notifications_2} count={count_2} />} */}
        <TheHeaderDropdown user={user} />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={getRoute()}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
        </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
