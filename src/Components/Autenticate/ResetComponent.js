import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import { withRouter,Link } from "react-router-dom";
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
            uniquecode: params.uniquecode,
            status: "new" /** new: New Form success: Reset Done failure: Reset Failed */
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
                    // this.props.history.push("/");
                    this.setState({ status: 'success'});
                }
                else {
                    this.setState({ status: 'failure'});
                }
            }).catch((err) => {
                this.setState({ status: 'failure'});
            })
        }
        else{
            this.setState({ status: 'failure'});
        }
    }
    render() {
        if(this.state.status == "new"){
            return this.renderForm();
        }
        else if(this.state.status == "success"){
            return this.renderSuccess();
        }
        else{
            return this.renderFailure();
        }
    }

    renderForm() {
        return (
            <div className="authenticateform">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={3}>
                        </Col>
                        <Col sm={9}>
                            <p style={{ color: 'red' }}>Please enter your new password for your account.</p>
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

    renderSuccess() {
        return (
            <div className="message">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                </svg><br />
                <p>Password has been successfully changed. Please <Link to='/login'>login</Link></p>
            </div>);
    }

    renderFailure() {
        return (
            <div className="message">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
                    <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2" />
                </svg><br />
                <p>Something went wrong, please try clicking the url again or perform <Link to='/forgetPassword'>reset password</Link> again.</p>
            </div>
        );
    }
}

export default PasswordComponent;