import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { BrowserRouter as Link } from 'react-router-dom';

function Result(props) {

  return (
    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div style={{textAlign: "center"}}>
        Your score is: <strong>{props.quizResult}</strong>!<br/>
        <img className="wavehand" src="https://image.flaticon.com/icons/svg/948/948423.svg" height='100'/><br/>
      </div>
    </ReactCSSTransitionGroup>
  );

}

// Result.propTypes = {
//   quizResult: React.PropTypes.string.isRequired,
// };

export default Result;
