var express = require('express');
var gpio = require("rpio");
var app = express();
var gpioPin = 7;
gpio.open(gpioPin, gpio.OUTPUT, gpio.LOW);
app.get('/status/', function(req, res){
        res.send((gpio.read(gpioPin) ? 'high' : 'low'));
        console.log('status');
});
app.get('/on/', function(req, res){
        gpio.write(gpioPin, gpio.HIGH);
        console.log('on');
        res.send('1');
});
app.get('/off/', function(req, res){
        gpio.write(gpioPin, gpio.LOW);
        console.log('off');
        res.send('0');
});
app.get('/toggle/', function(req, res){
        if (gpio.read(gpioPin, gpio.INPUT) == 1){
                gpio.write(gpioPin, gpio.LOW);
                console.log('off');
                res.send('0');
        } else {
                gpio.write(gpioPin, gpio.HIGH);
                console.log('on');
                res.send('1');
        }
});
app.listen(1000);
console.log('App Server running at port 1000');
