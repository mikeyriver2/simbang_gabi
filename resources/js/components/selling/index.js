import React, {Component} from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button, TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    button: {
        width: "100%",
        marginTop: "50px"
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: "100%",
      margin: "20px 0;"
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

        }
    }

    render(){
        const { classes } = this.props;
        return (
            <div style={{height:"100%"}}>
                <div class="snow layer1" />
                <div class="snow layer2" />
                <div class="snow layer3" />
                <div className="s-index">
                    <div style={{backgroundImage:'url("/images/MainPoster.jpg")'}} className="s-index__absolute" />
                    <div className="s-index__form-container">
                        <Row style={{margin: "0px"}}>
                            <Col md={4} />
                            <Col md={8}>
                                <h1>Reservation Form</h1>
                                <div className="text-inputs">
                                    <TextField
                                        className={classes.textField}
                                        id="filled-basic"
                                        label="Full Name"
                                        margin="normal"
                                        variant="filled"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        id="filled-basic"
                                        label="Email Address"
                                        margin="normal"
                                        variant="filled"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        id="filled-basic"
                                        label="Phone Number"
                                        margin="normal"
                                        variant="filled"
                                    />
                                    <div className="text-inputs__dropdowns">
                                        <TextField
                                            className={classes.dropDown}
                                            id="filled-select-currency"
                                            select
                                            label="Patron"
                                            onChange={()=>{}}
                                            helperText="Select number of Patron tickets"
                                            margin="normal"
                                            variant="filled"
                                        >
                                            <MenuItem>
                                                <option>ass</option>
                                            </MenuItem>
                                        </TextField>
                                        <TextField
                                            className={classes.dropDown}
                                            id="filled-select-currency"
                                            select
                                            label="Adult"
                                            onChange={()=>{}}
                                            helperText="Select number of Adult tickets"
                                            margin="normal"
                                            variant="filled"
                                        >
                                            <MenuItem>
                                                <option>ass</option>
                                            </MenuItem>
                                        </TextField>
                                        <TextField
                                            className={classes.dropDown}
                                            id="filled-select-currency"
                                            select
                                            label="Student"
                                            onChange={()=>{}}
                                            helperText="Select number of Student tickets. Must show student ID upon ticket claim"
                                            margin="normal"
                                            variant="filled"
                                        >
                                            <MenuItem>
                                                <option>ass</option>
                                            </MenuItem>
                                        </TextField>
                                    </div>
                                    <Button variant="contained" color="primary" className={classes.button}>
                                        Reserve Tickets
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SellIndex)