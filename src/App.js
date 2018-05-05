import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect,withRouter } from 'react-router-dom';
import { SignInComponent, NotFoundComponent, SignUpComponent, CalendarComponent, ScheduleComponent, ScheduleListComponent, ForgetPasswordComponent, ResetPasswordComponent, HomeComponent } from './Components'


class App extends Component {
  
  constructor() {
    super();
    document.title = "Scheduler";
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className="appbody">
            <Switch onChange="">
              <Route path="/" exact component={HomeComponent} />
              <Route path="/home" exact component={HomeComponent} />
              <Route path="/calendarview" exact component={CalendarComponent} />
              <Route path="/schedule" exact component={ScheduleListComponent} />
              <Route path="/login" exact component={SignInComponent} />
              <Route path="/signup" exact component={SignUpComponent} />
              <Redirect from="/old-match" to="/will-match" />
              <Route path="/schedule/:id" component={ScheduleComponent} />
              <Route path='/forgetPassword' component={ForgetPasswordComponent} />
              <Route path="/resetPassword/:uniquecode" component={ResetPasswordComponent} />
              <Route path='/404' component={NotFoundComponent} />
              <Redirect from='*' to='/404' />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
