var express = require('express');
var gpio = require("rpio");

var app = express();

//Using pin 7
var gpioPin = 7;

//Initializes the lamp state to OFF
gpio.open(gpioPin, gpio.OUTPUT, gpio.LOW);

//Returns the status of the light
app.get('/status/', function(req, res){
        res.send((gpio.read(gpioPin) ? 'high' : 'low'));
        console.log('status');
});

//Sets the light state to ON
app.get('/on/', function(req, res){
        gpio.write(gpioPin, gpio.HIGH);
        console.log('on');
        res.send('1');
});

//Sets the light state to OFF
app.get('/off/', function(req, res){
        gpio.write(gpioPin, gpio.LOW);
        console.log('off');
        res.send('0');
});

//Toggles the light
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
