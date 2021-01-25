import AxiosClient from 'src/api/AxiosClient';
import Common from 'src/services/Common';

export default class Utility {
  static REACT_APP_API_URL = "http://localhost:6969/api";
  static REACT_APP_SERVER_URL = "http://localhost:6969"

  static RCKey(record) {
    return record[Object.keys(record)[0]];
  }

  static Create = (model) => {
    return this.GetRecordAction(model) + "/create";
  }
  static Edit = (model, record) => {
    return this.GetRecordAction(model) + "/edit/" + this.RCKey(record);
  }

  static Read = (model, record) => {
    return this.GetRecordAction(model) + "/read/" + this.RCKey(record);
  }

  static Delete = (model, record) => {
    return this.GetRecordAction(model) + "/delete/" + this.RCKey(record);
  }

  static ActionDisplayName(method) {
    let action = "";
    switch (method) {
      case "delete":
        action = "DELETE";
        break;

      case "post":
        action = "CREATE";
        break;

      case "put":
        action = "UPDATE";
        break;

      default:
        break;
    }
    return action;
  }


  static CreateApproval = (model) => {
    return this.GetRecordAction(model) + "/create";
  }

  static GetRecordAction = (model) => {
    switch (model) {
      case "Company":
      case "InsuranceCompany":
      case "InsuranceCompanies":
        return '/admin/companies';

      case "PolicyRequest":
      case "PolicyRequests":
        return '/admin/requests';
      case "Reports":
        return '/admin/reports';
      case "ReportEmployee":
        return '/admin/reportEmployee';
      case "Hospital":
      case "Hospitals":
        return '/admin/hospitals';

      case "Employee":
      case "Employees":
        return '/admin/employees';

      case "Policy":
      case "Policies":
        return '/admin/policies';

      case "Feedback":
      case "Feedbacks":
        return '/admin/feedbacks';

      case "FeedBackUser":
        return '/user/feedBacks';
      default:
        return '/admin';
    }
  }

  static TableHeader = (model) => {
    switch (model) {
      case "UploadFile":
        return ["fileName", "type", "createTime"];
      case "InsuranceCompanies":
        return [{
          key: 'show_details',
          label: 'Actions',
          _style: { width: '5%' },
          sorter: false,
          filter: false
        }, {
          key: "insuranceCompanyId",
          label: '#',
          _style: { width: '5%' }
        }, "insCompanyName", "phone"]

      case "Policies":
        return [{
          key: 'show_details',
          label: 'Actions',
          _style: { width: '5%' },
          sorter: false,
          filter: false
        }, {
          key: "policyId",
          label: '#',
          _style: { width: '5%' }
        }, "policyNumber", "policyName"];

      case "Hospitals":
        return [{
          key: 'show_details',
          label: 'Actions',
          _style: { width: '5%' },
          sorter: false,
          filter: false
        }, {
          key: "hospitalId",
          label: '#',
          _style: { width: '5%' }
        }, "hospitalName", "phone"];

      case "Employees":
        return [{
          key: 'show_details',
          label: 'Actions',
          _style: { width: '5%' },
          sorter: false,
          filter: false
        }, "employeeId", "fName", "lName", "designation", "status"];
      case "PolicyRequests":
        return [{
          key: 'button',
          label: 'Approval',
          _style: { width: '15%' },
          sorter: false,
          filter: false
        }, {
          key: "requestId",
          label: '#',
          _style: { width: '5%' }
        }, "requestDate", "status", "emi", "amount"];
      case "Reports":
        return [{
          key: 'button',
          label: 'Print',
          _style: { width: '5%' },
          sorter: false,
          filter: false
        }, {
          key: "requestId",
          label: '#',
          _style: { width: '5%' }
        }, "requestDate", "status", "emi", "amount"];
      case "Feedback":
      case "Feedbacks":
        return ["feedBackReply", "feedbackId", "title", "date", "feedbackUser", "feedbackEmail"];
      case "FeedBackUser":
        return [
          {
            key: "feedbackId",
            label: '#',
            _style: { width: '5%' },
            sorter: false,
            filter: false
          }, "title", "content", "date",
          {
            key: "showReplyButton",
            label: 'Show',
            _style: { width: '5%' },
            sorter: false,
            filter: false
          }
        ];
      case "PolicyApprovals":
        return [
          //   {
          //   key: 'button',
          //   label: 'Print',
          //   //_style: { width: '5%' },
          //   sorter: false,
          //   filter: false
          // }
          , {
            key: 'policyRequest',
            label: "User",
            // _style: { width: '15%' }
          }, {
            key: "approvalDate",
            label: "Approved Date",
            // _style: { width: '15%' }
          }, {
            key: "status",
            label: "Status",
            // _style: { width: '10%' }
          }, "reason"];
      default:
        return [];
    }
  }

  static shouldShowAddBtn = (model) => {
    switch (model) {
      case "FeedBackUser":
      case "Feedbacks":
      case "UploadFile":
        return false;

      default:
        return true;
    }
  }

  static newNotification = async (fromId, toId, title, description, type, relatedId, relatedType) => {
    let data = {
      "title": title,
      "fromUserId": parseInt(fromId),
      "toUserId": parseInt(toId),
      "description": description,
      "date": new Date(Date.now()),
      "status": false,
      "type": parseInt(type),
      "relatedId": parseInt(relatedId),
      "relatedType": relatedType
    }

    return await AxiosClient.post("/Notifications", JSON.stringify(data),
      {
        headers: { 'content-type': 'application/json' }
      }).then(res =>{}
        // console.log("A Notification is created successfully")
      ).catch(err => {
        console.log(err)
      }
      );
  }

  static CurrentUser = () => {
    // return JSON.parse(sessionStorage.getItem("user"));
    return Common.getUser();
  }
}
