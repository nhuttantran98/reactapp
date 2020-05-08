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

    isQL(){
        if(localStorage.getItem('role')==='quanly') return true;
        else return false;
    }

    isVH(){
        if(localStorage.getItem('role')==='vanhanh') return true;
        else return false;
    }

}

export default new Auth();