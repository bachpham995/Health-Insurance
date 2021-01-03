export default class Utility {
    static TableHeader = (model) => {
        switch (model) {
            case "InsuranceCompanies":
                return ["insCompanyId", "insCompanyName", "phone"]

            case "Policies":
                return ["policyId", "policyNumber", "policyName"];

            case "Hospitals":
                return ["hospitalId", "hospitalName", "phone"];

            case "Employees":
                return ["employeeId", "fName", "lName", "designation", "status"];
        
            default:
                return [];
        }
    }
}