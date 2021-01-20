
export default class Common {
    static getUser = () => {
        const userStr = sessionStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        else return null;
    }
    
    // return the token from the session storage
    static getToken = () => {
        return sessionStorage.getItem('token') || null;
    }
    
    // remove the token and user from the session storage
    static removeUserSession = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
    
    // set the token and user from the session storage
    static setUserSession = (token, user) => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
    }
}
