import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Server from '../API/server'
import './Common.css';
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert';
import { emitOnlineUser } from '../API/socket';

class SimLoginComponent extends Component {
    constructor(props) {
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSIMID = this.handleSIMID.bind(this);
        this.handleToken = this.handleToken.bind(this);
        this.handleClubName = this.handleClubName.bind(this);
        console.log(this.props.token);
        this.state = {
            userName: "",
            Password: this.props.token ? this.props.token : "",
            loading: false,
            token: this.props.token,
            shownAlert: false
        };

    }

    componentDidUpdate() {
        if (this.state.token != undefined && this.state.shownAlert == false) {
            Alert.info('Enter username and click play to start', {
                position: 'bottom-right',
                effect: 'slide'
            });
            this.setState({ shownAlert: true });
        }
    }

    handleLogIn(event) {
        event.preventDefault();
        this.setState({ loading: true })
        console.log(event);
        if (this.state.Name !== "" && this.state.SIMID !== "" && this.state.ClubName !== "" && this.state.token !== "") {
            var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            if (!format.test(this.state.SIMID)) {
                Server.addSIMQuizUser(this.state.Name, this.state.SIMID, this.state.ClubName,this.state.token).then((res) => {
                    if (res.data === true || res.data === "true") {
                        localStorage.setItem("l", "true");
                        //Token_Username
                        localStorage.setItem("u", this.state.token + '_' + this.state.SIMID);
                        localStorage.setItem('qt', this.state.token);
                        // localStorage.setItem("p", this.state.Password);
                        // this.setState({ loading: false})

                        Server.getOneTimeQuiz(this.state.Password).then((res1) => {
                            // this.props.history.push("/quiz/" + res1.data.QuizId + "/" + res1.data.CategoryName);
                            var url = "quiz/" + res1.data.QuizId + "/" + res1.data.CategoryName;
                            emitOnlineUser({ QuizUserId: localStorage.getItem('u') })
                            this.props.history.push('/avatarselection/' + encodeURIComponent(url));
                        })
                    }
                    else {
                        this.setState({ loading: false })
                        Alert.error('Either username or token is wrong', {
                            position: 'top-right',
                            effect: 'slide',
                            timeout: 'none'
                        });
                    }
                });
            }
            else {
                this.setState({ loading: false })
                Alert.error('SIM ID can only handle numbers', {
                    position: 'top-right',
                    effect: 'slide'
                });
            }
        }
        else {
            this.setState({ loading: false })
            Alert.error('Username or token cannot be empty', {
                position: 'top-right',
                effect: 'slide',
                timeout: 'none'
            });
        }

        // this.setState((props,prevState) =>{
        //     loading: false
        // })

    }

    handleSIMID(event) {
        const un = event.target.value;
        this.setState((prevState, props) => ({
            SIMID: un
        }));
    }

    handleName(event) {
        const un = event.target.value;
        this.setState((prevState, props) => ({
            Name: un
        }));
    }

    handleClubName(event) {
        const un = event.target.value;
        console.log(un);
        this.setState((prevState, props) => ({
            ClubName: un
        }));
    }

    handleToken(event) {
        const un = event.target.value;
        this.setState((prevState, props) => ({
            token: un
        }));
    }

    render() {
        return this.renderForm();
    }

    renderForm() {
        return (
            <div className="authenticateform">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalText">
                        <Col componentClass={ControlLabel} sm={3}>
                            SIM ID:
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="Enter your SIM ID" disabled={this.state.loading} onChange={this.handleSIMID} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalText">
                        <Col componentClass={ControlLabel} sm={3}>
                            Name:
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="Enter your mymail name" disabled={this.state.loading} onChange={this.handleName} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalText">
                        <Col componentClass={ControlLabel} sm={3}>
                            Club Name:
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="Enter your club name" disabled={this.state.loading} onChange={this.handleClubName} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={3}>
                            Token:
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="Token" value={this.state.token} disabled={this.state.loading || this.state.token} onChange={this.handleToken} /><br />
                            <span className="extranote" hidden={this.state.token}>Token will be provided by the quiz administrator.</span>
                        </Col>
                    </FormGroup>
                    <br />
                    {/* <FormGroup controlId="formHorizontalPassword">
                        <Col xsHidden componentClass={ControlLabel} sm={3}></Col>
                        <Col xs={6} sm={3}>
                            <Link to='/forgetPassword'>Forget Password</Link>
                        </Col>
                        <Col xs={6} sm={6} className="floatright">
                            <Link to='/account'>Create Account</Link>
                        </Col>
                    </FormGroup> */}
                    <FormGroup>
                        <Col smOffset={3} sm={8}>
                            <Button bsStyle="custom" style={{ backgroundColor: "#577ae7" }} onClick={this.handleLogIn} disabled={this.state.loading}>{this.state.loading ? "Authenticating..." : "Play"}</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(SimLoginComponent);