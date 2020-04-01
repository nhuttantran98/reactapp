import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import auth from '../auth';
import swal from 'sweetalert';
import './protectRoute.css'
const protectedRoute = ({component: Component, ...rest}) =>{
    return (
       <Route
        {...rest}
        render = {props => {
            if (auth.isAuthenticated()){
                return <Component {...props} />;
            }else{
                swal({
                    title: "Oppss...!",
                    text: "Vui lòng đăng nhập để sử dụng chức năng này!",
                    icon: "error",
                    button: "OK",
                    
                  });
                return (
                    <Redirect 
                    to={{
                        pathname:"/",
                        state:{
                            from: props.location
                        }
                    }}
                    />
                )
            }
        }}
       />
    )
}; 

export default protectedRoute