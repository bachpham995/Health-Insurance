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

import AdminNotification from 'src/views/custom/AdminNotification';
import TheHeaderDropdownNotif from './TheHeaderDropdownNotif';
import AxiosClient from 'src/api/AxiosClient';

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const [user, setUser] = useState(null);
  const [notifications_0, setNotifications_0] = useState([]);
  const [notifications_1, setNotifications_1] = useState([]);
  const [notifications_2, setNotifications_2] = useState([]);
  const [count_0, setCount_0] = useState(0);
  const [count_1, setCount_1] = useState(0);
  const [count_2, setCount_2] = useState(0);

  const FetchLoginUser = async (mounted) => {
    await AxiosClient.get("/Employees/1").then(res => {
      console.log('Get data successfully: ', res);
      // console.log("Data Header:", Object.keys(res));
      if (mounted) {
        setUser(res);
      }
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  }


  const FetchNotification = async (mounted) => {
    await AxiosClient.get("/Notifications").then(res => {
      console.log('Get data successfully: ', res);
      // console.log("Data Header:", Object.keys(res));
      if (mounted) {
        setNotifications_0(res.filter(n => n.toUserId == user.employeeId && n.type == 0));
        setNotifications_1(res.filter(n => n.toUserId == user.employeeId && n.type == 1));
        setNotifications_2(res.filter(n => n.toUserId == user.employeeId && n.type == 2));
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

  useEffect(()=>{
    let mounted = true;    
    FetchLoginUser(mounted)
    return () => mounted = false;
  },[])

  useEffect(() => {
    let mounted = true;    
    FetchNotification(mounted);
    return () => mounted = false;
  }, [count_0, count_1, count_2]);

  return (
    <CHeader withSubheader>
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
        <AdminNotification ntfType="0" notifications={notifications_0} count={count_0} />
        <AdminNotification ntfType="1" notifications={notifications_1} count={count_1} />
        <AdminNotification ntfType="2" notifications={notifications_2} count={count_2} />
        {/* <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>*/}
        <TheHeaderDropdown user={user}/>
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
