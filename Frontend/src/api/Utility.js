export default class Utility {
    static TableHeader = (model) => {
        switch (model) {
            case "InsuranceCompanies":
                return [{
                  key: 'show_details',
                  label: 'Actions',
                  _style: { width: '5%' },
                  sorter: false,
                  filter: false
                },"insCompanyId", "insCompanyName", "phone"]

            case "Policies":
                return [{
                  key: 'show_details',
                  label: 'Actions',
                  _style: { width: '5%' },
                  sorter: false,
                  filter: false
                },"policyId", "policyNumber", "policyName"];

            case "Hospitals":
                return [{
                  key: 'show_details',
                  label: 'Actions',
                  _style: { width: '5%' },
                  sorter: false,
                  filter: false
                },"hospitalId", "hospitalName", "phone"];

            case "Employees":
                return [{
                  key: 'show_details',
                  label: 'Actions',
                  _style: { width: '5%' },
                  sorter: false,
                  filter: false
                },"employeeId", "fName", "lName", "designation", "status"];

            default:
                return [];
        }
    }
}
