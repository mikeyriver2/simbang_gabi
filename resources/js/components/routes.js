import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import Selling from './selling/index';
import axios from 'axios'

class Routes extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    componentDidMount(){
        
    }

    render(){
        return (
            <Router>
                <Route path="" component={Selling} /> 
            </Router>
            );
    }
}

export default Routes;