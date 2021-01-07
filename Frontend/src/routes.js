import React from 'react';

// Extend
//Custom Datatable
const DataTable = React.lazy(() => import('./views/base/tables/DataTable'));
//Company
const Company = React.lazy(()=>import('./views/custom/Company'));
//Hospital
const Hospital = React.lazy(()=>import('./views/custom/Hospital'));
//Employee
const Employee = React.lazy(()=>import('./views/custom/Employee'));
//Request
const Request = React.lazy(()=> import('./views/base/Request/RequestEmployees'))

//Policy
const Policy = React.lazy(()=> import('./views/custom/Policy'))


//
const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  //Company
  { path: '/admin/companies', exact: true, name: 'Companies', component: DataTable, props:{tableName:"Insurance Companies", tableQuery: "InsuranceCompanies",color:"light"}},
  { path: '/admin/companies/create', exact: true, name: 'New Company', component : Company, props:{method : "post"}},
  { path: '/admin/companies/edit/:id', exact: true, name: 'Update Company', component : Company, props:{method : "put"}},
  { path: '/admin/companies/read/:id', exact: true, name: 'Info Company', component : Company, props:{method : "get"}},
  { path: '/admin/companies/delete/:id', exact: true, name: 'Delete Company', component : Company, props:{method : "delete"}},
  //Policy
  { path: '/admin/policies', exact: true, name: 'Policies', component : DataTable, props:{tableName:"Policies", tableQuery: "Policies",color:"light"}},
  { path: '/admin/policies/create', exact: true, name: 'New Policy', component : Policy, props:{method : "post"}},
  { path: '/admin/policies/edit/:id', exact: true, name: 'Update Policy', component : Policy, props:{method : "put"}},
  { path: '/admin/policies/read/:id', exact: true, name: 'Info Policy', component : Policy, props:{method : "get"}},
  { path: '/admin/policies/delete/:id', exact: true, name: 'Delete Policy', component : Policy, props:{method : "delete"}},
  //Hospital
  { path: '/admin/hospitals', exact: true, name: 'Hospitals', component : DataTable, props:{tableName:"Hospitals", tableQuery: "Hospitals",color:"light"}},
  { path: '/admin/hospitals/create', exact: true, name: 'New Hospital', component : Hospital, props:{method : "post"}},
  { path: '/admin/hospitals/edit/:id', exact: true, name: 'Update Hospital', component : Hospital, props:{method : "put"}},
  { path: '/admin/hospitals/read/:id', exact: true, name: 'Info Hospital', component : Hospital, props:{method : "get"}},
  { path: '/admin/hospitals/delete/:id', exact: true, name: 'Delete Hospital', component : Hospital, props:{method : "delete"}},
  //Employees
  { path: '/admin/employees', exact: true, name: 'Employees', component : DataTable, props:{tableName:"Employees", tableQuery: "Employees", color:"light"}},
  { path: '/admin/employees/create', exact: true, name: 'New Employee', component : Employee, props:{method : "post"}},
  { path: '/admin/employees/edit/:id', exact: true, name: 'Update Employee', component : Employee, props:{method : "put"}},
  { path: '/admin/employees/read/:id', exact: true, name: 'Info Employee', component : Employee, props:{method : "get"}},
  { path: '/admin/employees/delete/:id', exact: true, name: 'Delete Employee', component : Employee, props:{method : "delete"}},


  { path:'/admin/requests', exact: true, name: 'Requests', component : Request, props:{tableName:"Requests", tableQuery: "PolicyRequests", color:"light"}},

];

export default routes;
