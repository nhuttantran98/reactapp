import axios from 'axios';

export const getAllMachines = user => {
    return axios
        .get('/machines/get-all-machines',{
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

export const register = machine =>{
    return axios
        .post('/machines/register',{
            name: machine.name,
            position:machine.position,
            description: machine.description,
        })
        .then(response=>{
            console.log('Registerd');
            return response.data;
        }).catch(err=>{
            return err
        })
}

export const getProfileMachine = id =>{
    return axios
        .post('/machines/profile',{id: id},{
            headers:{
                'authorization' : localStorage.getItem('usertoken')
            }})
        .then(response=>{
            console.log('Registerd');
            return response.data;
        }).catch(err=>{
            return err
        })
}

export const updateMachine = machine =>{
    return axios
        .post('/machines/update-machine',{
            id: machine.id,
            position: machine.position,
            name: machine.name,
            description: machine.description
        })
        .then(response=>{
            console.log(response);
            return response.data;
        }).catch(err=>{
            console.log(err);
            return err;
        })
}

export const deleteMachine = machine =>{
    return axios
        .post('/machines/delete-machine',{
            id: machine.id,
        })
        .then(response=>{
            console.log(response);
            return response.data;
        }).catch(err=>{
            console.log(err);
            return err;
        })
}