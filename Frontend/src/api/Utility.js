export default class Utility {
    static getModelHeader = (model) => {
        switch (model) {
            case "InsuranceCompanies":
                return ["insCompanyId", "insCompanyName", "phone"]

            case "Policies":
                return ["policyId", "policyNumber", "policyName", "amount", "emi", "description", "benefit"];
        
            default:
                return [];
        }
    }
}