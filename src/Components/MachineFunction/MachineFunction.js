import axios from 'axios';
import {saveAs} from 'file-saver';

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

export const getDataDevice = machineName => {
    return axios
        .post('/machines/get-data-device',{
            name: machineName
        })
        .then(response=>{
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

export const addSetup = setup =>{
    return axios
        .post('/setups/add-setup',{
            user_email: setup.user_email,
            machine_name: setup.machine_name,
            mass: setup.mass,
            typeOfFruit:setup.typeOfFruit,
            timeStart:setup.timeStart,
            timeFinish:setup.timeFinish,
            script:setup.script
        })
        .then(response=>{
            console.log(response);
            return response.data;
        }).catch(err=>{
            console.log(err);
            return err;
        })
}

export const getAllSetups = setup => {
    return axios
        .get('/setups/get-all-setups',{
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

export const addScript = script => {
    let myScript = JSON.stringify(script.script);
    return axios
        .post('/scripts/add-script',{
            name: script.name,
            script: myScript,
            totalTime: script.totalTime,
            useremail:script.useremail
        })
        .then(response=>{
            console.log(response);
            return response.data;
        }).catch(err=>{
            console.log(err);
            return err;
        })
    
}

export const getAllScripts = scripts => {
    return axios
        .get('/scripts/get-all-scripts',{
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

export const updateResult = setup => {
    return axios
        .post('/setups/update-setups',{
            id: setup.id,
            result: setup.result
        })
        .then(response=>{
            console.log(response);
            return response.data;
        }).catch(err=>{
            console.log(err);
            return err;
        })
    
}

export const getPDF = () => {
    return axios
        .get('/setups/create-pdf')
        .then(
            ()=>axios.get('setups/get-pdf',{responseType:'blob'})
            .then((res)=>{
                const pdfBlob = new Blob([res.data],{type:'application/pdf'});
                saveAs(pdfBlob,'report.pdf');
            })
            .catch((err)=>{
                console.log('my err',err)
            })
        ).catch(err=>{
            console.log(err);
            return err;
        })
    
}