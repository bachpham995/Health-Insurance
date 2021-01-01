import axios from "axios";

export class Utility {

    static Get = (ModelName) => {
        if(ModelName === "admin"){
            axios.get('http://localhost:20188/api/Admins').then(resp => {
                console.log(resp.data);
            });
        }
    }

    static Login = (userName) => {
        axios.get('http://localhost:20188/api/Admins/'+userName).then(resp => {
            console.log(resp.data);
            if(resp.data != null){
                console.log("Login Success !");
            }
        });
    }
}