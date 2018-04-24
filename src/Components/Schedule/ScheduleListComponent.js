import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
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
            this.setState({ schedulelist: res.data})
            
        })
    }

    render() {
        const rows = [];
        this.state.schedulelist.forEach((element) => {
            element.Start = new Date(element.Start)
            element.End = new Date(element.End)
            rows.push(
            <ListGroupItem key={element.Id} href={'/schedule/'+element.Id}>
                <h4>{element.Customer}</h4>
                <span className="schedulestart">Start: {element.Start.toString()}</span> <span className="scheduleend">End: {element.End.toString()}</span>
            </ListGroupItem>)
        })
        return (<ListGroup className="listgroup">
            {rows}
        </ListGroup>);
    }
}

export default ScheduleListComponent;