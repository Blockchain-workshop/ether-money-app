var Web3 = require('web3')
var express = require('express');
var path = require('path');
var cors = require('cors')

var provider = new Web3.providers.HttpProvider('http://localhost:8545');
var web3 = new Web3(provider);
var app = express();
app.use(express.static('public'));
app.use(cors());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get('/transaction', function (req, res) {
  var value = req.query.query;
  var amount = 2524495800000000000;
  var transactionObject = {
    from:"0x1c7a3fb0a41e247460b69f034964b54aab03738b",
    to: value,
    value: amount
  }
  web3.eth.sendTransaction(transactionObject, function(error, result) {
    console.log(error);
    console.log(result);


    if(error) {
      res.json({
        error:""+error
      })
      return;
    } else {
      res.json({
        result: result,
        amount: amount
      })
      return;
    }

  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
