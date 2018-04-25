import React, { Component } from 'react';
import { withRouter,Link } from "react-router-dom";
import { Panel, Button, Glyphicon, Row, Col } from 'react-bootstrap';
import Server from '../API/server'
import './ScheduleListComponent.css'

class ScheduleListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedulelist: []
        }
        Server.getScheduleByClient(localStorage.getItem("u")).then((res) => {
            console.log(res.data);
            this.setState({ schedulelist: res.data })

        })
    }

    handleEdit(event) {
        this.props.history.push("/schedule/" + event);
    }

    handleSend(event) {
        console.log(event);
    }

    render() {
        const rows = [];
        this.state.schedulelist.forEach((element) => {
            element.Start = new Date(element.Start)
            element.End = new Date(element.End)
            rows.push(
                <Panel bsStyle="info" key={element.Id} href={'/schedule/' + element.Id}>
                    <Panel.Heading>
                        <Panel.Title className="paneltitle" componentClass="h3">
                            <Row className="show-grid">
                                <Col xs={6} md={4}>
                                    {element.Customer}
                                </Col>
                                <Col className="alignright" xs={12} md={8}>
                                    <Glyphicon className="gly" glyph="pencil" onClick={() => this.handleEdit(element.Id)} />
                                    &nbsp;&nbsp;&nbsp;
                                    <Glyphicon className="gly" glyph="envelope" onClick={() => this.handleSend(element.Id)} />
                                </Col>
                            </Row>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body><span className="schedulestart">Start: {element.Start.toString()}</span> <span className="scheduleend">End: {element.End.toString()}</span></Panel.Body>
                </Panel>)
        })
        if(rows.length > 0) return this.renderWithList(rows);
        else return this.renderNoList();
    }

    renderNoList() {
        return (<div className="listgroup">
        <Link to='/schedule/new' style={{ textDecoration: 'none', textDecorationColor: 'black' }}>
            <Button className="newbutton">New</Button>
        </Link><br/><br/>
        <p>No Schedule Found.</p>
    </div>);
    }

    renderWithList(rows) {
        return (<div className="listgroup">
        <Link to='/schedule/new' style={{ textDecoration: 'none', textDecorationColor: 'black' }}>
            <Button className="newbutton">New</Button>
        </Link><br/><br/>
            {rows}
        </div>);
    }
}

export default withRouter(ScheduleListComponent);