import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Server from '../API/server'
import './Common.css';

class PasswordComponent extends Component {
    constructor(props) {
        super(props);
        
        this.handleNewPassword = this.handleNewPassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
	this.handleResetPassword = this.handleResetPassword.bind(this);

	const { match: { params } } = props;      
        this.state = {
            newpassword: "",
	    uniquecode: params.uniquecode	
        };
    }


    handleNewPassword(event) {
        const pw = event.target.value;
        this.setState((prevState, props) => ({
            newpassword: pw
        }));
    }
    handleConfirmPassword(event) {
        const cfmpw = event.target.value;
        this.setState((prevState, props) => ({
            cfmpassword: cfmpw
        }));
    }
    handleResetPassword(event) {
        event.preventDefault();
	console.log(this.state.newpassword);       
        if (this.state.newpassword !== "" && this.state.newpassword === this.state.cfmpassword) {
            Server.ResetAccountPassword(this.state.newpassword, this.state.uniquecode).then((res) => {
		console.log('N', res);
                if (res.data === true || res.data === "true") {                    
                    this.props.history.push("/");
                }
                else {
                    //Handle
                }
            }).catch((err) => {
                //Handle
            })
        }
    }
    render() {
        return this.renderForm();
    }

    renderForm() {
        return (
        <div className="authenticateform">
        <Form horizontal>
            <FormGroup controlId="formHorizontalPassword">
		<Col componentClass={ControlLabel} sm={3}>
                </Col>
                <Col sm={9}>
                    <p style={{color: 'red'}}>Please enter your new password for your account.</p>
                </Col>
                <Col componentClass={ControlLabel} sm={3}>
                    New Password
                </Col>
                <Col sm={9}>
                    <FormControl type="password" placeholder="Password" onChange={this.handleNewPassword} />
                </Col>		
            </FormGroup>
	    <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={3}>
                    ConfirmPassword
                </Col>
                <Col sm={9}>
                    <FormControl type="password" placeholder="Confirm Password" onChange={this.handleConfirmPassword} />
                </Col>
            </FormGroup>          
            <FormGroup>
                <Col smOffset={3} sm={8}>
                    <Button onClick={this.handleResetPassword}>Submit</Button>
                </Col>
            </FormGroup>
        </Form>
        </div>
        );
    }    
}

export default PasswordComponent;