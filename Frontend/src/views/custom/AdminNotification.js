
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const AdminNotification = ({ntfType, notifications, count}) => {
//   const [notifications, setNotifications] = useState([]);
//   const [count, setCount] = useState(0);  

//   const FetchNotification = async (mounted) => {
//     await AxiosClient.get("/Notifications").then(res => {
//       console.log('Get data successfully: ', res);
//       // console.log("Data Header:", Object.keys(res));
//       if (mounted) {
//         setNotifications(res.filter( n => n.toUserId == 1));
//         //setCount(res.lenght);
//       }
//     }).catch(err => {
//       console.log('Failed to Get data: ', err);
//     });
//   }

//   useEffect(()=>{
//     setCount(notifications.filter(n => !n.status && n.type == parseInt(ntfType)).length);
//   },[notifications]);


//   useEffect(() => {
//     let mounted = true;
//     FetchNotification(mounted);
//     return () => mounted = false;
//   }, [count])

  const notifyTime = (date) => {
    let now = new Date(Date.now());
    const oneDay = 24 * 60 * 60 * 1000;
    const notifyDate = new Date(date);
    const diffDays = Math.abs((now - notifyDate) / oneDay);
    if(now.getFullYear > notifyDate.getFullYear){
      return notifyDate.toLocaleDateString([],{day: 'numeric', month: 'long', year : 'numeric'})+ "   " + notifyDate.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
    }else if(diffDays < 1){
      return notifyDate.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
    }else if( diffDays >= 1 && diffDays < 7){
      return notifyDate.toLocaleDateString([],{weekday : 'long'})+ "   " + notifyDate.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
    }else {
      return notifyDate.toLocaleDateString([],{day: 'numeric', month: 'long'})+ "   " + notifyDate.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
    }
  }

  const Avatar = (notify) => {
    if(notify.fromUserId != null && notify.fromUser.img != null){
      return (<><CImg
        src={notify.fromUser?.img}
        className="c-avatar-img"
        alt={notify.fromUser?.email}
      />
      <span className="c-avatar-status bg-success"></span></>)
    }
    return <CIcon name="cil-lightbulb" className="success"></CIcon>
  }

  const ListIcon = (amount, type) => {
    switch (type) {
    case "0":
        return (<><CIcon name="cil-bell" /><CBadge shape="pill" color="danger">{amount}</CBadge></>)
        
    case "1":
        return (<><CIcon name="cil-list" /><CBadge shape="pill" color="warning">{amount}</CBadge></>)
            
    case "2":
        return (<><CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{amount}</CBadge></>)

    default:
        return (<><CIcon name="cil-list" /><CBadge shape="pill" color="warning">{amount}</CBadge></>)
    }
  }

  const Title = (amount, type) => {
    switch (type) {
        case "0":
            return "You have " + amount + "unchecked notifications";
          
        case "1":
            return "Your recent activities";
                
        case "2":
            return "You have " + amount + "unchecked feedbacks";

        default:
            return "You have " + amount + "unchecked notifications";
    }    
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        {ListIcon(count, ntfType)}
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>{Title(count, ntfType)}</strong>
        </CDropdownItem>
        {/* cil-user-unfollow */}
        <div className="custom-scrollbar">
          {notifications.map(notify => <CDropdownItem key={notify.id} href="#">
            <div className="message message-notify">
              <div className="mr-3 float-left">
                <div className="c-avatar">
                  {
                    Avatar(notify)
                  }

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
        {/* <CDropdownItem className="text-center">
          <strong>View All Notifications</strong>
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AdminNotification