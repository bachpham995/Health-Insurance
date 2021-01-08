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
      case "InsuranceCompanies":
        return '/admin/companies';
      case "PolicyRequests":
        return '/admin/requests';
      case "Hospitals":
        return '/admin/hospitals';
      case "Employees":
        return '/admin/employees';

      case "Policies":
        return '/admin/policies';

      default :
        return '/admin'
    }
  }

  static TableHeader = (model) => {
    switch (model) {
      case "InsuranceCompanies":
        return [{
          key: 'show_details',
          label: 'Actions',
          _style: { width: '5%' },
          sorter: false,
          filter: false
        }, "insuranceCompanyId", "insCompanyName", "phone"]

      case "Policies":
        return [{
          key: 'show_details',
          label: 'Actions',
          _style: { width: '5%' },
          sorter: false,
          filter: false
        }, "policyId", "policyNumber", "policyName"];

      case "Hospitals":
        return [{
          key: 'show_details',
          label: 'Actions',
          _style: { width: '5%' },
          sorter: false,
          filter: false
        }, "hospitalId", "hospitalName", "phone"];

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
              _style: { width: '5%' },
              sorter: false,
              filter: false
          },"requestId","requestDate","status","note","emi","amount"];
          case "PolicyApprovals":
            return [{
                key: '',
                label: '', 
                _style: { width: '5%' },
                sorter: false,
                filter: false
            },"approvalId","approvalDate","status","reason","requestId"];
      default:
        return [];
    }
  }
}
