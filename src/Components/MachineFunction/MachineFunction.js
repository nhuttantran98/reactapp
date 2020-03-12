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
            discription: machine.discription,
        })
        .then(response=>{
            console.log('Registerd');
            return response.data;
        }).catch(err=>{
            return err
        })
}