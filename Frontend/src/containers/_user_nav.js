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
        // to: '/admin/companySearch',

      },
      {
        _tag: 'CSidebarNavItem',
        name: <div className=""><CIcon className="mr-3" name="cil-hospital" />Hospital</div>,
        // to: '/user/hospitalSearch',

      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'My Policies',
    icon: 'cil-spreadsheet'
  }
  , {
    _tag: 'CSidebarNavDropdown',
    name: 'Request',
    icon: 'cil-swap-vertical',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: <div className=""><CIcon className="mr-3" name='cil-storage'/>My Requests</div>
      },
      {
        _tag: 'CSidebarNavItem',
        name: <div className=""><CIcon className="mr-3" name='cil-indent-increase'/>Request a Policy</div>
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Icons',
    route: '/icons',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  }
];
export default _user_nav
