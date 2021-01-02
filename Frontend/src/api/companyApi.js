import axiosClient from "api/AxiosClient";

class CompanyApi {
    getAll = (params) => {
        const url = '/InsuranceCompanies';
        return axiosClient.get(url, { params });
    };
}
const companyApi = new CompanyApi();
export default companyApi;