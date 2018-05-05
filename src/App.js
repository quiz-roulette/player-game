import React, { Component } from 'react';
import logo from './logo.svg';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { SignInComponent, SignUpComponent, CalendarComponent, ScheduleComponent, ScheduleListComponent, PasswordComponent, ResetComponent, HomeComponent } from './Components'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginStatus: false,
      username: ""
    }
    document.title = "Scheduler"
  }

  updateLoginStatus(val) {
    console.log("Parent: ", val);
    this.setState((props, prev) => {
      loginStatus: val
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/home"><p className="demo1">DT</p></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/calendarview">
                Calendar
            </NavItem>
            </Nav>
            <Nav hidden={this.state.loginStatus} pullRight>
              <NavItem eventKey={1} href="/login">
                Login
            </NavItem>
              <NavItem eventKey={2} href="/signup">
                Sign up
            </NavItem>
            </Nav>
            <Nav hidden={!this.state.loginStatus} pullRight>
              <NavItem eventKey={1} href="/profile">
                {this.state.username}
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Router>
          <div className="appbody">
            <Switch>
              <Route path="/" exact component={HomeComponent} />
              <Route path="/home" exact component={HomeComponent} />
              <Route path="/calendarview" exact component={CalendarComponent} />
              <Route path="/schedule" exact component={ScheduleListComponent} />
              <Route path="/login" exact component={SignInComponent} UpdateLoginStatus={this.updateLoginStatus} />
              <Route path="/signup" exact component={SignUpComponent} />
              <Redirect from="/old-match" to="/will-match" />
              <Route path="/schedule/:id" component={ScheduleComponent} />
              <Route path='/forgetPassword' component={PasswordComponent} />
              <Route path="/resetPassword/:uniquecode" component={ResetComponent} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
