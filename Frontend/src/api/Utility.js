export default class Utility {
    static TableHeader = (model) => {
        switch (model) {
            case "InsuranceCompanies":
                return ["insCompanyId", "insCompanyName", "phone",{
                    key: 'show_details',
                    label: '',
                    _style: { width: '5%' },
                    sorter: false,
                    filter: false
                  }]

            case "Policies":
                return ["policyId", "policyNumber", "policyName",{
                    key: 'show_details',
                    label: '',
                    _style: { width: '5%' },
                    sorter: false,
                    filter: false
                  }];

            case "Hospitals":
                return ["hospitalId", "hospitalName", "phone",{
                    key: 'show_details',
                    label: '',
                    _style: { width: '5%' },
                    sorter: false,
                    filter: false
                  }];

            case "Employees":
                return ["employeeId", "fName", "lName", "designation", "status",{
                    key: 'show_details',
                    label: '',
                    _style: { width: '5%' },
                    sorter: false,
                    filter: false
                  }];
        
            default:
                return [];
        }
    }
}