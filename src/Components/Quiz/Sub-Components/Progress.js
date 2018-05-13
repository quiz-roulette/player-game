import React from 'react';
import { ProgressBar } from 'react-bootstrap'

function Progress(props) {
    console.log((props.counter/props.total)*100);
    console.log(props.counter);
    console.log(props.total);
    return (
        <div>
            <ProgressBar active now={(props.score/(props.total*50))*100} label={props.score}/>
        </div>
    )
}

export default Progress;