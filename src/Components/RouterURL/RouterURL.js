import React, { Component } from 'react';
import {
    // BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import TestContentBar1 from '../TestContentBar1/TestContentBar1';
import TestContentBar2 from '../TestContentBar2/TestContentBar2';
import ContentBar from '../ContentBar/ContentBar';


class RouterURL extends Component {
    render() {
        return (
                <div>
                    
                    <Route exact path="/" component={ContentBar}/>
                    <Route  path="/1" component={TestContentBar1}/>
                    <Route  path="/2" component={TestContentBar2}/>
                    
                </div>
        );
    }
}

export default RouterURL;