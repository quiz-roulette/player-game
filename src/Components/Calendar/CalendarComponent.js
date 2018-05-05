import React, { Component } from 'react';

import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import './CalendarComponent.css'

import Server from '../API/server'

class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
        Server.getAllSchedule().then((res) => {
            var data = res.data;
            console.log(res);
            var newevents = [];
            data.forEach(element => {
                var obj = {
                    title: element.Customer,
                    start: new Date(element.Start),
                    id: element.Id,
                    end: new Date(element.End)
                }
                newevents.push(obj);
            });
            this.setState((prevState, props) => ({
                events: newevents
            }));
        })
    }

    render() {
        const date = new Date();
        return (
            <div id="example-component">
                <FullCalendar
                    id="your-custom-ID"
                    header={{
                        left: 'prev,next today myCustomButton',
                        center: 'title',
                        right: 'month,basicWeek,basicDay'
                    }}
                    aspectRatio={1}
                    defaultDate={date}
                    defaultView="month"
                    navLinks={true} // can click day/week names to navigate views
                    editable={true}
                    eventLimit={true} // allow "more" link when too many events
                    events={this.state.events}
                />
            </div>
        );
    }
}

export default CalendarComponent;