import axios from "axios";

export default class Utility {
    constructor(){}

    public static Get(ModelName : string){
        axios.get('http://webcode.me').then(resp => {
            console.log(resp.data);
        });
    }
}