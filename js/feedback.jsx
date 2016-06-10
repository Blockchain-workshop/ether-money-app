import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({
  render () {
    console.log("RENDER FEEDBACK")
      if(this.props.validation) {
        var error = ''+this.props.validation.message
        console.log(error)
        return <div>{error}</div>
      } else {
        return <p/>
      }
  }
});
