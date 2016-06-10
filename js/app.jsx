import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Feedback from './feedback';
var Web3 = require('web3')

var provider = new Web3.providers.HttpProvider('http://192.168.100.5:8545');
var web3 = new Web3(provider);

var App = React.createClass({
  getInitialState () {
    return {web3 : web3, validation : undefined}
  },
  render () {
      return <div>
                <h1>Send ether to yourself</h1>
                <h3>Addresse:</h3>
                <input ref='adresse' type='text'/>
                <div id='click' onClick={this.onClick}>Send me money</div>
                <div>
                  <Feedback validation={this.state.validation}/>
                </div>
             </div>;
  },
  onClick () {
    var value = this.refs.adresse.value;
    var amount = 2524495800000000000;
    var transactionObject = {
      from:"0x1c7a3fb0a41e247460b69f034964b54aab03738b",
      to: value,
      value: amount
    }
    web3.eth.sendTransaction(transactionObject, (error, result) => {
      if(error) {
        this.setState({validation: {error: true, message: error.toString()}});
      } else {
        this.setState({validation: {error: false, message: 'Transaction id: '+result}});
      }
    });
  }

});

ReactDOM.render(<App />, document.getElementById('container'));
