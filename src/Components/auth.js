class Auth{
    constructor(){
        this.authenticate = '';
    }

    login(cb){
        this.authenticate = localStorage.getItem('usertoken');
        cb();
    }

    logout(cb){
        this.authenticate = '';
        cb();
    }

    isAuthenticated(){
        return this.authenticate;
    }
}

export default new Auth();