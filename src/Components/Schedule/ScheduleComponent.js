import React, { Component } from 'react';
import { Form, FormGroup, Col, Radio, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Server from '../API/server'
import '../ComponentCommon.css'

class ScheduleComponent extends Component {
    constructor(props) {
        super(props);
        this.handleStartEventButton = this.handleStartEventButton.bind(this);
        this.handleEndEventButton = this.handleEndEventButton.bind(this);
        this.handleClientPartnerChange = this.handleClientPartnerChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleFollowUpNotesChange = this.handleFollowUpNotesChange.bind(this);
        this.handleFollowUpChange = this.handleFollowUpChange.bind(this);
        this.handleISOChange = this.handleISOChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleSolutionChange = this.handleSolutionChange.bind(this);
        this.handleScheduleSubmission = this.handleScheduleSubmission.bind(this);

        const { match: { params } } = props;
        var id = params.id === "new" ? null : params.id

        this.state = {
            Id: id,
            Customer: "",
            Roles: "",
            ClientPartner: localStorage.getItem('u'),
            ISO: "",
            Start: 0,
            End: 0,
            FollowUp: false,
            FollowUpNotes: "",
            Solution: "",
            Incomplete: false
        }

        if (params.id != "new") {
            Server.getScheduleById(params.id).then((res) => {
                 var newdata = res.data;
                this.setState({
                    Customer: newdata.Customer,
                    Roles: newdata.Roles,
                    ClientPartner: newdata.ClientPartner,
                    ISO: newdata.ISO,
                    Start: newdata.Start,
                    End: newdata.End,
                    FollowUp: newdata.FollowUp,
                    FollowUpNotes: newdata.FollowUpNotes,
                    Solution: newdata.Solution
                })
            })
        }
    }

    handleStartEventButton(event) {
        this.setState({ Start: new Date().getTime(), Incomplete: true })
    }
    handleEndEventButton(event) {
        this.setState({ End: new Date().getTime(), Incomplete: true })
    }
    handleCustomerChange(event) {
        this.setState({ Customer: event.target.value, Incomplete: true })
    }
    handleRoleChange(event) {
        this.setState({ Roles: event.target.value, Incomplete: true })
    }
    handleClientPartnerChange(event) {
        this.setState({ ClientPartner: event.target.value, Incomplete: true })
    }
    handleISOChange(event) {
        this.setState({ ISO: event.target.value, Incomplete: true })
    }
    handleFollowUpChange(event) {
        this.setState({ FollowUp: event.target.value === "true" ? true: false, Incomplete: true })
    }
    handleFollowUpNotesChange(event){
        this.setState({ FollowUpNotes: event.target.value, Incomplete: true })
    }
    handleSolutionChange(event) {
        this.setState({ Solution: event.target.value, Incomplete: true })
    }
    handleScheduleSubmission(event) {
        event.preventDefault();
        var startDate = new Date(this.state.Start);
        var endDate = new Date(this.state.End);
        this.setState({ Start: startDate.getTime() });
        this.setState({ End: endDate.getTime() });
        if (this.state.Customer !== "") {
            if (this.state.Id !== null) {
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
        return (
            <div className="authenticateform">
                <Form horizontal>
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
                        <Col componentClass={ControlLabel} xs={2} sm={2}>
                            {/* Start */}
                        </Col>
                        <Col xs={4} sm={4}>
                            <Button bsStyle="info" bsSize="xsmall" disabled={this.state.Start !== 0} onClick={this.handleStartEventButton} >Start Event</Button>
                            {/* <input type="datetime-local" value={this.state.Start} onChange={this.handleStartDateTimeChange} /> */}
                        </Col>
                        <Col xs={4} sm={4}>
                            <Button bsStyle="info" bsSize="xsmall" disabled={this.state.Start === 0 || this.state.End !== 0} onClick={this.handleEndEventButton}>End Event</Button>
                            {/* <input type="datetime-local" value={this.state.Start} onChange={this.handleStartDateTimeChange} /> */}
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formControlsText" hidden={this.state.End === 0}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Follow Up
                        </Col>
                        <Col sm={4}>
                            <Radio type="radio" name="radioGroup" onChange={this.handleFollowUpChange} value="true"  checked={this.state.FollowUp === true} inline>
                                Yes
                        </Radio>{' '}
                            <Radio type="radio" name="radioGroup" onChange={this.handleFollowUpChange} value="false" checked={this.state.FollowUp === false} inline>
                                No
                        </Radio>
                        </Col>
                        <Col sm={4}>
                            <FormControl type="text" value={this.state.FollowUpNotes} onChange={this.handleFollowUpNotesChange} placeholder="Notes" />
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
                </Form>
                <div className="footer_alert" hidden={this.state.Incomplete === false}><div className="footer_contents_alert">Unsaved changes.</div></div>
            </div>)
    }
}

export default withRouter(ScheduleComponent);