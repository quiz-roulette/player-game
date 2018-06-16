import React from 'react';
import ProgressBarComponent from '../../ProgressBarComponent/ProgressBarComponent'

function Progress(props) {
    return (
        <div>
            <ProgressBarComponent percentage={(props.score/(props.total*250))*100} avatar={props.avatar}/>
        </div>
    )
}

export default Progress;