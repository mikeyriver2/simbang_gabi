import React, {Component} from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
import { Button, TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    button: {
        width: "100%",
        marginTop: "20px"
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: "100%",
      margin: "10px 0;"
    },
    dropDown: {
      width: "40%",
      marginRight: "10px"
    },
}
  
class SellIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            patrons: 0,
            adults: 0,
            students: 0,
            showModal: false,
            fullName: "",
            email: "",
            phone: "",
            showThankYou: false,
            temp: ""
        }
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateCell = (cell) => { //only checks if string ONLY contains numbers
        var isnum = /^[0-9.,]+$/.test(cell);
        return isnum;
    }

    handleChange = (e) => {
        console.log(e.target.name)
        const stateObject = (e) => {
            let returnObj = {};
            returnObj[e.target.name] = e.target.value;
            return returnObj;
          };
        console.log(stateObject(e));
        this.setState( stateObject(e) );    
    }

    handleConfirm = () => {
        this.setState(prevState=>({
            patrons: 0,
            adults: 0,
            students: 0,
            fullName: "",
            email: "",
            phone: "",
            showThankYou: true,
            temp: prevState.fullName
        }),()=>{
            setTimeout(()=>{
                this.setState({
                    showThankYou: false,
                    showModal: false,
                    temp: ""
                })
            },10000)
        })
    }

    render(){
        let isMobile = window.innerWidth <= 768;
        const renderNumbers = () => {
            let numbers = [];
            for(let i = 0; i < 21; i++){
                numbers.push(
                    <MenuItem key={i} value={i}>
                        {i}
                    </MenuItem>
                )
            }
            return numbers
        }
        const { classes } = this.props;
        const { patrons, adults, students, phone, email, fullName, showThankYou, temp } = this.state;
        let message = "";
        if(patrons > 0){
            message += `${patrons} Patron tickets, `
        }
        if(adults > 0){
            message += `${adults} Adult tickets, `
        }
        if(students > 0){
            message += `${students} Student tickets`
        }
        let total = (adults*700)+(patrons*1000)+(students*500);
        
        let isPhoneValid = (this.validateCell(phone) || phone == "");
        
        let isEmailValid = (this.validateEmail(email) || email == "");

        let disableButton = !isEmailValid || !isPhoneValid || phone == "" || email == "" || fullName == "" || total == 0 
        return (
            <div style={{height:"100%"}}>
                <Modal className="generic-modal" show={this.state.showModal} centered onHide={()=>{this.setState({showModal: false})}}>
                    <Modal.Header closeButton>
                        {showThankYou ? <b>{`THANK YOU ${temp}!`}</b> : "CONFIRM RESERVATION"}
                    </Modal.Header>
                    <Modal.Body>
                        {!showThankYou ? 
                            <div>
                                <div  className="generic-modal__confirm-message">
                                    <b>You are reserving:</b><br />
                                    {message}<br />
                                    Totalling: <u>P{total}</u>
                                </div>
                                <div className="generic-modal__confirm-buttons">
                                    <p onClick={this.handleConfirm}><a href="#">Confirm</a></p>
                                    <p onClick={()=>{this.setState({showModal: false})}} ><a href="#">Cancel</a></p>
                                </div>
                            </div>
                            :
                            <div className="generic-modal__confirm-message">
                                Your contributions to the Sta. Rosa de Lima Parish will certainly go a long way. We look forward to seeing you on December, 14, 2019! 
                            </div>
                        }
                    </Modal.Body>
                </Modal>
                <div class="snow layer1" />
                <div class="snow layer2" />
                {/* <div class="snow layer3" /> */}
                <div className="s-index">
                    {!isMobile && <div style={{backgroundImage:'url("/images/MainPoster.jpg")'}} className="s-index__absolute" />}
                    <div className="s-index__form-container">
                        <Row style={{margin: "0px"}}>
                            {!isMobile && <Col md={4} />}
                            <Col md={isMobile ? 12 : 8}>
                                <h1>RESERVATION FORM</h1>
                                <div className="text-inputs">
                                    <TextField
                                        value={fullName}
                                        onChange={this.handleChange}
                                        name="fullName"
                                        className={classes.textField}
                                        id="filled-basic"
                                        label="Full Name (required)"
                                        margin="normal"
                                        variant="filled"
                                    />
                                    <TextField
                                        value={email}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        name="email"
                                        id="filled-basic"
                                        label="Email Address (required)"
                                        margin="normal"
                                        variant="filled"
                                    />
                                    {!isEmailValid && <p style={{margin: "2px", color:"red"}}>Please enter a valid email address</p>}
                                    <TextField
                                        value={phone}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        name="phone"
                                        id="filled-basic"
                                        label="Phone Number (required)"
                                        margin="normal"
                                        variant="filled"
                                    />
                                    {!isPhoneValid && <p style={{margin: "2px", color:"red"}}>Please enter a valid phone number</p>}
                                    <div className="text-inputs__dropdowns">
                                        <TextField
                                            className={classes.dropDown}
                                            id="filled-select-currency"
                                            select
                                            value = {this.state.patrons}
                                            label="Patron"
                                            onChange={(e)=>{this.setState({patrons: e.target.value})}}
                                            helperText="Number of Patron tickets"
                                            margin="normal"
                                            variant="filled"
                                        >
                                            { renderNumbers() }
                                        </TextField>
                                        <TextField
                                            className={classes.dropDown}
                                            id="filled-select-currency"
                                            select
                                            value={this.state.adults}
                                            label="Adult"
                                            onChange={(e)=>{this.setState({adults: e.target.value})}}
                                            helperText="Number of Adult tickets"
                                            margin="normal"
                                            variant="filled"
                                        >
                                            { renderNumbers() }
                                        </TextField>
                                        <TextField
                                            className={classes.dropDown}
                                            id="filled-select-currency"
                                            select
                                            value={this.state.students}
                                            label="Student"
                                            onChange={(e)=>{this.setState({students: e.target.value})}}
                                            helperText="Number of Student tickets"
                                            margin="normal"
                                            variant="filled"
                                        >
                                            { renderNumbers() }
                                        </TextField>
                                    </div>
                                    <Button disabled={disableButton} onClick={()=>{this.setState({showModal: true})}} variant="contained" color="primary" className={classes.button}>
                                        Reserve Tickets
                                    </Button>
                                    <p>
                                        * For inquiries, contact <b>Mikey Rivera:</b> <u>mikeyriver@hackazouk.com</u> | <u>09178191791</u>
                                        <br />{isMobile && <br />}
                                        * Students must present student ID upon ticket claim during the concert.
                                    </p>
                                </div>
                                {isMobile && <img style={{width: "100%"}} src="/images/Horizontal.png" />}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SellIndex)