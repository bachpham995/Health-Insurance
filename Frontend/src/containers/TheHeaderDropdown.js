import React, { useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CLink,
  CNavLink,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Common from 'src/services/Common'
import { Link, Route, useHistory } from 'react-router-dom'

const TheHeaderDropdown = ({ user }) => {
  const [show, setShow] = useState(false);
  const history = useHistory()

  const toggle = () => {
    setShow(!show);
  }

  const logOut = () => {
    Common.removeUserSession();
    history.push('/');
  }

  const profile = () => {
    history.push("/setting/profile");
  }

  return (
    <>
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg
              src={user?.img}
              className="c-avatar-img"
              alt={user?.email}
            />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Settings</strong>
          </CDropdownItem>
          <CDropdownItem onClick={profile}>
            <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
          {user?.role == 1 ? (<CDropdownItem to="/user/feedBacks">
            <CIcon name="cil-settings" className="mfe-2" />
            My Feedback
          </CDropdownItem>) : ""}
          <CDropdownItem divider />
          <CDropdownItem onClick={toggle}>
            <CIcon name="cil-account-logout" className="mfe-2" />
            Sign out
        </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <CModal show={show} onClose={toggle} closeOnBackdrop={false} >
        <CModalHeader closeButton>Confirm</CModalHeader>
        <CModalBody>
          Are you sure to sign out ?
                        </CModalBody>
        <CModalFooter>
          <CButton onClick={logOut} color="primary">Yes</CButton>{' '}
          <CButton
            color="secondary"
            onClick={toggle}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default TheHeaderDropdown
