import React, { Component } from 'react';
import { Form, FormGroup, Col, Radio, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Server from '../API/server'

class ScheduleComponent extends Component {
    constructor(props) {
        super(props);
        this.handleStartDateTimeChange = this.handleStartDateTimeChange.bind(this);
        this.handleEndDateTimeChange = this.handleEndDateTimeChange.bind(this);
        this.handleClientPartnerChange = this.handleClientPartnerChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleFollowUpChange = this.handleFollowUpChange.bind(this);
        this.handleISOChange = this.handleISOChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleSolutionChange = this.handleScheduleSubmission.bind(this);
        this.handleScheduleSubmission = this.handleScheduleSubmission.bind(this);

        const { match: { params } } = props;
        var id = params.id == "new" ? null : params.id

        this.state = {
            Id: id,
            Customer: "",
            Roles: "",
            ClientPartner: "",
            ISO: "",
            Start: 0,
            End: 0,
            FollowUp: "",
            Solution: ""
        }

        Server.getScheduleById(params.id).then((res) => {
            var newdata = res.data;
            var startdate = new Date(newdata.Start).toISOString();
            var startdotindex = startdate.indexOf('.');
            startdate = startdate.substring(0, startdotindex)
            var enddate = new Date(newdata.End).toISOString();
            var enddotindex = enddate.indexOf('.');
            enddate = enddate.substring(0, enddotindex)
            this.setState({
                Customer: newdata.Customer,
                Roles: newdata.Roles,
                ClientPartner: newdata.ClientPartner,
                ISO: newdata.ISO,
                Start: startdate,
                End: enddate,
                FollowUp: newdata.FollowUp,
                Solution: newdata.Solution
            })
        })
    }

    handleStartDateTimeChange(event) {
        this.setState({ Start: event.target.value })
    }

    handleEndDateTimeChange(event) {
        this.setState({ End: event.target.value })
    }

    handleCustomerChange(event) {
        this.setState({ Customer: event.target.value })
    }
    handleRoleChange(event) {
        this.setState({ Roles: event.target.value })
    }
    handleClientPartnerChange(event) {
        this.setState({ ClientPartner: event.target.value })
    }
    handleISOChange(event) {
        this.setState({ ISO: event.target.value })
    }
    handleFollowUpChange(event) {
        this.setState({ FollowUp: event.target.value })
    }
    handleSolutionChange(event) {
        this.setState({ Solution: event.target.value })
    }
    handleScheduleSubmission(event) {
        event.preventDefault();
        var startDate = new Date(this.state.Start);
        var endDate = new Date(this.state.End);
        this.setState({ Start: startDate.getTime() });
        this.setState({ End: endDate.getTime() });
        if (this.state.Customer != "") {
            if (this.state.Id != null) {
                Server.updateSchedule(this.state).then((res) => {
                    console.log(res);
                    this.props.history.push("/schedule");
                })
            }
            else {
                Server.addSchedule(this.state).then((res) => {
                    console.log(res);
                    this.props.history.push("/schedule");
                })
            }
        }
    }



    render() {
        return (<Form horizontal>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Customer
              </Col>
                <Col sm={8}>
                    <FormControl type="text" value={this.state.Customer} onChange={this.handleCustomerChange} placeholder="Tata Consultancy Serviec" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Roles
              </Col>
                <Col sm={8}>
                    <FormControl type="text" value={this.state.Roles} onChange={this.handleRoleChange} placeholder="Smit: Intern, Jian Ming: Intern" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Client Partner
              </Col>
                <Col sm={8}>
                    <FormControl type="text" value={this.state.ClientPartner} onChange={this.handleClientPartnerChange} placeholder="Jay" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    ISO
              </Col>
                <Col sm={8}>
                    <FormControl type="text" value={this.state.ISO} onChange={this.handleISOChange} placeholder="Manufacturing" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Start
              </Col>
                <Col sm={8}>
                    <input type="datetime-local" value={this.state.Start} onChange={this.handleStartDateTimeChange} />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    End
              </Col>
                <Col sm={8}>
                    <input type="datetime-local" value={this.state.End} onChange={this.handleEndDateTimeChange} />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Follow Up
              </Col>
                <Col sm={4}>
                    <Radio name="radioGroup" inline>
                        Yes
                        </Radio>{' '}
                    <Radio name="radioGroup" inline>
                        No
                        </Radio>
                </Col>
                <Col sm={4}>
                    <FormControl type="text" value={this.state.FollowUp} onChange={this.handleFollowUpChange} placeholder="Notes" />
                </Col>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
                <Col componentClass={ControlLabel} sm={2}>
                    Solution
              </Col>
                <Col sm={8}>
                    <FormControl componentClass="textarea" value={this.state.Solution} onChange={this.handleSolutionChange} placeholder="solutions presented" />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={8}>
                    <Button type="submit" onClick={this.handleScheduleSubmission} >Save</Button>
                </Col>
            </FormGroup>
        </Form>)
    }
}

export default withRouter(ScheduleComponent);