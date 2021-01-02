export default class Utility {
    constructor(){

    }

    static getModelHeader = (model) => {
        switch (model) {
            case "InsuranceCompanies":
                return ["insCompanyId", "insCompanyName", "phone", "url", "img"]

            case "Policies":
                return ["policyId", "policyNumber", "policyName", "amount", "emi", "description", "benefit"];
        
            default:
                return [];
        }
    }
}