import React from 'react';
import CIcon from '@coreui/icons-react';

const _user_nav = [
    {
        _tag: 'CSidebarNavTitle',
        _children: ['CLIENT']
    },
    {

        _tag: 'CSidebarNavDropdown',
        name: 'Management',
        icon: 'cil-layers',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: <div className=""><CIcon className="mr-3" name="cil-building" />Company</div>,
                to: '/admin/companies',

            },
            {
                _tag: 'CSidebarNavItem',
                name: <div className=""><CIcon className="mr-3" name="cil-hospital" />Hospital</div>,
                to: '/admin/hospitals',

            }, {
                _tag: 'CSidebarNavItem',
                name: <div className=""><CIcon className="mr-3" name="cil-spreadsheet" />Policy</div>,
                to: '/admin/policies',
            },
            {
                _tag: 'CSidebarNavItem',
                name: <div className=""><CIcon className="mr-3" name="cil-user" />Employee</div>,
                to: '/admin/employees',

            },
            {
                _tag: 'CSidebarNavItem',
                name: <div className=""><CIcon className="mr-3" name="cil-swap-vertical" />Request</div>,
                to: '/admin/requests',

            },
            {
                _tag: 'CSidebarNavItem',
                name: <div className=""><CIcon className="mr-3" name="cil-check" />Approval</div>,
                to: '/admin/approvals',

            },
            {
                _tag: 'CSidebarNavItem',
                name: <div className=""><CIcon className="mr-3" name="cil-envelope-letter" />Feedback</div>,
                to: '/admin/feedbacks',
            }
        ]
    }
    , {
        _tag: 'CSidebarNavDropdown',
        name: 'Utility',
        icon: 'cil-calculator',
        _children: [
            {
                _tag: 'CSidebarNavDropdown',
                name: <div className=""><CIcon className="mr-3" name="cil-folder" />Document</div>,
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: <div className=""><CIcon className="mr-3 ml-3" name="cil-storage" />List</div>,
                        to: '/admin/tool/documents'
                    },
                    {
                        _tag: 'CSidebarNavItem',
                        name: <div className=""><CIcon className="mr-3 ml-3" name="cil-cloud-upload" />Upload</div>,
                        to: '/admin/tool/uploadDocument'
                    }
                ]
            },
            {
                _tag: 'CSidebarNavItem',
                name: <div className=""><CIcon className="mr-3" name="cib-gmail" />Email</div>,
            },
            {
                _tag: 'CSidebarNavItem',
                name: <div className=""><CIcon className="mr-3" name="cil-calendar" />Calendar</div>,
            },
            {
                _tag: 'CSidebarNavItem',
                name: '',

            },]
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
