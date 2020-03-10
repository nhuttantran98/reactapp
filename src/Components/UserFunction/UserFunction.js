import axios from 'axios';

export const register = newUser =>{
    return axios
        .post('/users/register',{
            first_name: newUser.first_name,
            last_name:newUser.last_name,
            email: newUser.email,
            password: newUser.password,
            dob: newUser.dob,
            role: newUser.role,
            phone: newUser.phone
        })
        .then(response=>{
            console.log('Registerd');
        })
}

export const login = user => {
    return axios
        .post('/users/login',{
            email:user.email,
            password:user.password
        })
        .then(response=>{
            localStorage.setItem('usertoken',response.data);
            return response.data;
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getAllUsers = user => {
    return axios
        .get('/users/get-all-users',{
            headers:{
                'authorization' : localStorage.getItem('usertoken')
            }
        })
        .then(response=>{
            return response.data;
        })
        .catch(err=>{
            console.log(err);
        })
}

