import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

var App = React.createClass({
  getDefaultState () {
    return {web3 : web3}
  },
  render () {
      return <div>
                <p>Addresse:</p>
                <input ref='adresse' type='text'/>
                <div onClick={this.onClick}>Send me money</div>
             </div>;
  },
  onClick () {
    var value = this.refs.adresse.value;
    request.get('http://192.168.100.5:3000/transaction')
    .query({query:value})
    .end(function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage.
      } else {
        console.log(error)
      }
    })
  }

});

ReactDOM.render(<App />, document.getElementById('container'));
