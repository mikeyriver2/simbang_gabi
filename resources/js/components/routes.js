import React, { Component, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Link, Route, withRouter} from 'react-router-dom';
import Selling from './selling/index';
import axios from 'axios'
import { 
    Table
} from 'react-bootstrap';

const Index = () =>{
    const node = useRef();
    const [ reservations, setReservations ] = useState([]);
    const [ count, setCount ] = useState(0);
    const [ indexToConfirm, setIndexToConfirm ] = useState(-2);
    const ref = useRef(-1);

    useEffect(()=>{
        setCount(1);
        setReservationsAxios();
        document.addEventListener("mousedown", handleClick);
    },[]);

    const setReservationsAxios = () => {
        axios.get("/thisisarandomass").then(res=>{
            setReservations(res.data);
        });
    }

    const handleClick = (e) => {
        if(e.target.id){
            let explode = e.target.id.split('-');
            let index = Number(explode[1]);
            console.log('ref '+ref.current);
            console.log('index '+index);
            if(!e.target.id.includes("paid") && ref.current === -1){    
                setIndexToConfirm(index);
                ref.current = index;
            }else{
                if(index === ref.current){
                    console.log('confirming')
                    confirmPayment(index+1);
                }else{
                    setIndexToConfirm(-1);
                    ref.current = -1;
                }
            }
        }else{
            setIndexToConfirm(-1);
            ref.current = -1;
        }
        console.log("----------")
    };

    const confirmPayment = (id) => {
        axios.post("/confirmpayment",{id}).then(res=>{
            setReservationsAxios(res.data);
            setIndexToConfirm(-1);
            ref.current = -1;
        });
    }

    const renderBody = () => {
        let elements = []; 
        if(reservations && reservations.length > 0){
            reservations.forEach((res,index)=>{
                const { 
                    full_name, 
                    patrons, 
                    students, 
                    adults,
                    paid,
                    special
                } = res
                elements.push(
                    <tr>
                        <td>{full_name}</td>
                        <td>{patrons}</td>
                        <td>{students}</td>
                        <td>{adults}</td>
                        <td 
                            id={`${paid ? "paid" : "notPaid"}-${index}`}
                            ref={node}
                            style={{color: paid ? "green" : "red", fontStyle: "bold"}}
                        >
                            {
                                indexToConfirm !== index ? 
                                     paid ? "Yis Boi" : "Naw :("
                                :
                                "Click again to confirm payment"

                                }
                        </td>
                        <td>{special}</td>
                    </tr>
                );
            });
        }
        return elements;
    }
    
    return (
        <div>
           <Table responsive striped bordered hover variant="dark">
               <thead>
                   <tr>
                        <th>Name</th>
                        <th>Patrons</th>
                        <th>Students</th>
                        <th>Adults</th>
                        <th>Paid</th>
                        <th>Special</th>
                   </tr>
               </thead>
               <tbody>
                    { renderBody() }
                </tbody>
           </Table>
        </div>
    )
}

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
                <Switch>
                    <Route exact path="/" component={Selling} /> 
                    <Route exact path="/mikeyisawesome" component={Index} /> 
                    <Route component={Selling} />
                </Switch> 
            </Router>
            );
    }
}

export default Routes;