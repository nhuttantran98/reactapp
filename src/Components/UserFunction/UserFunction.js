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
            return response.data;
        })
}

export const login = user => {
    return axios
        .post('/users/login',{
            email:user.email,
            password:user.password
        })
        .then(response=>{
            localStorage.setItem('useremail',user.email)
            localStorage.setItem('usertoken',response.data.token);
            localStorage.setItem('role',response.data.role);
            console.log(response)
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

export const getProfileUser = email => {
    console.log("getProfile "+ JSON.stringify(email))
    return axios
        .post('/users/profile',{email: email},{
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

export const updateUser = user =>{
    return axios
        .post('/users/update-user',{
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            dob: user.dob,
            phone: user.phone,
            role: user.role
        })
        .then(response=>{
            console.log(response);
            return response.data;
        }).catch(err=>{
            console.log(err);
            return err;
        })
}

export const deleteUser = user =>{
    return axios
        .post('/users/delete-user',{
            email: user.email,
        })
        .then(response=>{
            console.log(response);
            return response.data;
        }).catch(err=>{
            console.log(err);
            return err;
        })
}