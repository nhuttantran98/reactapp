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