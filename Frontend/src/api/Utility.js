export default class Utility {
    static TableHeader = (model) => {
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