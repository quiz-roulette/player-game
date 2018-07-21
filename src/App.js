import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AccountComponent,AnalyticsComponent, QuizComponent, AvatarSelectionComponent, QuizListComponent, NotFoundComponent, SignUpComponent, CalendarComponent, ForgetPasswordComponent, ResetPasswordComponent, HomeComponent, DashboardComponent } from './Components'

class App extends Component {

    constructor() {
        super();
        document.title = "Quiz It";
    }

    render() {
        return (
            <div className="App">
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/home"><p>QR</p></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="/calendarview">
                                Calendar
                    </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="/account">
                                Profile
                    </NavItem>
                        </Nav>
                        {/* <Nav hidden={this.state.loginStatus === false} pullRight>
                    <NavItem eventKey={1} onClick={this.handleLogout}>
                        Logout
                    </NavItem>
                </Nav> */}
                    </Navbar.Collapse>
                </Navbar>
                <Router>
                    <div className="appbody">
                        <Switch onChange="">
                            <Route path="/" exact component={HomeComponent} />
                            <Route path="/home" exact component={HomeComponent} />
                            <Route path="/calendarview" exact component={CalendarComponent} />
                            <Route path="/quiz/:id/:categoryname" exact component={QuizComponent} />
                            {/* <Route path="/login" exact component={SignInComponent} />
                            <Route path="/signup" exact component={SignUpComponent} /> */}
                            <Route path="/account" exact component={AccountComponent}/>
                            <Redirect from="/old-match" to="/will-match" />
                            <Route path='/forgetPassword' component={ForgetPasswordComponent} />
                            <Route path="/resetPassword/:uniquecode" component={ResetPasswordComponent} />
                            <Route path='/404' component={NotFoundComponent} />
                            <Route path='/avatar' component={AvatarSelectionComponent} />
                            {/* <Route path="/quizlist" component={QuizListComponent} /> */}
                            <Route path="/dashboard/:quizid" component={DashboardComponent} />
                            <Route path="/analytics" component={AnalyticsComponent}/>
                            <Redirect from='*' to='/404' />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
