import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Common from 'src/services/Common'
import { Route, useHistory } from 'react-router-dom'

const TheHeaderDropdown = ({user}) => {
  const historyy = useHistory()
  const logOut = ()=>{
    Common.removeUserSession();
    historyy.push('/');
  }

  return (
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
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-swap-horizontal" className="mfe-2" />
          Employee Site
        </CDropdownItem>        
        <CDropdownItem divider />
        <CDropdownItem onClick={logOut}>
          <CIcon name="cil-account-logout" className="mfe-2" />
            Sign out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
