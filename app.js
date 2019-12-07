var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000
const bodyParser = require('body-parser');

var app = express();

var mercadopago = require('mercadopago');

mercadopago.configurations.setAccessToken("TEST-7571427631729316-120715-1ee44c727bd2f1515cee9556deaf5626-266289819");
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});


app.post('/processar_pagamento', function (req, res) {

    const {token, amount, description, installments, email } = req.body
        const payment_data = {
            transaction_amount: 1000,
            token,
            description,
            installments: parseInt(installments),
            payment_method_id: paymentMethodId,
            payer: {
                email
                }
        }
    
        // console.log(payment_data);
    
        mercadopago.payment.save(payment_data).then(function (data) {
            res.send(data);
          }).catch(function (error) {
            console.log(error);
          });
    
  })


app.listen(port);