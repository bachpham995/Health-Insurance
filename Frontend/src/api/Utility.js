export default class Utility {
  static RCKey(record){
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



  static GetRecordAction = (model) => {
    switch (model) {
      case "InsuranceCompanies":
        return '/admin/companies';
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

      default:
        return [];
    }
  }
}
