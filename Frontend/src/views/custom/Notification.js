
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import Utility from 'src/api/Utility'


const Notification = ({ ntfType, notifications, count }) => {
  let history = useHistory();

  const notifyTime = (date) => {
    let now = new Date(Date.now());
    const oneDay = 24 * 60 * 60 * 1000;
    const notifyDate = new Date(date);
    const diffDays = Math.abs((now - notifyDate) / oneDay);


    if (now.getFullYear > notifyDate.getFullYear) {
      return notifyDate.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' }) + "   " + notifyDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 1) {
      return notifyDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays >= 1 && diffDays < 7) {
      return notifyDate.toLocaleDateString([], { weekday: 'long' }) + "   " + notifyDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return notifyDate.toLocaleDateString([], { day: 'numeric', month: 'long' }) + "   " + notifyDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  const Avatar = (notify) => {
    switch (notify.type) {
      case 0:
        if (notify.fromUserId != null && notify.fromUser.img != null) {
          return (<><CImg
            src={notify.fromUser?.img}
            className="c-avatar-img mt-3"
            alt={notify.fromUser?.email}
          />
            <span className="c-avatar-status bg-success"></span></>)
        }
        return <CIcon name="cil-lightbulb" className="success"></CIcon>

      case 1:
        return <CIcon name="cil-list" className="success"></CIcon>

      case 2:
        return <CIcon name="cil-list" className="success"></CIcon>

      default:
        return <CIcon name="cil-lightbulb" className="success"></CIcon>
    }

  }

  const ListIcon = (amount, type) => {
    switch (type) {
      case "0":
        return (<><CIcon name="cil-bell" /><CBadge shape="pill" color="danger">{amount}</CBadge></>)

      case "1":
        return (<><CIcon name="cil-list-rich" /><CBadge shape="pill" color="warning">{amount}</CBadge></>)

      case "2":
        return (<><CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{amount}</CBadge></>)

      default:
        return (<><CIcon name="cil-list" /><CBadge shape="pill" color="warning">{amount}</CBadge></>)
    }
  }

  const Title = (amount, type) => {
    switch (type) {
      case "0":
        return "You have " + amount + " unchecked notifications";

      case "1":
        return "Your recent activities";

      case "2":
        return "You have " + amount + " unchecked feedbacks";

      default:
        return "You have " + amount + " unchecked notifications";
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
          {notifications?.map(notify => <CDropdownItem key={notify.id} >
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

export default Notification
