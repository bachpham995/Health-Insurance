import React from 'react';
import CIcon from '@coreui/icons-react';

const _user_nav = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['CLIENT']
  },
  {

    _tag: 'CSidebarNavDropdown',
    name: 'Search',
    icon: 'cil-search',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: <div className=""><CIcon className="mr-3" name="cil-spreadsheet" />Policy</div>,
        to: '/user/policySearch',
      },
      {
        _tag: 'CSidebarNavItem',
        name: <div className=""><CIcon className="mr-3" name="cil-building" />Company</div>,
        to: '/user/companySearch',

      },
      {
        _tag: 'CSidebarNavItem',
        name: <div className=""><CIcon className="mr-3" name="cil-hospital" />Hospital</div>,
        to: '/user/hospitalSearch',
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'My Policies',
    icon: 'cil-spreadsheet',
    to: "/user/policyEmployees"
  }
  , {
    _tag: 'CSidebarNavDropdown',
    name: 'Request',
    icon: 'cil-swap-vertical',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: <div className=""><CIcon className="mr-3" name='cil-storage' />My Requests</div>,
        to: "/user/policyRequestList"
      },
      {
        _tag: 'CSidebarNavItem',
        name: <div className=""><CIcon className="mr-3" name='cil-indent-increase' />Request a Policy</div>,
        to: "/user/policyRequest"
      }
    ]
  }
];
export default _user_nav
