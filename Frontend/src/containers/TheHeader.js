import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import routes from '../routes'

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownTasks
} from './index'

import Notification from 'src/views/custom/Notification';
import TheHeaderDropdownNotif from './TheHeaderDropdownNotif';
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility'

const TheHeader = ({user}) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow);
  const [delay, setDelay] = useState(0);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const [notifications_0, setNotifications_0] = useState([]);
  const [notifications_1, setNotifications_1] = useState([]);
  const [notifications_2, setNotifications_2] = useState([]);
  const [count_0, setCount_0] = useState(0);
  const [count_1, setCount_1] = useState(0);
  const [count_2, setCount_2] = useState(0);

  const GetNotificationsByType = (data, type) => {
    return data.filter(n => n.relatedId == 1 && n.type == type)
  }

  const FetchNotification = async (mounted) => {
    await AxiosClient.get("/Notifications").then(res => {
      // console.log('Get data successfully: ', res);
      // console.log("Data Header:", Object.keys(res[0]));
      if (mounted) {
        setNotifications_0(GetNotificationsByType(res, 0));
        setNotifications_1(GetNotificationsByType(res, 1));
        setNotifications_2(GetNotificationsByType(res, 2));
      }
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  }

  useEffect(() => {
    setCount_0(notifications_0.filter(n => !n.status && n.type == 0).length);
    setCount_1(notifications_1.filter(n => !n.status && n.type == 1).length);
    setCount_2(notifications_2.filter(n => !n.status && n.type == 2).length);
  }, [notifications_0, notifications_1, notifications_2]);



  useEffect(() => {
    //let mounted = true;
    //FetchNotification(mounted);
    //return () => mounted = false;
    const interval = setInterval(() => {
      setDelay(60000);
      FetchNotification(true);
    }, delay);
    return () => clearInterval(interval);
  }, [count_0, count_1, count_2]);

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
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <Notification ntfType="0" notifications={notifications_0} count={count_0} />
        <Notification ntfType="1" notifications={notifications_1} count={count_1} />
        <Notification ntfType="2" notifications={notifications_2} count={count_2} />
        {/* <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>*/}
        <TheHeaderDropdown user={user} />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
        </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
